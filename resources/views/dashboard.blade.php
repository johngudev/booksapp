@extends('layouts.novelglot')

@section('title', 'Dashboard — novelglot')

@section('content')
<main class="max-w-page mx-auto px-5 sm:px-8 pb-20">

  {{-- ============================================================ --}}
  {{-- HERO                                                           --}}
  {{-- ============================================================ --}}
  <section class="pt-12 sm:pt-16 lg:pt-[72px] pb-8">
    <div class="font-mono text-[11px] tracking-[0.18em] uppercase text-terracotta mb-4">— your dashboard</div>
    <h1 class="font-serif text-[32px] sm:text-5xl lg:text-[60px] font-medium leading-[0.98] tracking-[-0.03em] text-ink text-balance m-0">
      Welcome back, <em class="italic text-terracotta font-medium">{{ Auth::user()->name }}</em>
    </h1>
    @php
      $attendingCount = Auth::user()->attendingMeetings()->count();
      $hostingCount   = Auth::user()->hostedMeetings()->count();
    @endphp
    <p class="font-serif text-lg sm:text-[21px] leading-snug text-ink-2 mt-6 max-w-[520px]">
      You're attending <strong class="text-ink font-semibold">{{ $attendingCount }}</strong>
      {{ Str::plural('club', $attendingCount) }}
      and hosting <strong class="text-ink font-semibold">{{ $hostingCount }}</strong>.
    </p>
  </section>


  {{-- ============================================================ --}}
  {{-- UPCOMING MEETINGS                                              --}}
  {{-- ============================================================ --}}

    @foreach ($meetings as $meeting)
      @php
        $variant      = ['forest','terracotta','gold'][$loop->index % 3];
        $hostInitials = collect(explode(' ', $meeting->host->name))->take(2)->map(fn($p) => strtoupper(substr($p, 0, 1)))->join('');
        $dt           = \Carbon\Carbon::parse($meeting->date_time);
      @endphp

      <article class="grid grid-cols-1 sm:grid-cols-[auto_1fr] lg:grid-cols-[auto_1fr_auto] gap-6 sm:gap-8 items-center py-6 px-1 border-t border-rule">

        {{-- Cover --}}
        <div class="relative w-[156px] h-[212px] rounded overflow-hidden bg-paper-2 cover-shadow flex-shrink-0">
          <div class="absolute inset-0 cover-bg-{{ $variant }}"></div>
          <div class="absolute left-0 top-0 bottom-0 w-1.5 bg-{{ $variant }} opacity-40"></div>
          <div class="absolute left-3.5 right-3.5 top-[30%] h-[40%] bg-paper/90 flex flex-col justify-center items-center text-center px-1.5">
            <!-- <div class="font-mono text-[9px] tracking-[0.14em] uppercase text-muted mb-2">book cover</div> -->
            <div class="font-serif text-sm leading-tight font-semibold text-ink text-balance">{{ $meeting->book->title }}</div>
            <div class="font-serif text-[10px] italic text-ink-2 mt-1.5">{{ $meeting->book->author }}</div>
          </div>
        </div>

        {{-- Meta --}}
        <div class="flex flex-col gap-3.5 min-w-0">
          <div class="flex items-center gap-2.5 text-[13px] text-ink-2 flex-wrap">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6.5" stroke="currentColor" stroke-width="1.2"/><path d="M8 4.5V8L10.5 9.5" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/></svg>
            <span class="font-semibold text-ink">{{ $dt->format('D, M j') }}</span>
            <span class="text-rule">·</span>
            <span>{{ $dt->format('g:i A T') }}</span>
            <span class="ml-2 text-[11px] px-2 py-[3px] rounded-full bg-forest-soft text-forest-ink font-semibold tracking-wider uppercase">Online</span>
          </div>

          <h3 class="m-0 font-serif text-2xl sm:text-[28px] leading-[1.15] font-semibold tracking-tight text-ink text-balance">
            {{ $meeting->description }}
          </h3>

          <div class="flex items-center gap-2.5 text-sm text-ink-2 flex-wrap">
            <span class="av av-s24 av-{{ $variant }}">{{ $hostInitials }}</span>
            <span>Hosted by <span class="text-ink font-semibold">{{ $meeting->host->name }}</span></span>
            <span class="text-rule">·</span>
            <span class="font-serif italic">Reading <b class="text-ink font-semibold not-italic">{{ $meeting->book->title }}</b> by {{ $meeting->book->author }}</span>
          </div>

          <div class="flex items-center gap-4 sm:gap-6 mt-1 flex-wrap">
            <div class="flex items-center gap-2.5 text-[13px] text-ink-2 font-medium">
              <span class="flex">
                @foreach ($meeting->attendees->take(3) as $i => $attendee)
                  @php
                    $aVariant  = ['forest','terracotta','gold'][$i % 3];
                    $aInitials = collect(explode(' ', $attendee->name))->take(2)->map(fn($p) => strtoupper(substr($p, 0, 1)))->join('');
                  @endphp
                  <span class="av av-s26 av-ring av-{{ $aVariant }} {{ $i > 0 ? '-ml-2' : '' }}">{{ $aInitials }}</span>
                @endforeach
              </span>
              <span>{{ $meeting->attendees->count() }} {{ Str::plural('reader', $meeting->attendees->count()) }} joining</span>
            </div>
          </div>
        </div>

        {{-- CTA --}}
        <div class="flex flex-col gap-2.5 items-stretch sm:col-span-2 lg:col-span-1 lg:min-w-[170px]">
          <a href="{{ $meeting->zoom_link }}" target="_blank" rel="noopener"
             class="px-5 py-3 rounded-full bg-ink text-paper border border-ink font-semibold text-sm tracking-tight hover:-translate-y-px transition-transform text-center">
            Join meeting
          </a>
          <div class="text-[11px] text-muted text-center tracking-wide"></div>
        </div>

      </article>
    @endforeach


</main>
@endsection
