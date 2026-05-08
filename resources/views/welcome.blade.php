<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>novelglot — online book clubs</title>

    {{-- Fonts --}}
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Source+Serif+4:ital,opsz,wght@0,8..60,300..800;1,8..60,300..700&family=Manrope:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">

    {{-- Tailwind Play CDN (mockup-only — for production move this config into tailwind.config.js) --}}
    <script src="https://cdn.tailwindcss.com"></script>
    @verbatim
    <script>
      tailwind.config = {
        theme: {
          extend: {
            colors: {
              paper: '#F7F2E9',
              'paper-2': '#EFE8DA',
              ink: '#1A1814',
              'ink-2': '#3D3833',
              muted: '#7A736A',
              rule: '#E2D9C6',
              forest: 'oklch(0.45 0.08 150)',
              'forest-soft': 'oklch(0.92 0.03 150)',
              'forest-ink': 'oklch(0.38 0.06 150)',
              terracotta: 'oklch(0.62 0.13 40)',
              'terracotta-soft': 'oklch(0.94 0.03 40)',
              'terracotta-ink': 'oklch(0.45 0.10 40)',
              gold: 'oklch(0.78 0.10 80)',
              'gold-soft': 'oklch(0.94 0.04 80)',
              'gold-ink': 'oklch(0.45 0.07 80)',
            },
            fontFamily: {
              serif: ['"Source Serif 4"', 'Georgia', 'serif'],
              sans: ['Manrope', '-apple-system', 'system-ui', 'sans-serif'],
              mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
            },
            maxWidth: {
              page: '1200px',
            }
          }
        }
      }
    </script>
    @endverbatim

    {{-- Laravel asset pipeline (kept in case other resources hook in here later) --}}
    @vite(['resources/css/app.css', 'resources/js/app.jsx', 'resources/js/app.js'])

    <style>
      /* Things awkward in pure Tailwind: OKLCH gradients, layered shadows, decorative patterns. */

      /* added for smooth scrolling of browse events button tag */
      html { scroll-behavior: smooth; }


      body { font-family: 'Manrope', -apple-system, system-ui, sans-serif; }

      /* ---- Avatar helpers ---- */
      .av { display: inline-flex; align-items: center; justify-content: center; border-radius: 50%; font-weight: 600; flex-shrink: 0; letter-spacing: 0.02em; }
      .av-s24 { width: 24px; height: 24px; font-size: 9px; }
      .av-s26 { width: 26px; height: 26px; font-size: 10px; }
      .av-s28 { width: 28px; height: 28px; font-size: 11px; }
      .av-ring { box-shadow: 0 0 0 2px #F7F2E9; }
      .av-forest      { background: oklch(0.92 0.03 150); color: oklch(0.38 0.06 150); }
      .av-terracotta  { background: oklch(0.94 0.03 40);  color: oklch(0.45 0.10 40); }
      .av-gold        { background: oklch(0.94 0.04 80);  color: oklch(0.45 0.07 80); }

      /* ---- Book cover patterns ---- */
      .cover-bg-forest     { background: repeating-linear-gradient(45deg, oklch(0.92 0.03 150) 0 12px, color-mix(in oklch, oklch(0.45 0.08 150) 30%, transparent) 12px 13.5px); }
      .cover-bg-terracotta { background: repeating-linear-gradient(45deg, oklch(0.94 0.03 40)  0 12px, color-mix(in oklch, oklch(0.62 0.13 40)  30%, transparent) 12px 13.5px); }
      .cover-bg-gold       { background: repeating-linear-gradient(45deg, oklch(0.94 0.04 80)  0 12px, color-mix(in oklch, oklch(0.78 0.10 80)  35%, transparent) 12px 13.5px); }
      .cover-shadow {
        box-shadow:
          0 1px 0 rgba(0,0,0,0.04),
          0 12px 24px -16px rgba(26,24,20,0.35),
          inset 2px 0 0 rgba(0,0,0,0.06);
      }
    </style>
</head>
<body class="bg-paper text-ink antialiased min-h-screen m-0">

<header class="sticky top-0 z-40 bg-paper/90 backdrop-blur-md border-b border-rule">
  <div class="max-w-page mx-auto px-5 sm:px-8 py-4 flex items-center justify-between">
    <a class="flex items-center gap-2.5" href="{{ url('/') }}">
      <span class="w-7 h-7 rounded-md bg-terracotta flex items-center justify-center" aria-hidden="true">
        <svg width="22" height="22" viewBox="0 0 32 32">
          <path d="M6 9 C 10 9, 14 10, 16 12 C 18 10, 22 9, 26 9 L 26 23 C 22 23, 18 24, 16 26 C 14 24, 10 23, 6 23 Z"
                fill="none" stroke="#F7F2E9" stroke-width="1.6" stroke-linejoin="round"/>
          <path d="M16 12 L 16 26" stroke="#F7F2E9" stroke-width="1.2"/>
        </svg>
      </span>
      <span class="font-serif text-[22px] font-semibold italic tracking-tight text-ink">novelglot</span>
    </a>
    <nav class="flex items-center gap-1 sm:gap-2">
      <a class="hidden md:inline-block px-3.5 py-2 text-sm text-ink-2 hover:text-ink transition-colors" href="#listing">Browse events</a>
      <span class="hidden md:inline-block w-px h-5 bg-rule mx-3"></span>

      @auth
        <a href="{{ url('/dashboard') }}"
           class="px-3 sm:px-4 py-2 text-sm font-semibold text-ink rounded-full hover:bg-paper-2 transition-colors">
          Dashboard
        </a>
        <!-- <a href="{{ route('books.list') }}"
           class="px-4 py-2 text-sm font-semibold text-paper bg-ink rounded-full tracking-tight hover:-translate-y-px transition-transform">
          Browse
        </a> -->
      @else
        @if (Route::has('login'))
          <a href="{{ route('login') }}"
             class="px-3 sm:px-4 py-2 text-sm font-semibold text-ink rounded-full hover:bg-paper-2 transition-colors">
            Log in
          </a>
        @endif
        @if (Route::has('register'))
          <a href="{{ route('register') }}"
             class="px-4 py-2 text-sm font-semibold text-paper bg-ink rounded-full tracking-tight hover:-translate-y-px transition-transform">
            Sign up
          </a>
        @endif
      @endauth
    </nav>
  </div>
</header>

<main class="max-w-page mx-auto px-5 sm:px-8 pb-20">

  {{-- Hero --}}
  <section class="pt-12 sm:pt-16 lg:pt-[72px] pb-8">
    <div class="font-mono text-[11px] tracking-[0.18em] uppercase text-terracotta mb-4">— novelglot · online book clubs & intellectual salons</div>
    <div class="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-10 lg:gap-16 items-end">
      <div>
        <h1 class="font-serif text-[32px] sm:text-5xl lg:text-[64px] font-medium leading-[0.98] tracking-[-0.03em] text-ink text-balance m-0">
          Talk about great <em class="italic text-terracotta font-medium">books</em><br>with interesting people
        </h1>
        <p class="font-serif text-lg sm:text-[21px] leading-snug text-ink-2 mt-6 max-w-[520px]">
        Join thoughtful online book clubs and literary salons with readers around the world. Browse upcoming discussions, reserve a seat, and meet on video for a conversation about books and ideas.        </p>
        <div class="flex flex-wrap gap-3 mt-8 items-center">
          @auth
            <!-- <a href="{{ route('books.list') }}"
               class="px-6 py-3.5 rounded-full bg-ink text-paper font-semibold text-[15px] tracking-tight hover:-translate-y-px transition-transform">
              Browse clubs
            </a> -->
          @else
            <a href="{{ route('register') }}"
               class="px-6 py-3.5 rounded-full bg-ink text-paper font-semibold text-[15px] tracking-tight hover:-translate-y-px transition-transform">
              Create a free account
            </a>
          @endauth
          <a class="px-3 py-3.5 text-sm text-ink-2 font-medium hover:text-ink flex items-center gap-1.5 transition-colors" href="#listing">
            See upcoming events
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </a>
        </div>
        <div class="flex items-center gap-3 mt-7 text-[13px] text-muted flex-wrap">
          <span class="flex">
            <span class="av av-s28 av-ring av-forest">MW</span>
            <span class="av av-s28 av-ring av-terracotta -ml-2">DP</span>
            <span class="av av-s28 av-ring av-gold -ml-2">IC</span>
            <span class="av av-s28 av-ring av-forest -ml-2">TB</span>
          </span>
          <span><strong class="text-ink font-semibold">2,400+ readers</strong> reserving seats this month</span>
        </div>
      </div>

      <aside class="p-7 sm:p-8 border border-rule rounded-2xl bg-paper">
        <div class="font-mono text-[10px] tracking-[0.18em] uppercase text-muted mb-4">How it works</div>
        <div class="flex gap-3.5 py-3.5 border-t border-rule first:border-t-0">
          <div class="font-mono text-[11px] text-terracotta font-medium pt-0.5">01</div>
          <div>
            <div class="font-serif text-[17px] font-semibold text-ink tracking-tight">Find a discussion</div>
            <div class="text-[13px] text-ink-2 leading-snug mt-1">Browse our calendar of events to find a book club or online salon that interests you.</div>
          </div>
        </div>
        <div class="flex gap-3.5 py-3.5 border-t border-rule">
          <div class="font-mono text-[11px] text-terracotta font-medium pt-0.5">02</div>
          <div>
            <div class="font-serif text-[17px] font-semibold text-ink tracking-tight">Reserve a seat</div>
            <div class="text-[13px] text-ink-2 leading-snug mt-1">Register for an event with just a few clicks.</div>
          </div>
        </div>
        <div class="flex gap-3.5 py-3.5 border-t border-rule">
          <div class="font-mono text-[11px] text-terracotta font-medium pt-0.5">03</div>
          <div>
            <div class="font-serif text-[17px] font-semibold text-ink tracking-tight">Meet on video</div>
            <div class="text-[13px] text-ink-2 leading-snug mt-1">A 60–90 minute conversation about books, essays, and ideas with people from around the world.</div>
          </div>
        </div>
      </aside>
    </div>
  </section>

  {{-- Listing intro banner --}}
  <!-- <div id="listing" class="mt-8 px-5 sm:px-6 py-5 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 sm:gap-6 bg-paper-2 rounded-xl">
    <div>
      <h2 class="m-0 font-serif text-[22px] font-semibold text-ink tracking-tight">Upcoming book clubs</h2>
      <p class="mt-0.5 mb-0 text-[13px] text-ink-2">Eight clubs meeting in the next ten days. Sign up to reserve a seat.</p>
    </div>
    @auth
      <a href="{{ route('meetings.list') }}"
         class="px-5 py-2.5 rounded-full bg-ink text-paper font-semibold text-[13px] hover:-translate-y-px transition-transform self-start sm:self-auto">
        View all meetings
      </a>
    @else
      <a href="{{ route('register') }}"
         class="px-5 py-2.5 rounded-full bg-ink text-paper font-semibold text-[13px] hover:-translate-y-px transition-transform self-start sm:self-auto">
        Sign up — it's free
      </a>
    @endauth
  </div> -->

  {{--
    -------------------------------------------------------------------------
    Upcoming meetings — currently static placeholder cards.

    Later, swap each `<article>` block for a Blade @foreach loop driven by data
    from MeetingController::list (route: meetings.list, /api/meetings/join).
    Group meetings by relative date (Today / Tomorrow / This week / Next week).
    -------------------------------------------------------------------------
  --}}

  {{-- Today --}}
  <div id="listing" class="flex items-baseline gap-3.5 pb-1.5 mt-12">
    <h2 class="m-0 font-serif text-[13px] font-semibold tracking-[0.16em] uppercase text-ink">— Today</h2>
    <span class="font-mono text-xs text-muted">2 clubs</span>
  </div>

  <article class="grid grid-cols-1 sm:grid-cols-[auto_1fr] lg:grid-cols-[auto_1fr_auto] gap-6 sm:gap-8 items-center py-6 px-1 border-t border-rule">
    {{-- Cover --}}
    <div class="relative w-[156px] h-[212px] rounded overflow-hidden bg-paper-2 cover-shadow flex-shrink-0">
      <div class="absolute inset-0 cover-bg-forest"></div>
      <div class="absolute left-0 top-0 bottom-0 w-1.5 bg-forest opacity-40"></div>
      <div class="absolute left-3.5 right-3.5 top-[30%] h-[40%] bg-paper/90 flex flex-col justify-center items-center text-center px-1.5">
        
        <div class="font-serif text-sm leading-tight font-semibold text-ink text-balance">The Overstory</div>
        <div class="font-serif text-[10px] italic text-ink-2 mt-1.5">Richard Powers</div>
      </div>
    </div>
    {{-- Meta --}}
    <div class="flex flex-col gap-3.5 min-w-0">
      <div class="flex items-center gap-2.5 text-[13px] text-ink-2 flex-wrap">
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6.5" stroke="currentColor" stroke-width="1.2"/><path d="M8 4.5V8L10.5 9.5" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/></svg>
        <span class="font-semibold text-ink">Tue, May 5</span><span class="text-rule">·</span><span>7:00 PM CDT</span>
        <span class="ml-2 text-[11px] px-2 py-[3px] rounded-full bg-forest-soft text-forest-ink font-semibold tracking-wider uppercase">Online</span>
      </div>
      <h3 class="m-0 font-serif text-2xl sm:text-[28px] leading-[1.15] font-semibold tracking-tight text-ink text-balance">Slow Reading: The Overstory, Part II</h3>
      <div class="flex items-center gap-2.5 text-sm text-ink-2 flex-wrap">
        <span class="av av-s24 av-forest">MW</span>
        <span>Hosted by <span class="text-ink font-semibold">Maren Whitfield</span></span>
        <span class="text-rule">·</span>
        <span class="font-serif italic">Reading <b class="text-ink font-semibold not-italic">The Overstory</b> by Richard Powers</span>
      </div>
      <div class="flex items-center gap-4 sm:gap-6 mt-1 flex-wrap">
        <div class="flex items-center gap-2.5 text-[13px] text-ink-2 font-medium">
          <span class="flex">
            <span class="av av-s26 av-ring av-forest">LK</span>
            <span class="av av-s26 av-ring av-terracotta -ml-2">JR</span>
            <span class="av av-s26 av-ring av-gold -ml-2">SP</span>
          </span>
          <span>14 readers joining</span>
        </div>
        <div class="flex-1 max-w-[160px] h-1 bg-paper-2 rounded-full overflow-hidden min-w-[80px]">
          <span class="block h-full bg-forest" style="width:70%"></span>
        </div>
        <div class="text-xs text-muted tabular-nums">14/20 seats</div>
      </div>
    </div>
    {{-- CTA --}}
    <div class="flex flex-col gap-2.5 items-stretch sm:col-span-2 lg:col-span-1 lg:min-w-[170px]">
      @auth
        <a href="{{ route('meetings.list') }}"
           class="px-5 py-3 rounded-full bg-ink text-paper border border-ink font-semibold text-sm tracking-tight hover:-translate-y-px transition-transform text-center">
          Join meeting
        </a>
        <div class="text-[11px] text-muted text-center tracking-wide"></div>
      @else
        <a href="{{ route('register') }}"
           class="px-5 py-3 rounded-full bg-ink text-paper border border-ink font-semibold text-sm tracking-tight hover:-translate-y-px transition-transform text-center">
          Sign up to join
        </a>
        <div class="text-[11px] text-muted text-center tracking-wide"></div>
      @endauth
    </div>
  </article>

  <article class="grid grid-cols-1 sm:grid-cols-[auto_1fr] lg:grid-cols-[auto_1fr_auto] gap-6 sm:gap-8 items-center py-6 px-1 border-t border-rule">
    <div class="relative w-[156px] h-[212px] rounded overflow-hidden bg-paper-2 cover-shadow flex-shrink-0">
      <div class="absolute inset-0 cover-bg-terracotta"></div>
      <div class="absolute left-0 top-0 bottom-0 w-1.5 bg-terracotta opacity-40"></div>
      <div class="absolute left-3.5 right-3.5 top-[30%] h-[40%] bg-paper/90 flex flex-col justify-center items-center text-center px-1.5">
        
        <div class="font-serif text-sm leading-tight font-semibold text-ink text-balance">Pachinko</div>
        <div class="font-serif text-[10px] italic text-ink-2 mt-1.5">Min Jin Lee</div>
      </div>
    </div>
    <div class="flex flex-col gap-3.5 min-w-0">
      <div class="flex items-center gap-2.5 text-[13px] text-ink-2 flex-wrap">
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6.5" stroke="currentColor" stroke-width="1.2"/><path d="M8 4.5V8L10.5 9.5" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/></svg>
        <span class="font-semibold text-ink">Tue, May 5</span><span class="text-rule">·</span><span>9:30 PM CDT</span>
        <span class="ml-2 text-[11px] px-2 py-[3px] rounded-full bg-forest-soft text-forest-ink font-semibold tracking-wider uppercase">Online</span>
      </div>
      <h3 class="m-0 font-serif text-2xl sm:text-[28px] leading-[1.15] font-semibold tracking-tight text-ink text-balance">First Pages Club — Pachinko</h3>
      <div class="flex items-center gap-2.5 text-sm text-ink-2 flex-wrap">
        <span class="av av-s24 av-terracotta">DP</span>
        <span>Hosted by <span class="text-ink font-semibold">Daniel Park</span></span>
        <span class="text-rule">·</span>
        <span class="font-serif italic">Reading <b class="text-ink font-semibold not-italic">Pachinko</b> by Min Jin Lee</span>
      </div>
      <div class="flex items-center gap-4 sm:gap-6 mt-1 flex-wrap">
        <div class="flex items-center gap-2.5 text-[13px] text-ink-2 font-medium">
          <span class="flex">
            <span class="av av-s26 av-ring av-forest">HB</span>
            <span class="av av-s26 av-ring av-terracotta -ml-2">EC</span>
            <span class="av av-s26 av-ring av-gold -ml-2">NV</span>
          </span>
          <span>8 readers joining</span>
        </div>
        <div class="flex-1 max-w-[160px] h-1 bg-paper-2 rounded-full overflow-hidden min-w-[80px]">
          <span class="block h-full bg-forest" style="width:67%"></span>
        </div>
        <div class="text-xs text-muted tabular-nums">8/12 seats</div>
      </div>
    </div>
    <div class="flex flex-col gap-2.5 items-stretch sm:col-span-2 lg:col-span-1 lg:min-w-[170px]">
      @auth
        <a href="{{ route('meetings.list') }}"
           class="px-5 py-3 rounded-full bg-ink text-paper border border-ink font-semibold text-sm tracking-tight hover:-translate-y-px transition-transform text-center">Join meeting</a>
      @else
        <a href="{{ route('register') }}"
           class="px-5 py-3 rounded-full bg-ink text-paper border border-ink font-semibold text-sm tracking-tight hover:-translate-y-px transition-transform text-center">Sign up to join</a>
      @endauth
      <div class="text-[11px] text-muted text-center tracking-wide"></div>
    </div>
  </article>

  {{-- Tomorrow --}}
  <div class="flex items-baseline gap-3.5 pb-1.5 mt-12">
    <h2 class="m-0 font-serif text-[13px] font-semibold tracking-[0.16em] uppercase text-ink">— Tomorrow</h2>
    <span class="font-mono text-xs text-muted">1 club</span>
  </div>

  <article class="grid grid-cols-1 sm:grid-cols-[auto_1fr] lg:grid-cols-[auto_1fr_auto] gap-6 sm:gap-8 items-center py-6 px-1 border-t border-rule">
    <div class="relative w-[156px] h-[212px] rounded overflow-hidden bg-paper-2 cover-shadow flex-shrink-0">
      <div class="absolute inset-0 cover-bg-gold"></div>
      <div class="absolute left-0 top-0 bottom-0 w-1.5 bg-gold opacity-40"></div>
      <div class="absolute left-3.5 right-3.5 top-[30%] h-[40%] bg-paper/90 flex flex-col justify-center items-center text-center px-1.5">
        
        <div class="font-serif text-sm leading-tight font-semibold text-ink text-balance">Ficciones</div>
        <div class="font-serif text-[10px] italic text-ink-2 mt-1.5">Jorge Luis Borges</div>
      </div>
    </div>
    <div class="flex flex-col gap-3.5 min-w-0">
      <div class="flex items-center gap-2.5 text-[13px] text-ink-2 flex-wrap">
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6.5" stroke="currentColor" stroke-width="1.2"/><path d="M8 4.5V8L10.5 9.5" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/></svg>
        <span class="font-semibold text-ink">Wed, May 6</span><span class="text-rule">·</span><span>8:00 PM CDT</span>
        <span class="ml-2 text-[11px] px-2 py-[3px] rounded-full bg-forest-soft text-forest-ink font-semibold tracking-wider uppercase">Online</span>
      </div>
      <h3 class="m-0 font-serif text-2xl sm:text-[28px] leading-[1.15] font-semibold tracking-tight text-ink text-balance">Short Story Wednesdays: Borges</h3>
      <div class="flex items-center gap-2.5 text-sm text-ink-2 flex-wrap">
        <span class="av av-s24 av-gold">IC</span>
        <span>Hosted by <span class="text-ink font-semibold">Inés Caballero</span></span>
        <span class="text-rule">·</span>
        <span class="font-serif italic">Reading <b class="text-ink font-semibold not-italic">Ficciones</b> by Jorge Luis Borges</span>
      </div>
      <div class="flex items-center gap-4 sm:gap-6 mt-1 flex-wrap">
        <div class="flex items-center gap-2.5 text-[13px] text-ink-2 font-medium">
          <span class="flex">
            <span class="av av-s26 av-ring av-forest">MR</span>
            <span class="av av-s26 av-ring av-terracotta -ml-2">AT</span>
            <span class="av av-s26 av-ring av-gold -ml-2">BL</span>
          </span>
          <span>22 readers joining</span>
        </div>
        <div class="flex-1 max-w-[160px] h-1 bg-paper-2 rounded-full overflow-hidden min-w-[80px]">
          <span class="block h-full bg-forest" style="width:73%"></span>
        </div>
        <div class="text-xs text-muted tabular-nums">22/30 seats</div>
      </div>
    </div>
    <div class="flex flex-col gap-2.5 items-stretch sm:col-span-2 lg:col-span-1 lg:min-w-[170px]">
      @auth
        <a href="{{ route('meetings.list') }}"
           class="px-5 py-3 rounded-full bg-ink text-paper border border-ink font-semibold text-sm tracking-tight hover:-translate-y-px transition-transform text-center">Join meeting</a>
      @else
        <a href="{{ route('register') }}"
           class="px-5 py-3 rounded-full bg-ink text-paper border border-ink font-semibold text-sm tracking-tight hover:-translate-y-px transition-transform text-center">Sign up to join</a>
      @endauth
      <div class="text-[11px] text-muted text-center tracking-wide"></div>
    </div>
  </article>

  {{-- This week --}}
  <div class="flex items-baseline gap-3.5 pb-1.5 mt-12">
    <h2 class="m-0 font-serif text-[13px] font-semibold tracking-[0.16em] uppercase text-ink">— This week</h2>
    <span class="font-mono text-xs text-muted">3 clubs</span>
  </div>

  <article class="grid grid-cols-1 sm:grid-cols-[auto_1fr] lg:grid-cols-[auto_1fr_auto] gap-6 sm:gap-8 items-center py-6 px-1 border-t border-rule">
    <div class="relative w-[156px] h-[212px] rounded overflow-hidden bg-paper-2 cover-shadow flex-shrink-0">
      <div class="absolute inset-0 cover-bg-forest"></div>
      <div class="absolute left-0 top-0 bottom-0 w-1.5 bg-forest opacity-40"></div>
      <div class="absolute left-3.5 right-3.5 top-[30%] h-[40%] bg-paper/90 flex flex-col justify-center items-center text-center px-1.5">
        
        <div class="font-serif text-sm leading-tight font-semibold text-ink text-balance">Mrs. Dalloway</div>
        <div class="font-serif text-[10px] italic text-ink-2 mt-1.5">Virginia Woolf</div>
      </div>
    </div>
    <div class="flex flex-col gap-3.5 min-w-0">
      <div class="flex items-center gap-2.5 text-[13px] text-ink-2 flex-wrap">
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6.5" stroke="currentColor" stroke-width="1.2"/><path d="M8 4.5V8L10.5 9.5" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/></svg>
        <span class="font-semibold text-ink">Thu, May 7</span><span class="text-rule">·</span><span>6:30 PM CDT</span>
        <span class="ml-2 text-[11px] px-2 py-[3px] rounded-full bg-forest-soft text-forest-ink font-semibold tracking-wider uppercase">Online</span>
      </div>
      <h3 class="m-0 font-serif text-2xl sm:text-[28px] leading-[1.15] font-semibold tracking-tight text-ink text-balance">Close Reading: Mrs. Dalloway</h3>
      <div class="flex items-center gap-2.5 text-sm text-ink-2 flex-wrap">
        <span class="av av-s24 av-forest">TB</span>
        <span>Hosted by <span class="text-ink font-semibold">Theo Brennan</span></span>
        <span class="text-rule">·</span>
        <span class="font-serif italic">Reading <b class="text-ink font-semibold not-italic">Mrs. Dalloway</b> by Virginia Woolf</span>
      </div>
      <div class="flex items-center gap-4 sm:gap-6 mt-1 flex-wrap">
        <div class="flex items-center gap-2.5 text-[13px] text-ink-2 font-medium">
          <span class="flex">
            <span class="av av-s26 av-ring av-forest">CR</span>
            <span class="av av-s26 av-ring av-terracotta -ml-2">SW</span>
            <span class="av av-s26 av-ring av-gold -ml-2">LM</span>
          </span>
          <span>11 readers joining</span>
        </div>
        <div class="flex-1 max-w-[160px] h-1 bg-paper-2 rounded-full overflow-hidden min-w-[80px]">
          <span class="block h-full bg-forest" style="width:73%"></span>
        </div>
        <div class="text-xs text-muted tabular-nums">11/15 seats</div>
      </div>
    </div>
    <div class="flex flex-col gap-2.5 items-stretch sm:col-span-2 lg:col-span-1 lg:min-w-[170px]">
      @auth
        <a href="{{ route('meetings.list') }}"
           class="px-5 py-3 rounded-full bg-ink text-paper border border-ink font-semibold text-sm tracking-tight hover:-translate-y-px transition-transform text-center">Join meeting</a>
      @else
        <a href="{{ route('register') }}"
           class="px-5 py-3 rounded-full bg-ink text-paper border border-ink font-semibold text-sm tracking-tight hover:-translate-y-px transition-transform text-center">Sign up to join</a>
      @endauth
      <div class="text-[11px] text-muted text-center tracking-wide"></div>
    </div>
  </article>

  <article class="grid grid-cols-1 sm:grid-cols-[auto_1fr] lg:grid-cols-[auto_1fr_auto] gap-6 sm:gap-8 items-center py-6 px-1 border-t border-rule">
    <div class="relative w-[156px] h-[212px] rounded overflow-hidden bg-paper-2 cover-shadow flex-shrink-0">
      <div class="absolute inset-0 cover-bg-forest"></div>
      <div class="absolute left-0 top-0 bottom-0 w-1.5 bg-forest opacity-40"></div>
      <div class="absolute left-3.5 right-3.5 top-[30%] h-[40%] bg-paper/90 flex flex-col justify-center items-center text-center px-1.5">
        
        <div class="font-serif text-sm leading-tight font-semibold text-ink text-balance">Annihilation</div>
        <div class="font-serif text-[10px] italic text-ink-2 mt-1.5">Jeff VanderMeer</div>
      </div>
    </div>
    <div class="flex flex-col gap-3.5 min-w-0">
      <div class="flex items-center gap-2.5 text-[13px] text-ink-2 flex-wrap">
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6.5" stroke="currentColor" stroke-width="1.2"/><path d="M8 4.5V8L10.5 9.5" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/></svg>
        <span class="font-semibold text-ink">Fri, May 8</span><span class="text-rule">·</span><span>8:30 PM CDT</span>
        <span class="ml-2 text-[11px] px-2 py-[3px] rounded-full bg-forest-soft text-forest-ink font-semibold tracking-wider uppercase">Online</span>
      </div>
      <h3 class="m-0 font-serif text-2xl sm:text-[28px] leading-[1.15] font-semibold tracking-tight text-ink text-balance">Sci-fi Salon — Annihilation</h3>
      <div class="flex items-center gap-2.5 text-sm text-ink-2 flex-wrap">
        <span class="av av-s24 av-forest">PR</span>
        <span>Hosted by <span class="text-ink font-semibold">Priya Ramaswamy</span></span>
        <span class="text-rule">·</span>
        <span class="font-serif italic">Reading <b class="text-ink font-semibold not-italic">Annihilation</b> by Jeff VanderMeer</span>
      </div>
      <div class="flex items-center gap-4 sm:gap-6 mt-1 flex-wrap">
        <div class="flex items-center gap-2.5 text-[13px] text-ink-2 font-medium">
          <span class="flex">
            <span class="av av-s26 av-ring av-forest">VK</span>
            <span class="av av-s26 av-ring av-terracotta -ml-2">JT</span>
            <span class="av av-s26 av-ring av-gold -ml-2">DM</span>
          </span>
          <span>19 readers joining</span>
        </div>
        <div class="flex-1 max-w-[160px] h-1 bg-paper-2 rounded-full overflow-hidden min-w-[80px]">
          <span class="block h-full bg-forest" style="width:76%"></span>
        </div>
        <div class="text-xs text-muted tabular-nums">19/25 seats</div>
      </div>
    </div>
    <div class="flex flex-col gap-2.5 items-stretch sm:col-span-2 lg:col-span-1 lg:min-w-[170px]">
      @auth
        <a href="{{ route('meetings.list') }}"
           class="px-5 py-3 rounded-full bg-ink text-paper border border-ink font-semibold text-sm tracking-tight hover:-translate-y-px transition-transform text-center">Join meeting</a>
      @else
        <a href="{{ route('register') }}"
           class="px-5 py-3 rounded-full bg-ink text-paper border border-ink font-semibold text-sm tracking-tight hover:-translate-y-px transition-transform text-center">Sign up to join</a>
      @endauth
      <div class="text-[11px] text-muted text-center tracking-wide"></div>
    </div>
  </article>

  <article class="grid grid-cols-1 sm:grid-cols-[auto_1fr] lg:grid-cols-[auto_1fr_auto] gap-6 sm:gap-8 items-center py-6 px-1 border-t border-rule">
    <div class="relative w-[156px] h-[212px] rounded overflow-hidden bg-paper-2 cover-shadow flex-shrink-0">
      <div class="absolute inset-0 cover-bg-terracotta"></div>
      <div class="absolute left-0 top-0 bottom-0 w-1.5 bg-terracotta opacity-40"></div>
      <div class="absolute left-3.5 right-3.5 top-[30%] h-[40%] bg-paper/90 flex flex-col justify-center items-center text-center px-1.5">
        
        <div class="font-serif text-sm leading-tight font-semibold text-ink text-balance">The Hurting Kind</div>
        <div class="font-serif text-[10px] italic text-ink-2 mt-1.5">Ada Limón</div>
      </div>
    </div>
    <div class="flex flex-col gap-3.5 min-w-0">
      <div class="flex items-center gap-2.5 text-[13px] text-ink-2 flex-wrap">
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6.5" stroke="currentColor" stroke-width="1.2"/><path d="M8 4.5V8L10.5 9.5" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/></svg>
        <span class="font-semibold text-ink">Sun, May 10</span><span class="text-rule">·</span><span>4:00 PM CDT</span>
        <span class="ml-2 text-[11px] px-2 py-[3px] rounded-full bg-forest-soft text-forest-ink font-semibold tracking-wider uppercase">Online</span>
      </div>
      <h3 class="m-0 font-serif text-2xl sm:text-[28px] leading-[1.15] font-semibold tracking-tight text-ink text-balance">Sunday Poetry Hour: Ada Limón</h3>
      <div class="flex items-center gap-2.5 text-sm text-ink-2 flex-wrap">
        <span class="av av-s24 av-terracotta">JM</span>
        <span>Hosted by <span class="text-ink font-semibold">Joana Mensah</span></span>
        <span class="text-rule">·</span>
        <span class="font-serif italic">Reading <b class="text-ink font-semibold not-italic">The Hurting Kind</b> by Ada Limón</span>
      </div>
      <div class="flex items-center gap-4 sm:gap-6 mt-1 flex-wrap">
        <div class="flex items-center gap-2.5 text-[13px] text-ink-2 font-medium">
          <span class="flex">
            <span class="av av-s26 av-ring av-forest">EM</span>
            <span class="av av-s26 av-ring av-terracotta -ml-2">HW</span>
          </span>
          <span>7 readers joining</span>
        </div>
        <div class="flex-1 max-w-[160px] h-1 bg-paper-2 rounded-full overflow-hidden min-w-[80px]">
          <span class="block h-full bg-forest" style="width:58%"></span>
        </div>
        <div class="text-xs text-muted tabular-nums">7/12 seats</div>
      </div>
    </div>
    <div class="flex flex-col gap-2.5 items-stretch sm:col-span-2 lg:col-span-1 lg:min-w-[170px]">
      @auth
        <a href="{{ route('meetings.list') }}"
           class="px-5 py-3 rounded-full bg-ink text-paper border border-ink font-semibold text-sm tracking-tight hover:-translate-y-px transition-transform text-center">Join meeting</a>
      @else
        <a href="{{ route('register') }}"
           class="px-5 py-3 rounded-full bg-ink text-paper border border-ink font-semibold text-sm tracking-tight hover:-translate-y-px transition-transform text-center">Sign up to join</a>
      @endauth
      <div class="text-[11px] text-muted text-center tracking-wide"></div>
    </div>
  </article>

  {{-- Next week --}}
  <div class="flex items-baseline gap-3.5 pb-1.5 mt-12">
    <h2 class="m-0 font-serif text-[13px] font-semibold tracking-[0.16em] uppercase text-ink">— Next week</h2>
    <span class="font-mono text-xs text-muted">2 clubs</span>
  </div>

  <article class="grid grid-cols-1 sm:grid-cols-[auto_1fr] lg:grid-cols-[auto_1fr_auto] gap-6 sm:gap-8 items-center py-6 px-1 border-t border-rule">
    <div class="relative w-[156px] h-[212px] rounded overflow-hidden bg-paper-2 cover-shadow flex-shrink-0">
      <div class="absolute inset-0 cover-bg-forest"></div>
      <div class="absolute left-0 top-0 bottom-0 w-1.5 bg-forest opacity-40"></div>
      <div class="absolute left-3.5 right-3.5 top-[30%] h-[40%] bg-paper/90 flex flex-col justify-center items-center text-center px-1.5">
        
        <div class="font-serif text-sm leading-tight font-semibold text-ink text-balance">How to Hide an Empire</div>
        <div class="font-serif text-[10px] italic text-ink-2 mt-1.5">Daniel Immerwahr</div>
      </div>
    </div>
    <div class="flex flex-col gap-3.5 min-w-0">
      <div class="flex items-center gap-2.5 text-[13px] text-ink-2 flex-wrap">
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6.5" stroke="currentColor" stroke-width="1.2"/><path d="M8 4.5V8L10.5 9.5" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/></svg>
        <span class="font-semibold text-ink">Tue, May 12</span><span class="text-rule">·</span><span>7:00 PM CDT</span>
        <span class="ml-2 text-[11px] px-2 py-[3px] rounded-full bg-forest-soft text-forest-ink font-semibold tracking-wider uppercase">Online</span>
      </div>
      <h3 class="m-0 font-serif text-2xl sm:text-[28px] leading-[1.15] font-semibold tracking-tight text-ink text-balance">Nonfiction Night — How to Hide an Empire</h3>
      <div class="flex items-center gap-2.5 text-sm text-ink-2 flex-wrap">
        <span class="av av-s24 av-forest">OA</span>
        <span>Hosted by <span class="text-ink font-semibold">Olu Adebayo</span></span>
        <span class="text-rule">·</span>
        <span class="font-serif italic">Reading <b class="text-ink font-semibold not-italic">How to Hide an Empire</b> by Daniel Immerwahr</span>
      </div>
      <div class="flex items-center gap-4 sm:gap-6 mt-1 flex-wrap">
        <div class="flex items-center gap-2.5 text-[13px] text-ink-2 font-medium">
          <span class="flex">
            <span class="av av-s26 av-ring av-forest">QC</span>
            <span class="av av-s26 av-ring av-terracotta -ml-2">RP</span>
          </span>
          <span>6 readers joining</span>
        </div>
        <div class="flex-1 max-w-[160px] h-1 bg-paper-2 rounded-full overflow-hidden min-w-[80px]">
          <span class="block h-full bg-forest" style="width:30%"></span>
        </div>
        <div class="text-xs text-muted tabular-nums">6/20 seats</div>
      </div>
    </div>
    <div class="flex flex-col gap-2.5 items-stretch sm:col-span-2 lg:col-span-1 lg:min-w-[170px]">
      @auth
        <a href="{{ route('meetings.list') }}"
           class="px-5 py-3 rounded-full bg-ink text-paper border border-ink font-semibold text-sm tracking-tight hover:-translate-y-px transition-transform text-center">Join meeting</a>
      @else
        <a href="{{ route('register') }}"
           class="px-5 py-3 rounded-full bg-ink text-paper border border-ink font-semibold text-sm tracking-tight hover:-translate-y-px transition-transform text-center">Sign up to join</a>
      @endauth
      <div class="text-[11px] text-muted text-center tracking-wide"></div>
    </div>
  </article>

  <article class="grid grid-cols-1 sm:grid-cols-[auto_1fr] lg:grid-cols-[auto_1fr_auto] gap-6 sm:gap-8 items-center py-6 px-1 border-t border-rule">
    <div class="relative w-[156px] h-[212px] rounded overflow-hidden bg-paper-2 cover-shadow flex-shrink-0">
      <div class="absolute inset-0 cover-bg-gold"></div>
      <div class="absolute left-0 top-0 bottom-0 w-1.5 bg-gold opacity-40"></div>
      <div class="absolute left-3.5 right-3.5 top-[30%] h-[40%] bg-paper/90 flex flex-col justify-center items-center text-center px-1.5">
        
        <div class="font-serif text-sm leading-tight font-semibold text-ink text-balance">Flights</div>
        <div class="font-serif text-[10px] italic text-ink-2 mt-1.5">Olga Tokarczuk</div>
      </div>
    </div>
    <div class="flex flex-col gap-3.5 min-w-0">
      <div class="flex items-center gap-2.5 text-[13px] text-ink-2 flex-wrap">
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6.5" stroke="currentColor" stroke-width="1.2"/><path d="M8 4.5V8L10.5 9.5" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/></svg>
        <span class="font-semibold text-ink">Thu, May 14</span><span class="text-rule">·</span><span>8:00 PM CDT</span>
        <span class="ml-2 text-[11px] px-2 py-[3px] rounded-full bg-forest-soft text-forest-ink font-semibold tracking-wider uppercase">Online</span>
      </div>
      <h3 class="m-0 font-serif text-2xl sm:text-[28px] leading-[1.15] font-semibold tracking-tight text-ink text-balance">Translated Fiction: Tokarczuk</h3>
      <div class="flex items-center gap-2.5 text-sm text-ink-2 flex-wrap">
        <span class="av av-s24 av-gold">KN</span>
        <span>Hosted by <span class="text-ink font-semibold">Karolina Nowak</span></span>
        <span class="text-rule">·</span>
        <span class="font-serif italic">Reading <b class="text-ink font-semibold not-italic">Flights</b> by Olga Tokarczuk</span>
      </div>
      <div class="flex items-center gap-4 sm:gap-6 mt-1 flex-wrap">
        <div class="flex items-center gap-2.5 text-[13px] text-ink-2 font-medium">
          <span class="flex">
            <span class="av av-s26 av-ring av-forest">ZB</span>
            <span class="av av-s26 av-ring av-terracotta -ml-2">FH</span>
            <span class="av av-s26 av-ring av-gold -ml-2">DN</span>
          </span>
          <span>13 readers joining</span>
        </div>
        <div class="flex-1 max-w-[160px] h-1 bg-paper-2 rounded-full overflow-hidden min-w-[80px]">
          <span class="block h-full bg-forest" style="width:72%"></span>
        </div>
        <div class="text-xs text-muted tabular-nums">13/18 seats</div>
      </div>
    </div>
    <div class="flex flex-col gap-2.5 items-stretch sm:col-span-2 lg:col-span-1 lg:min-w-[170px]">
      @auth
        <a href="{{ route('meetings.list') }}"
           class="px-5 py-3 rounded-full bg-ink text-paper border border-ink font-semibold text-sm tracking-tight hover:-translate-y-px transition-transform text-center">Join meeting</a>
      @else
        <a href="{{ route('register') }}"
           class="px-5 py-3 rounded-full bg-ink text-paper border border-ink font-semibold text-sm tracking-tight hover:-translate-y-px transition-transform text-center">Sign up to join</a>
      @endauth
      <div class="text-[11px] text-muted text-center tracking-wide"></div>
    </div>
  </article>

  {{-- Footer CTA --}}
  <section class="mt-20 px-8 sm:px-12 py-12 sm:py-[72px] border border-rule rounded-[18px] bg-paper-2 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-8">
    <div class="max-w-[560px]">
      <h2 class="m-0 font-serif text-3xl sm:text-[42px] leading-[1.05] font-medium tracking-tight text-ink">A quieter way to <em class="italic text-terracotta font-medium">read together</em>.</h2>
      <p class="font-serif text-base sm:text-lg text-ink-2 mt-3.5 mb-0 leading-normal">Reserve your first seat in under a minute. No subscriptions, no algorithm.</p>
    </div>
    @auth
      <!-- <a href="{{ route('books.list') }}"
         class="px-7 py-4 rounded-full bg-ink text-paper font-semibold text-[15px] hover:-translate-y-px transition-transform self-start sm:self-auto flex-shrink-0">
        Browse books
      </a> -->
    @else
      <a href="{{ route('register') }}"
         class="px-7 py-4 rounded-full bg-ink text-paper font-semibold text-[15px] hover:-translate-y-px transition-transform self-start sm:self-auto flex-shrink-0">
        Create a free account
      </a>
    @endauth
  </section>

  <footer class="mt-16 py-10 border-t border-rule flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 text-xs text-muted">
    <a class="flex items-center gap-2.5" href="{{ url('/') }}">
      <span class="w-6 h-6 rounded-md bg-terracotta flex items-center justify-center" aria-hidden="true">
        <svg width="18" height="18" viewBox="0 0 32 32">
          <path d="M6 9 C 10 9, 14 10, 16 12 C 18 10, 22 9, 26 9 L 26 23 C 22 23, 18 24, 16 26 C 14 24, 10 23, 6 23 Z"
                fill="none" stroke="#F7F2E9" stroke-width="1.6" stroke-linejoin="round"/>
          <path d="M16 12 L 16 26" stroke="#F7F2E9" stroke-width="1.2"/>
        </svg>
      </span>
      <span class="font-serif text-lg font-semibold italic tracking-tight text-ink">novelglot</span>
    </a>
    <div class="font-mono tracking-wider">slow reading, together · est. 2024</div>
  </footer>

</main>

</body>
</html>