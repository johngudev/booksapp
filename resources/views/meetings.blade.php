<x-app-layout>
<style>
    .bookcard-width {
        width: calc(50.0% - 0.375rem); 
    }

    @media (min-width: 640px) {
        .bookcard-width {
            width: calc(33.33% - 0.5rem); 
        }
    }

    @media (min-width: 768px) {
        .bookcard-width {
            width: calc(20% - 0.6rem); 
        }
    }

    @media (min-width: 1024px) {
        .bookcard-width {
            width: calc(16.66% - 0.625rem); 
        }
    }


</style>

<div class="pb-12" id="meetings-root" data-api-meetings-index="{{ route('meetings.index') }}" data-api-session-meetings-host="{{ route('session.meetings.host') }}" data-api-session-meetings-join="{{ route('session.meetings.join') }}" data-api-books-index="{{ route('books.index') }}" data-api-session-books="{{ route('session.books.index') }}"></div>

</x-app-layout>


