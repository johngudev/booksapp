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

<div class="pb-12" id="react-root" data-api-books-index="{{ route('books.index') }}" data-api-session-books="{{ route('session.books.index') }}" data-books="{{$books}}"></div>

    <!-- <form class="max-w-md mx-auto mt-12">   
        <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
        <div class="relative">
            <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                </svg>
            </div>
            <input type="search" id="default-search" class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500" placeholder="Search for a book..." required />
            <button type="submit" class="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
        </div>
    </form>    

    <div class="py-12 max-w-6xl mx-auto px-6 lg:px-8 flex md:flex-row flex-column flex-col gap-3 flex-wrap">
        @foreach($books as $book)
        <div class="md:w-1/6 bg-white rounded-lg shadow-lg overflow-hidden">
            <!-- Image
            <img src="{{ $book->image_url }}" alt="Book cover" class="w-full h-64 md:h-32 object-cover">

            <!-- Book Details
            <div class="py-2 px-4">
                <h2 class="text-xl font-semibold text-gray-800">{{ $book->title }}</h2>
                <p class="text-gray-600 mt-2">{{ $book->author }}</p>
            </div>
        </div>
        
        @endforeach
    </div> -->
</x-app-layout>


