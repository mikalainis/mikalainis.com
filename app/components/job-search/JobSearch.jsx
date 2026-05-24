'use client';

/**
 * JobSearch.jsx
 * 
 * Parent component for the entire Job Search section.
 * Orchestrates search state, filtering, sorting, saving, and modal.
 * 
 * Drop this into any page: <JobSearch />
 */

import { useState, useMemo, useCallback } from 'react';
import SearchBar from './SearchBar';
import FilterBar from './FilterBar';
import JobCard from './JobCard';
import { searchJobs } from '@/lib/claudeApi';

// Default filter state
const DEFAULT_FILTERS = {
  workModel: 'All',
  roleType: 'All',
  minMatchScore: 70,
  sortBy: 'matchScore',
  proximity: 'Any',
};

// Loading skeleton for job cards
function JobCardSkeleton() {
  return (
    <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-5 animate-pulse">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-3/4 mb-2" />
          <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-1/2" />
        </div>
        <div className="h-8 w-14 bg-slate-200 dark:bg-slate-700 rounded" />
      </div>
      <div className="h-1 bg-slate-200 dark:bg-slate-700 rounded-full mb-4" />
      <div className="flex gap-2 mb-3">
        <div className="h-5 bg-slate-200 dark:bg-slate-700 rounded w-24" />
        <div className="h-5 bg-slate-200 dark:bg-slate-700 rounded w-16" />
        <div className="h-5 bg-slate-200 dark:bg-slate-700 rounded w-20" />
      </div>
      <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-full mb-2" />
      <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-4/5 mb-4" />
      <div className="flex gap-2">
        <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded w-16" />
        <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded w-24" />
        <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded w-14 ml-auto" />
      </div>
    </div>
  );
}

// Empty state component
function EmptyState({ hasSearched, error }) {
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4 text-center">
        <div className="w-16 h-16 rounded-2xl bg-red-50 dark:bg-red-900/20 flex items-center justify-center">
          <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <div>
          <p className="text-base font-medium text-slate-700 dark:text-slate-300 mb-1">Search failed</p>
          <p className="text-sm text-slate-500 dark:text-slate-400 max-w-sm">{error}</p>
        </div>
      </div>
    );
  }

  if (!hasSearched) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4 text-center">
        <div className="w-16 h-16 rounded-2xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center">
          <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <div>
          <p className="text-base font-medium text-slate-700 dark:text-slate-300 mb-1">
            Ready to search
          </p>
          <p className="text-sm text-slate-500 dark:text-slate-400 max-w-sm">
            Type a query above or pick a quick search to find jobs matching your profile
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center py-20 gap-4 text-center">
      <div className="w-16 h-16 rounded-2xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center">
        <svg className="w-8 h-8 text-slate-300 dark:text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
            d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <div>
        <p className="text-base font-medium text-slate-700 dark:text-slate-300 mb-1">No matching roles</p>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Try adjusting your filters or searching with different keywords
        </p>
      </div>
    </div>
  );
}

export default function JobSearch() {
  // All jobs returned from the last search (un-filtered)
  const [allJobs, setAllJobs] = useState([]);
  // Active filter state
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  // Search state
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [searchError, setSearchError] = useState(null);

  // Handle search submission
  const handleSearch = useCallback(async (query) => {
    setIsLoading(true);
    setSearchError(null);
    setHasSearched(true);

    try {
      const jobs = await searchJobs(query, { proximity: filters.proximity });
      setAllJobs(jobs);
      // Reset filters to defaults on new search
      setFilters(DEFAULT_FILTERS);
    } catch (err) {
      setSearchError(err.message || 'Search failed. Please try again.');
      setAllJobs([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Update a job's savedStatus (tracker integration)
  const handleSave = useCallback((jobId, status) => {
    setAllJobs((prev) =>
      prev.map((job) =>
        job.id === jobId ? { ...job, savedStatus: status } : job
      )
    );
  }, []);

  // Apply filters and sort to the full job list
  const filteredJobs = useMemo(() => {
    let result = [...allJobs];

    // Filter: Work Model
    if (filters.workModel !== 'All') {
      result = result.filter((j) => j.workModel === filters.workModel);
    }

    // Filter: Role Type
    if (filters.roleType !== 'All') {
      result = result.filter((j) => j.jobType === filters.roleType);
    }

    // Filter: Min Match Score
    result = result.filter((j) => j.matchScore >= filters.minMatchScore);

    // Filter: Proximity (Remote jobs always pass; On-site/Hybrid filtered by distanceMiles)
    if (filters.proximity !== 'Any') {
      const maxMiles = parseInt(filters.proximity, 10);
      result = result.filter(
        (j) => j.workModel === 'Remote' || j.distanceMiles === null || j.distanceMiles <= maxMiles
      );
    }

    // Sort
    switch (filters.sortBy) {
      case 'matchScore':
        result.sort((a, b) => b.matchScore - a.matchScore);
        break;
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
  }, [allJobs, filters]);

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
      </div>

      {/* Filter bar — only shown when there are results or loading */}
      {(hasSearched && !searchError) && (
        <div className="mb-5">
          <FilterBar
            filters={filters}
            onChange={setFilters}
            resultCount={isLoading ? 0 : filteredJobs.length}
          />
        </div>
      )}

      {/* Results area */}
      {isLoading ? (
        // Loading skeletons
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <JobCardSkeleton key={i} />
          ))}
        </div>
      ) : searchError || !hasSearched || filteredJobs.length === 0 ? (
        // Empty / error states
        <EmptyState hasSearched={hasSearched} error={searchError} />
      ) : (
        // Job cards grid
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredJobs.map((job) => (
            <JobCard
              key={job.id}
              job={job}
              onSave={handleSave}
            />
          ))}
        </div>
      )}

    </section>
  );
}
