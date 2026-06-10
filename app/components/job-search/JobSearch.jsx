'use client';

/**
 * JobSearch.jsx
 * 
 * Parent component for the entire Job Search section.
 * Orchestrates search state, filtering, sorting, saving, and modal.
 * 
 * Drop this into any page: <JobSearch />
 */

import { useState, useMemo, useCallback, useEffect } from 'react';
import SearchBar from './SearchBar';
import FilterBar from './FilterBar';
import JobCard from './JobCard';
import { searchJobs } from '@/lib/claudeApi';

// Adzuna API Credentials
const ADZUNA_APP_ID = process.env.NEXT_PUBLIC_ADZUNA_APP_ID || "b1df80f6";
const ADZUNA_APP_KEY = process.env.NEXT_PUBLIC_ADZUNA_APP_KEY || "07ea9cfa7e534bf270bf22af538c5142";
const CACHE_EXPIRY_MS = 4 * 60 * 60 * 1000; // 4 hours

// Default filter state
const DEFAULT_FILTERS = {
  workModel: 'All',
  roleType: 'All',
  minMatchScore: 0,
  sortBy: 'relevance',
  proximity: '25',
  salaryMin: '',
  salaryMax: '',
  fullTime: false,
  permanent: false,
  // Precision filters
  experienceLevels: [],
  jobTypes: [],
  industries: [],
  maxDaysOld: 'all',
  companySize: 'Any',
};

const getStoredFilters = () => {
  if (typeof window === 'undefined') return DEFAULT_FILTERS;
  const stored = localStorage.getItem('adzuna_filters');
  return stored ? { ...DEFAULT_FILTERS, ...JSON.parse(stored) } : DEFAULT_FILTERS;
};

/**
 * Gets the current month's Adzuna request count from localStorage.
 * Resets to 0 if the month has changed.
 */
const getRequestCount = () => {
  if (typeof window === 'undefined') return 0;
  
  const count = localStorage.getItem('adzuna_request_count');
  const lastReset = localStorage.getItem('adzuna_last_reset');
  const now = new Date();
  
  // Reset count if it's a new month
  if (lastReset) {
    const lastResetDate = new Date(lastReset);
    if (now.getMonth() !== lastResetDate.getMonth() || now.getFullYear() !== lastResetDate.getFullYear()) {
      localStorage.setItem('adzuna_request_count', '0');
      localStorage.setItem('adzuna_last_reset', now.toISOString());
      return 0;
    }
  } else {
    localStorage.setItem('adzuna_last_reset', now.toISOString());
  }
  
  return parseInt(count || '0', 10);
};

/**
 * Increments and persists the Adzuna request count.
 */
const incrementRequestCount = () => {
  if (typeof window === 'undefined') return 0;
  
  const current = getRequestCount();
  const next = current + 1;
  localStorage.setItem('adzuna_request_count', next.toString());
  return next;
};

export default function JobSearch() {
  // All jobs returned from the last search (un-filtered)
  const [allJobs, setAllJobs] = useState([]);
  // Active filter state
  const [filters, setFilters] = useState(getStoredFilters());
  // Search state
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [searchError, setSearchError] = useState(null);
  
  // Adzuna specific state
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [currentQuery, setCurrentQuery] = useState({ what: '', where: '' });
  const [lastUpdated, setLastUpdated] = useState(null);
  const [isCached, setIsCached] = useState(false);
  const [requestCount, setRequestCount] = useState(0);
  const [isAiSearch, setIsAiSearch] = useState(false);

  useEffect(() => {
    setRequestCount(getRequestCount());
  }, []);

  useEffect(() => {
    localStorage.setItem('adzuna_filters', JSON.stringify(filters));
  }, [filters]);

  const fetchAdzunaJobs = useCallback(async (what, where, pageNum, forceRefresh = false) => {
    const cacheKey = `adzuna_${what}_${where}_${pageNum}_${JSON.stringify(filters)}`;
    
    if (!forceRefresh) {
      const cached = localStorage.getItem(cacheKey);
      if (cached) {
        const { data, timestamp } = JSON.parse(cached);
        if (Date.now() - timestamp < CACHE_EXPIRY_MS) {
          setIsCached(true);
          setLastUpdated(timestamp);
          return data;
        }
      }
    }

    const count = incrementRequestCount();
    setRequestCount(count);

    const url = new URL(`https://api.adzuna.com/v1/api/jobs/us/search/${pageNum}`);
    url.searchParams.set('app_id', ADZUNA_APP_ID);
    url.searchParams.set('app_key', ADZUNA_APP_KEY);
    url.searchParams.set('results_per_page', '20');
    
    // Refine 'what' with precision filters
    let refinedWhat = what;
    if (filters.experienceLevels.length > 0) {
      refinedWhat += ` (${filters.experienceLevels.join(' OR ')})`;
    }
    if (filters.industries.length > 0 && !filters.industries.includes('Any')) {
      refinedWhat += ` (${filters.industries.join(' OR ')})`;
    }
    if (filters.companySize === 'Startup') refinedWhat += ' "startup"';
    if (filters.companySize === 'SMB') refinedWhat += ' ("small business" OR "mid-size")';
    if (filters.companySize === 'Enterprise') refinedWhat += ' ("enterprise" OR "corporation")';

    url.searchParams.set('what', refinedWhat);
    if (where) url.searchParams.set('where', where);
    url.searchParams.set('content-type', 'application/json');
    
    // Optional filters from state
    if (filters.salaryMin) url.searchParams.set('salary_min', filters.salaryMin);
    if (filters.salaryMax) url.searchParams.set('salary_max', filters.salaryMax);
    
    // Job Types mapping
    if (filters.jobTypes.includes('Full-time') || filters.fullTime) url.searchParams.set('full_time', '1');
    if (filters.jobTypes.includes('Part-time')) url.searchParams.set('part_time', '1');
    if (filters.jobTypes.includes('Contract') || filters.jobTypes.includes('Freelance')) url.searchParams.set('contract', '1');
    if (filters.permanent) url.searchParams.set('permanent', '1'); // Permanent mapping

    if (filters.maxDaysOld !== 'all') {
      url.searchParams.set('max_days_old', filters.maxDaysOld);
    }

    url.searchParams.set('sort_by', filters.sortBy === 'recent' ? 'date' : 'relevance');
    url.searchParams.set('distance', filters.proximity === 'Any' ? '25' : filters.proximity);

    try {
      const resp = await fetch(url.toString());
      if (!resp.ok) throw new Error('Job search temporarily unavailable. Please try again in a few minutes.');
      
      const data = await resp.json();
      
      // Map Adzuna fields to existing Job structure
      const mappedJobs = (data.results || []).map(j => ({
        id: j.id,
        title: j.title,
        company: j.company.display_name,
        location: j.location.display_name,
        salaryMin: j.salary_min || null,
        salaryMax: j.salary_max || null,
        matchScore: 0, // We could calculate this if we had the profile here
        matchedSkills: [],
        description: j.description,
        applyUrl: j.redirect_url,
        postedDate: j.created,
        workModel: j.description.toLowerCase().includes('remote') ? 'Remote' : 
                   j.description.toLowerCase().includes('hybrid') ? 'Hybrid' : 'On-site',
        jobSource: j.source?.display_name || 'Adzuna',
        distanceMiles: null, // Adzuna doesn't easily provide distance in miles from a fixed point in results
      }));

      const result = { jobs: mappedJobs, count: data.count };
      
      localStorage.setItem(cacheKey, JSON.stringify({
        data: result,
        timestamp: Date.now()
      }));

      setIsCached(false);
      setLastUpdated(Date.now());
      return result;
    } catch (err) {
      if (err.message.includes('fetch')) throw new Error('Unable to reach job search service. Check your connection.');
      throw err;
    }
  }, [filters]);

  // Handle search submission
  const handleSearch = useCallback(async (what, where = '', forceAdzuna = false) => {
    setIsLoading(true);
    setSearchError(null);
    setHasSearched(true);
    setPage(1);
    setCurrentQuery({ what, where });

    const apiKey = localStorage.getItem('gemini_api_key');
    
    // Use AI Search if key is present and not forced to Adzuna
    if (apiKey && !forceAdzuna) {
      setIsAiSearch(true);
      try {
        const fullQuery = where ? `${what} in ${where}` : what;
        const jobs = await searchJobs(fullQuery, { proximity: filters.proximity });
        setAllJobs(jobs || []);
        setTotalResults(jobs?.length || 0);
        setIsCached(false);
        setLastUpdated(Date.now());
      } catch (err) {
        console.error('AI Search failed, falling back to Adzuna:', err);
        // Fallback to Adzuna
        const { jobs, count } = await fetchAdzunaJobs(what, where, 1);
        setAllJobs(jobs);
        setTotalResults(count);
        setIsAiSearch(false);
      } finally {
        setIsLoading(false);
      }
      return;
    }

    // Default to Adzuna Search
    setIsAiSearch(false);
    try {
      const { jobs, count } = await fetchAdzunaJobs(what, where, 1, forceAdzuna === true);
      if (jobs.length === 0) {
        setSearchError(`No jobs found for "${what}" ${where ? `in "${where}"` : ''}. Try broader keywords or a different location.`);
      }
      setAllJobs(jobs);
      setTotalResults(count);
    } catch (err) {
      setSearchError(err.message);
      setAllJobs([]);
    } finally {
      setIsLoading(false);
    }
  }, [fetchAdzunaJobs, filters.proximity]);

  const handleLoadMore = async () => {
    if (isLoading || isAiSearch) return;
    const nextPage = page + 1;
    setIsLoading(true);
    
    try {
      const { jobs } = await fetchAdzunaJobs(currentQuery.what, currentQuery.where, nextPage);
      setAllJobs(prev => [...prev, ...jobs]);
      setPage(nextPage);
    } catch (err) {
      setSearchError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Update a job's savedStatus (tracker integration)
  const handleSave = useCallback((jobId, status) => {
    setAllJobs((prev) => {
      const updated = prev.map((job) =>
        job.id === jobId ? { ...job, savedStatus: status } : job
      );
      
      // Persistence for tracked_jobs
      const jobToTrack = updated.find(j => j.id === jobId);
      if (jobToTrack) {
        const trackedRaw = localStorage.getItem('tracked_jobs') || '[]';
        let tracked = JSON.parse(trackedRaw);
        const existsIdx = tracked.findIndex(t => t.id === jobId);
        if (existsIdx > -1) {
          tracked[existsIdx] = jobToTrack;
        } else {
          tracked.push(jobToTrack);
        }
        localStorage.setItem('tracked_jobs', JSON.stringify(tracked));
      }
      
      return updated;
    });
  }, []);

  // Deduplication check against tracked_jobs and job_applications
  const jobsWithTracking = useMemo(() => {
    const trackedRaw = localStorage.getItem('tracked_jobs') || '[]';
    const appsRaw = localStorage.getItem('job_applications') || '[]';
    
    const tracked = [...JSON.parse(trackedRaw), ...JSON.parse(appsRaw)];
    
    return allJobs.map(job => {
      const isTracked = tracked.find(t => 
        (t.company.toLowerCase() === job.company.toLowerCase() && t.title.toLowerCase() === job.title.toLowerCase()) ||
        t.id === job.id
      );
      return isTracked ? { ...job, savedStatus: isTracked.status || isTracked.savedStatus || 'Saved' } : job;
    });
  }, [allJobs]);

  // Apply filters and sort to the job list
  const filteredJobs = useMemo(() => {
    let result = [...jobsWithTracking];

    // Filter: Work Model
    if (filters.workModel !== 'All') {
      result = result.filter((j) => j.workModel === filters.workModel);
    }

    // Filter: Role Type
    if (filters.roleType !== 'All') {
      result = result.filter((j) => 
        j.title.toLowerCase().includes(filters.roleType.toLowerCase())
      );
    }

    // Filter: Min Match Score (if we had scores)
    if (filters.minMatchScore > 0) {
      result = result.filter((j) => j.matchScore >= filters.minMatchScore);
    }

    // Sort
    switch (filters.sortBy) {
      case 'recent':
        result.sort((a, b) => {
          const dateA = a.postedDate ? new Date(a.postedDate) : new Date(0);
          const dateB = b.postedDate ? new Date(b.postedDate) : new Date(0);
          return dateB - dateA;
        });
        break;
      case 'company':
        result.sort((a, b) => a.company.localeCompare(b.company));
        break;
    }

    return result;
  }, [jobsWithTracking, filters]);

  return (
    <section className="w-full max-w-4xl mx-auto px-4 py-8">
      {/* Section header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-1">
          AI Job Search
        </h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm">
          Searches live job boards and scores each role against your profile
        </p>
      </div>

      {/* Search bar */}
      <div className="mb-6">
        <SearchBar onSearch={handleSearch} isLoading={isLoading} />
        
        {/* Cache and Limit Info */}
        <div className="mt-2 flex flex-col gap-1">
          {isCached && lastUpdated && (
            <p className="text-xs text-slate-500">
              Results cached · Updated {Math.round((Date.now() - lastUpdated) / 60000)} minutes ago · 
              <button 
                onClick={() => handleSearch(currentQuery.what, currentQuery.where, true)}
                className="ml-1 text-blue-600 hover:underline"
              >
                Refresh
              </button>
            </p>
          )}
          {requestCount > 900 && (
            <p className="text-xs text-amber-600 font-medium">
              Approaching monthly search limit — results may be cached longer
            </p>
          )}
        </div>
      </div>

      {/* Filter bar — only shown when there are results or loading */}
      {(hasSearched && !searchError) && (
        <div className="mb-5">
          <FilterBar
            filters={filters}
            onChange={setFilters}
            resultCount={isLoading ? 0 : totalResults}
          />
        </div>
      )}

      {/* Results area */}
      {isLoading && allJobs.length === 0 ? (
        // Loading skeletons
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <JobCardSkeleton key={i} />
          ))}
        </div>
      ) : searchError || (!hasSearched && allJobs.length === 0) || (hasSearched && filteredJobs.length === 0 && !isLoading) ? (
        // Empty / error states
        <EmptyState hasSearched={hasSearched} error={searchError} />
      ) : (
        // Job cards grid
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredJobs.map((job) => (
              <JobCard
                key={job.id}
                job={job}
                onSave={handleSave}
              />
            ))}
          </div>
          
          {/* Load More Button */}
          {allJobs.length < totalResults && (
            <div className="mt-8 flex justify-center">
              <button
                onClick={handleLoadMore}
                disabled={isLoading}
                className="
                  flex items-center gap-2 px-8 py-3
                  bg-white dark:bg-slate-800
                  border border-slate-200 dark:border-slate-700
                  text-slate-600 dark:text-slate-300
                  font-semibold rounded-xl
                  hover:bg-slate-50 dark:hover:bg-slate-700
                  transition-all duration-200
                  disabled:opacity-50
                "
              >
                {isLoading ? 'Loading...' : 'Load more results'}
              </button>
            </div>
          )}
        </>
      )}

    </section>
  );
}

// --- Helper Components ---

function JobCardSkeleton() {
  return (
    <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-5 animate-pulse">
      <div className="flex justify-between items-start mb-4">
        <div className="w-1/2 h-6 bg-slate-200 dark:bg-slate-700 rounded" />
        <div className="w-12 h-6 bg-slate-100 dark:bg-slate-700 rounded-full" />
      </div>
      <div className="w-1/3 h-4 bg-slate-100 dark:bg-slate-700 rounded mb-6" />
      <div className="flex gap-2 mb-6">
        <div className="w-16 h-5 bg-slate-50 dark:bg-slate-700 rounded-lg" />
        <div className="w-20 h-5 bg-slate-50 dark:bg-slate-700 rounded-lg" />
      </div>
      <div className="flex justify-between mt-auto pt-4 border-t border-slate-50 dark:border-slate-700">
        <div className="w-24 h-8 bg-slate-100 dark:bg-slate-700 rounded-lg" />
        <div className="w-24 h-8 bg-slate-100 dark:bg-slate-700 rounded-lg" />
      </div>
    </div>
  );
}

function EmptyState({ hasSearched, error }) {
  if (error) {
    return (
      <div className="text-center py-12 px-4 bg-red-50 dark:bg-red-900/10 rounded-2xl border border-red-100 dark:border-red-900/20">
        <div className="w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center text-red-600 dark:text-red-400 mx-auto mb-4">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <h3 className="text-lg font-bold text-red-800 dark:text-red-400 mb-2">Search Error</h3>
        <p className="text-red-600 dark:text-red-500 max-w-xs mx-auto text-sm">{error}</p>
      </div>
    );
  }

  if (hasSearched) {
    return (
      <div className="text-center py-16 px-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800">
        <div className="w-16 h-16 bg-slate-100 dark:bg-slate-700 rounded-full flex items-center justify-center text-slate-400 mx-auto mb-4">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200 mb-2">No matching jobs</h3>
        <p className="text-slate-500 dark:text-slate-400 max-w-xs mx-auto text-sm">
          Try adjusting your filters or searching for different keywords.
        </p>
      </div>
    );
  }

  return (
    <div className="text-center py-20 px-4">
      <div className="w-20 h-20 bg-sky-50 dark:bg-sky-900/10 rounded-3xl flex items-center justify-center text-sky-500 mx-auto mb-6 transform -rotate-6">
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
      <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-3">Ready to find your next role?</h3>
      <p className="text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
        Enter a job title and location above to start your AI-powered job search.
      </p>
    </div>
  );
}

