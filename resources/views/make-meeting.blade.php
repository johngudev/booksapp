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
                    <h2>Make a Meeting</h2>
                    <form action="{{ route('session.meetings.host.store') }}" method="POST" class="space-y-6">
                        <!-- CSRF Token -->
                        <input type="hidden" name="_token" value="{{ csrf_token() }}">

                        <!-- Book Dropdown -->
                        <div>
                            <label for="book_id" class="block text-sm font-medium text-gray-700">Book</label>
                            <select
                                id="book_id"
                                name="book_id"
                                class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                required
                            >
                                <option value="" disabled selected>Select a book</option>
                                <!-- Example options, replace with dynamic options -->
                                <option value="1">Book 1</option>
                                <option value="2">Book 2</option>
                                <option value="3">Book 3</option>
                            </select>
                        </div>

                        <!-- Zoom Link Field -->
                        <div>
                            <label for="zoom_link" class="block text-sm font-medium text-gray-700">Zoom Link</label>
                            <input
                                type="url"
                                id="zoom_link"
                                name="zoom_link"
                                class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                placeholder="Enter the Zoom link"
                                required
                            />
                        </div>

                        <!-- Date and Time Field -->
                        <div>
                            <label for="date_time" class="block text-sm font-medium text-gray-700">Date and Time</label>
                            <input
                                type="datetime-local"
                                id="date_time"
                                name="date_time"
                                class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                required
                            />
                        </div>

                        <!-- Description Field -->
                        <div>
                            <label for="description" class="block text-sm font-medium text-gray-700">Description</label>
                            <textarea
                                id="description"
                                name="description"
                                class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                rows="4"
                                placeholder="Enter a description"
                                required
                            ></textarea>
                        </div>

                        <!-- Submit Button -->
                        <div>
                            <button
                                type="submit"
                                class="w-full inline-flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Submit
                            </button>
                        </div>
                    </form>

                </div>
            </div>
        </div>
    </div>

</x-app-layout>
