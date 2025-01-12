<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 leading-tight">
            {{ __('Dashboard') }}
        </h2>
    </x-slot>

    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                <div class="p-6 text-gray-900">
                    <form action="/api/books" method="POST" class="space-y-6">
                        <!-- CSRF Token -->
                        <input type="hidden" name="_token" value="{{ csrf_token() }}">

                        <!-- Title Field -->
                        <div>
                            <label for="title" class="block text-sm font-medium text-gray-700">Title</label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                placeholder="Enter the book title"
                                required
                            />
                        </div>

                        <!-- Author Field -->
                        <div>
                            <label for="author" class="block text-sm font-medium text-gray-700">Author</label>
                            <input
                                type="text"
                                id="author"
                                name="author"
                                class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                placeholder="Enter the author's name"
                                required
                            />
                        </div>

                        <!-- Image URL Field -->
                        <div>
                            <label for="image_url" class="block text-sm font-medium text-gray-700">Image URL (Optional)</label>
                            <input
                                type="url"
                                id="image_url"
                                name="image_url"
                                class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                placeholder="Enter the image URL"
                            />
                        </div>

                        <!-- Submit Button -->
                        <div>
                            <button
                                type="submit"
                                class="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            >
                                Save Book
                            </button>
                        </div>
                    </form>
                </div>
            </div>


            <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg mt-6">
                <div class="p-6 text-gray-900">
                    <form action="/api/books/link/1" method="POST" class="space-y-6 mt-6">
                        <!-- CSRF Token -->
                        <input type="hidden" name="_token" value="{{ csrf_token() }}">



                        <!-- Submit Button -->
                        <div>
                            <button
                                type="submit"
                                class="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            >
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg mt-6">
        <h2 class="text-2xl font-bold text-center mb-4">Submit Book Details</h2>

        <form action="/api/session/books/1" method="POST" class="space-y-4">
            @csrf <!-- Add CSRF token if needed in your Laravel backend -->
            

            <!-- Submit Button -->
            <div class="text-center">
                <button type="submit" class="px-4 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                    Submit
                </button>
            </div>
        </form>
    </div>

        </div>
    </div>
</x-app-layout>
