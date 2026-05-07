<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>@yield('title', 'novelglot — online book clubs')</title>

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

    {{-- Laravel asset pipeline --}}
    @viteReactRefresh
    @vite(['resources/css/app.css', 'resources/js/app.jsx', 'resources/js/app.js'])

    <style>
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

{{-- ============================================================ --}}
{{-- HEADER                                                         --}}
{{-- ============================================================ --}}
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
      @auth
        <a href="{{ route('dashboard') }}"
           class="hidden md:inline-block px-3.5 py-2 text-sm {{ request()->routeIs('dashboard') ? 'text-ink font-semibold' : 'text-ink-2 hover:text-ink' }} transition-colors">
          Dashboard
        </a>
        <a href="{{ route('books.list') }}"
           class="hidden md:inline-block px-3.5 py-2 text-sm {{ request()->routeIs('books.list') ? 'text-ink font-semibold' : 'text-ink-2 hover:text-ink' }} transition-colors">
          Books
        </a>
        <a href="{{ route('meetings.list') }}"
           class="hidden md:inline-block px-3.5 py-2 text-sm {{ request()->routeIs('meetings.list') ? 'text-ink font-semibold' : 'text-ink-2 hover:text-ink' }} transition-colors">
          Meetings
        </a>
        <span class="hidden md:inline-block w-px h-5 bg-rule mx-3"></span>

        {{-- User dropdown (Alpine-powered, mirrors layouts/navigation.blade.php) --}}
        <div x-data="{ open: false }" class="relative">
          <button @click="open = !open"
                  class="flex items-center gap-2 px-3 sm:px-4 py-2 text-sm font-semibold text-ink rounded-full hover:bg-paper-2 transition-colors">
            <span>{{ Auth::user()->name }}</span>
            <svg class="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"/>
            </svg>
          </button>
          <div x-show="open"
               @click.outside="open = false"
               x-transition
               class="absolute right-0 mt-2 w-48 bg-paper border border-rule rounded-xl shadow-lg overflow-hidden z-50"
               style="display: none;">
            <a href="{{ route('profile.edit') }}"
               class="block px-4 py-2.5 text-sm text-ink-2 hover:bg-paper-2 hover:text-ink transition-colors">Profile</a>
            <form method="POST" action="{{ route('logout') }}">
              @csrf
              <button type="submit"
                      class="block w-full text-left px-4 py-2.5 text-sm text-ink-2 hover:bg-paper-2 hover:text-ink transition-colors">
                Log out
              </button>
            </form>
          </div>
        </div>
      @else
        <a class="hidden md:inline-block px-3.5 py-2 text-sm text-ink-2 hover:text-ink transition-colors" href="#listing">Browse clubs</a>
        <span class="hidden md:inline-block w-px h-5 bg-rule mx-3"></span>
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

{{-- ============================================================ --}}
{{-- PAGE CONTENT                                                   --}}
{{-- ============================================================ --}}
@yield('content')

{{-- ============================================================ --}}
{{-- FOOTER                                                         --}}
{{-- ============================================================ --}}
<footer class="max-w-page mx-auto px-5 sm:px-8">
  <div class="mt-16 py-10 border-t border-rule flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 text-xs text-muted">
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
  </div>
</footer>

</body>
</html>
