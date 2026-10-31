/* Mikalogix live graphics: a growing node network (Services) and a
   five-stage process pipeline (How it works). Canvas 2D, no dependencies.
   Pauses off-screen and in background tabs; draws one still frame when the
   visitor prefers reduced motion. */
(function () {
  'use strict';

  var REDUCED = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var INK = '255,255,255';
  var MUTED = '163,163,168';
  var BLUE = '59,130,246';
  var BG = '#0B0B0C';
  var MONO = '"IBM Plex Mono", ui-monospace, monospace';
  var TAU = Math.PI * 2;

  function rgba(c, a) { return 'rgba(' + c + ',' + a.toFixed(3) + ')'; }
  function clamp(v, a, b) { return v < a ? a : v > b ? b : v; }
  function ease(p) { p = clamp(p, 0, 1); return 1 - Math.pow(1 - p, 3); }
  function rnd(a, b) { return a + Math.random() * (b - a); }
  function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
  function pad3(n) { return ('00' + n).slice(-3); }

  function label(ctx, text, x, y, color, align) {
    ctx.font = '500 10px ' + MONO;
    if ('letterSpacing' in ctx) ctx.letterSpacing = '1.5px';
    ctx.textAlign = align || 'left';
    ctx.textBaseline = 'alphabetic';
    ctx.fillStyle = color;
    ctx.fillText(text, x, y);
  }

  function liveTag(ctx, w, t) {
    label(ctx, 'LIVE', w - 26, 20, rgba(MUTED, 1), 'right');
    ctx.fillStyle = rgba(INK, 0.35 + 0.65 * (0.5 + 0.5 * Math.sin(t * 3)));
    ctx.fillRect(w - 19, 13, 5, 5);
  }

  /* ---------- Services: nodes spawn from three hubs, link up, carry data, retire ---------- */
  function NodeGraph() {
    var HUB_LABELS = ['AGENTS', 'WORKFLOWS', 'LEGACY'];
    var w = 0, h = 0, t = 0, nextSpawn = 0, nextPacket = 0, maxNodes = 40, ready = false;
    var nodes = [], edges = [], packets = [], hubs = [];

    function alive(n) { return n.hub || t < n.born + n.life; }
    function lifeFade(n) { return n.hub ? 1 : clamp((n.born + n.life - t) / 1.2, 0, 1); }

    function reset() {
      t = 0; nextSpawn = 0; nextPacket = 0;
      nodes = []; edges = []; packets = [];
      var fx = w < 640 ? [0.18, 0.5, 0.82] : [1 / 6, 0.5, 5 / 6];
      hubs = fx.map(function (f, i) {
        var n = { x: Math.round(w * f), y: Math.round(h * 0.5), hub: true, cluster: i, kids: 0, born: -99, label: HUB_LABELS[i] };
        nodes.push(n);
        return n;
      });
      edges.push({ a: hubs[0], b: hubs[1], born: -99, perm: true });
      edges.push({ a: hubs[1], b: hubs[2], born: -99, perm: true });
      maxNodes = Math.round(clamp((w * h) / 3400, 16, 70));
    }

    function freeSpot(x, y) {
      if (x < 14 || x > w - 14 || y < 32 || y > h - 12) return false;
      for (var i = 0; i < hubs.length; i++) {
        if (Math.abs(x - hubs[i].x) < 44 && y > hubs[i].y + 8 && y < hubs[i].y + 32) return false;
      }
      for (var j = 0; j < nodes.length; j++) {
        var n = nodes[j];
        if (alive(n) && Math.hypot(n.x - x, n.y - y) < 20) return false;
      }
      return true;
    }

    function spawn() {
      var count = 0;
      var parents = nodes.filter(function (n) {
        if (!n.hub) count++;
        return n.hub ? n.kids < 7 : (alive(n) && n.born + n.life - t > 3 && n.kids < 3);
      });
      if (count >= maxNodes || !parents.length) return;
      for (var tries = 0; tries < 10; tries++) {
        var p = pick(parents);
        var hub = hubs[p.cluster];
        var ang = p.hub ? rnd(0, TAU) : Math.atan2(p.y - hub.y, p.x - hub.x) + rnd(-1.1, 1.1);
        var d = rnd(26, 54);
        var x = p.x + Math.cos(ang) * d, y = p.y + Math.sin(ang) * d;
        if (!freeSpot(x, y)) continue;
        var n = { x: x, y: y, hub: false, cluster: p.cluster, kids: 0, parent: p, born: t, life: rnd(8, 16) };
        nodes.push(n);
        p.kids++;
        edges.push({ a: p, b: n, born: t });
        if (Math.random() < 0.4) {
          var best = null, bd = 84;
          nodes.forEach(function (m) {
            if (m === n || m === p || m.hub || !alive(m)) return;
            var dd = Math.hypot(m.x - x, m.y - y);
            if (dd < bd) { bd = dd; best = m; }
          });
          if (best) edges.push({ a: n, b: best, born: t + 0.3 });
        }
        return;
      }
    }

    function update(dt) {
      t += dt;
      if (t >= nextSpawn) { spawn(); nextSpawn = t + rnd(0.2, 0.5); }

      nodes = nodes.filter(function (n) {
        if (alive(n)) return true;
        if (n.parent) n.parent.kids--;
        return false;
      });
      edges = edges.filter(function (e) { return e.perm || (alive(e.a) && alive(e.b)); });

      if (t >= nextPacket) {
        var ready = edges.filter(function (e) { return t - e.born > 0.6; });
        if (ready.length) {
          var e = pick(ready);
          packets.push({ e: e, p: 0, fwd: Math.random() < 0.5, blue: Math.random() < 0.15, len: Math.max(1, Math.hypot(e.b.x - e.a.x, e.b.y - e.a.y)) });
        }
        nextPacket = t + rnd(0.06, 0.18);
      }
      packets = packets.filter(function (k) {
        k.p += (dt * 110) / k.len;
        return k.p < 1 && (k.e.perm || (alive(k.e.a) && alive(k.e.b)));
      });
    }

    function draw(ctx) {
      ctx.clearRect(0, 0, w, h);

      ctx.fillStyle = rgba(INK, 0.06);
      for (var gx = 12; gx < w; gx += 24) for (var gy = 12; gy < h; gy += 24) ctx.fillRect(gx, gy, 1, 1);

      ctx.lineWidth = 1;
      edges.forEach(function (e) {
        var p = ease((t - e.born) / 0.45);
        if (p <= 0) return;
        var a = (e.perm ? 0.24 : 0.2) * Math.min(lifeFade(e.a), lifeFade(e.b));
        ctx.strokeStyle = rgba(INK, a);
        ctx.beginPath();
        ctx.moveTo(e.a.x, e.a.y);
        ctx.lineTo(e.a.x + (e.b.x - e.a.x) * p, e.a.y + (e.b.y - e.a.y) * p);
        ctx.stroke();
      });

      packets.forEach(function (k) {
        var a = k.fwd ? k.e.a : k.e.b, b = k.fwd ? k.e.b : k.e.a;
        var tp = Math.max(0, k.p - 16 / k.len);
        var x = a.x + (b.x - a.x) * k.p, y = a.y + (b.y - a.y) * k.p;
        var c = k.blue ? BLUE : INK;
        ctx.strokeStyle = rgba(c, 0.45);
        ctx.beginPath();
        ctx.moveTo(a.x + (b.x - a.x) * tp, a.y + (b.y - a.y) * tp);
        ctx.lineTo(x, y);
        ctx.stroke();
        ctx.fillStyle = rgba(c, 1);
        ctx.fillRect(x - 1.5, y - 1.5, 3, 3);
      });

      nodes.forEach(function (n) {
        if (n.hub) return;
        var age = t - n.born, s = ease(age / 0.35), f = lifeFade(n);
        if (s <= 0 || f <= 0) return;
        ctx.fillStyle = rgba(INK, 0.85 * f);
        ctx.beginPath();
        ctx.arc(n.x, n.y, 2.2 * s, 0, TAU);
        ctx.fill();
        if (age < 0.9) {
          ctx.strokeStyle = rgba(INK, 0.5 * (1 - age / 0.9));
          ctx.beginPath();
          ctx.arc(n.x, n.y, 3 + age * 16, 0, TAU);
          ctx.stroke();
        }
      });

      hubs.forEach(function (hb) {
        ctx.fillStyle = BG;
        ctx.fillRect(hb.x - 7, hb.y - 7, 14, 14);
        ctx.strokeStyle = rgba(INK, 0.9);
        ctx.strokeRect(hb.x - 5.5, hb.y - 5.5, 11, 11);
        ctx.fillStyle = rgba(INK, 0.9);
        ctx.fillRect(hb.x - 1.5, hb.y - 1.5, 3, 3);
        label(ctx, hb.label, hb.x, hb.y + 25, rgba(MUTED, 1), 'center');
      });

      label(ctx, 'NODES ' + pad3(nodes.length - hubs.length) + '   LINKS ' + pad3(edges.length), 14, 20, rgba(MUTED, 1));
      liveTag(ctx, w, t);
    }

    return {
      resize: function (nw, nh) {
        var big = !ready || Math.abs(nw - w) > 40 || Math.abs(nh - h) > 20;
        w = nw; h = nh;
        if (big) {
          reset();
          for (var i = 0; i < 300; i++) update(1 / 30);
          ready = true;
        }
      },
      update: update,
      draw: draw
    };
  }

  /* ---------- How it works: work items flow through five stages and loop back ---------- */
  function Pipeline(getActive) {
    var NAMES = ['DISCOVER', 'DESIGN', 'BUILD', 'DEPLOY', 'OPTIMIZE'];
    var SPREAD = [0.8, 1, 1.5, 0.7];
    var w = 0, h = 0, t = 0, next = 0, ready = false;
    var xs = [], cy = 0, amp = 0, arcY = 0, parts = [], flash = [0, 0, 0, 0, 0];

    function layout() {
      var pad = clamp(w * 0.07, 30, 90);
      xs = [0, 1, 2, 3, 4].map(function (i) { return Math.round(pad + (i * (w - 2 * pad)) / 4); });
      cy = Math.round(h * 0.6);
      amp = Math.min(h * 0.2, 36);
      arcY = cy - h * 0.7;
    }

    function lanes() { return [rnd(-1, 1), rnd(-1, 1), rnd(-1, 1), rnd(-1, 1)]; }

    function pos(p, u) {
      u = clamp(u, 0, 1);
      var s = Math.min(Math.floor(u * 4), 3), f = u * 4 - s;
      return [xs[s] + (xs[s + 1] - xs[s]) * f, cy + p.lanes[s] * amp * SPREAD[s] * Math.sin(Math.PI * f)];
    }

    function loopPos(b) {
      b = clamp(b, 0, 1);
      var x0 = xs[4], x2 = xs[0], cx = (x0 + x2) / 2, u = 1 - b;
      return [u * u * x0 + 2 * u * b * cx + b * b * x2, u * u * cy + 2 * u * b * arcY + b * b * cy];
    }

    function update(dt) {
      t += dt;
      if (t >= next) {
        parts.push({ u: 0, lanes: lanes(), sp: rnd(0.07, 0.11), seg: 0, back: false, b: 0 });
        next = t + rnd(0.15, 0.3) * clamp(800 / Math.max(w, 1), 0.8, 2);
      }
      var born = [];
      parts = parts.filter(function (p) {
        if (p.back) {
          p.b += dt / 2.6;
          if (p.b >= 1) { flash[0] = 1; return false; }
          return true;
        }
        p.u += p.sp * dt;
        if (p.u >= 1) {
          flash[4] = 1;
          if (Math.random() < 0.3) { p.back = true; p.b = 0; return true; }
          return false;
        }
        var s = Math.min(Math.floor(p.u * 4), 3);
        if (s !== p.seg) {
          flash[s] = 1;
          p.seg = s;
          if (s === 2 && Math.random() < 0.5) {
            var l = lanes();
            born.push({ u: p.u, lanes: [p.lanes[0], p.lanes[1], l[2], l[3]], sp: p.sp * rnd(0.9, 1.1), seg: s, back: false, b: 0 });
          }
          if (s === 3 && Math.random() < 0.3) return false;
        }
        return true;
      });
      parts = parts.concat(born);
      for (var i = 0; i < 5; i++) flash[i] *= Math.exp(-dt * 3);
    }

    function draw(ctx) {
      var active = getActive();
      ctx.clearRect(0, 0, w, h);
      ctx.lineWidth = 1;

      ctx.strokeStyle = rgba(INK, 0.1);
      ctx.beginPath();
      ctx.moveTo(xs[0], cy);
      ctx.lineTo(xs[4], cy);
      ctx.stroke();

      ctx.setLineDash([2, 4]);
      ctx.strokeStyle = rgba(INK, 0.16);
      ctx.beginPath();
      ctx.moveTo(xs[4], cy);
      ctx.quadraticCurveTo((xs[0] + xs[4]) / 2, arcY, xs[0], cy);
      ctx.stroke();
      ctx.setLineDash([]);
      label(ctx, 'ITERATE', w / 2, Math.round((cy + arcY) / 2) - 6, rgba(MUTED, 0.8), 'center');

      var ax = xs[active];
      parts.forEach(function (p) {
        var head = p.back ? loopPos(p.b) : pos(p, p.u);
        var near = !p.back && Math.abs(head[0] - ax) < 30;
        var c = near ? BLUE : INK;
        var prev = head;
        for (var k = 1; k <= 6; k++) {
          var q = p.back ? loopPos(p.b - k * 0.012) : pos(p, p.u - k * 0.004);
          ctx.strokeStyle = rgba(c, 0.5 * (1 - k / 7));
          ctx.beginPath();
          ctx.moveTo(prev[0], prev[1]);
          ctx.lineTo(q[0], q[1]);
          ctx.stroke();
          prev = q;
        }
        ctx.fillStyle = rgba(c, p.back ? 0.7 : 1);
        ctx.fillRect(head[0] - 1.5, head[1] - 1.5, 3, 3);
      });

      for (var i = 0; i < 5; i++) {
        var x = xs[i], act = i === active, done = i < active;
        if (act) {
          var f = (t % 1.8) / 1.8, r = 9 + f * 20;
          ctx.strokeStyle = rgba(BLUE, 0.6 * (1 - f));
          ctx.strokeRect(x - r + 0.5, cy - r + 0.5, r * 2, r * 2);
          ctx.fillStyle = rgba(BLUE, 1);
          ctx.fillRect(x - 6, cy - 6, 12, 12);
        } else {
          if (flash[i] > 0.05) {
            ctx.strokeStyle = rgba(INK, flash[i] * 0.35);
            ctx.strokeRect(x - 9.5, cy - 9.5, 19, 19);
          }
          ctx.fillStyle = BG;
          ctx.fillRect(x - 6, cy - 6, 12, 12);
          ctx.strokeStyle = rgba(INK, done ? 0.9 : clamp(0.45 + flash[i] * 0.5, 0, 1));
          ctx.strokeRect(x - 5.5, cy - 5.5, 11, 11);
          if (done) { ctx.fillStyle = rgba(INK, 0.9); ctx.fillRect(x - 1.5, cy - 1.5, 3, 3); }
        }
        var num = '0' + (i + 1);
        label(ctx, w >= 720 ? num + ' ' + NAMES[i] : num, x, cy + 30, act ? rgba(INK, 1) : rgba(MUTED, 1), 'center');
      }

      label(ctx, 'PHASE 0' + (active + 1) + '/05' + (w >= 520 ? ' · ' + NAMES[active] : ''), 14, 20, rgba(MUTED, 1));
      liveTag(ctx, w, t);
    }

    return {
      resize: function (nw, nh) {
        w = nw; h = nh;
        layout();
        if (!ready) { for (var i = 0; i < 270; i++) update(1 / 30); ready = true; }
      },
      update: update,
      draw: draw,
      hit: function (x, y) {
        if (Math.abs(y - cy) > 36) return -1;
        for (var i = 0; i < 5; i++) if (Math.abs(x - xs[i]) < 30) return i;
        return -1;
      }
    };
  }

  /* ---------- Runner: sizing, visibility, frame loop ---------- */
  function mount(canvas, viz) {
    var ctx = canvas.getContext('2d');
    var w = 0, h = 0, running = false, onScreen = false, raf = 0, last = 0;

    function draw() { if (w > 0 && h > 0) viz.draw(ctx); }

    function resize() {
      var r = canvas.getBoundingClientRect();
      if (r.width < 1 || r.height < 1) return;
      var dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = r.width; h = r.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      viz.resize(w, h);
      draw();
      sync();
    }

    function frame(ts) {
      var dt = Math.min((ts - last) / 1000, 0.05);
      last = ts;
      if (dt > 0) viz.update(dt);
      draw();
      raf = requestAnimationFrame(frame);
    }

    function sync() {
      var want = !REDUCED && onScreen && !document.hidden && w > 0;
      if (want && !running) { running = true; last = performance.now(); raf = requestAnimationFrame(frame); }
      else if (!want && running) { running = false; cancelAnimationFrame(raf); }
    }

    if ('ResizeObserver' in window) new ResizeObserver(resize).observe(canvas);
    else window.addEventListener('resize', resize);
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (es) { onScroll(es[0].isIntersecting); }, { rootMargin: '80px' }).observe(canvas);
    } else onScroll(true);
    function onScroll(v) { onScreen = v; sync(); }
    document.addEventListener('visibilitychange', sync);
    resize();
    return { redraw: draw };
  }

  function init() {
    var graph = document.getElementById('viz-graph');
    if (graph && graph.getContext) mount(graph, NodeGraph());

    var pipe = document.getElementById('viz-pipeline');
    if (!pipe || !pipe.getContext) return;
    var tabs = document.querySelectorAll('.step-tab');
    var getActive = function () {
      for (var i = 0; i < tabs.length; i++) if (tabs[i].classList.contains('active')) return i;
      return 0;
    };
    var viz = Pipeline(getActive);
    var handle = mount(pipe, viz);

    function point(e) { var r = pipe.getBoundingClientRect(); return viz.hit(e.clientX - r.left, e.clientY - r.top); }
    pipe.addEventListener('click', function (e) {
      var i = point(e);
      if (i >= 0 && typeof window.showPhase === 'function') window.showPhase(i);
      handle.redraw();
    });
    pipe.addEventListener('mousemove', function (e) { pipe.style.cursor = point(e) >= 0 ? 'pointer' : 'default'; });
    if (REDUCED) document.addEventListener('click', function () { setTimeout(handle.redraw, 0); });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
