<?php

namespace App\Http\Controllers;

use App\Models\Book;
use Illuminate\Http\Request;

class BookController extends Controller
// {
//     /**
//      * Display a listing of the resource.
//      *
//      * @return \Illuminate\Http\Response
//      */
//     public function index()
//     {
//         //
//     }

//     /**
//      * Show the form for creating a new resource.
//      *
//      * @return \Illuminate\Http\Response
//      */
//     public function create()
//     {
//         //
//     }

//     /**
//      * Store a newly created resource in storage.
//      *
//      * @param  \Illuminate\Http\Request  $request
//      * @return \Illuminate\Http\Response
//      */
//     public function store(Request $request)
//     {
//         //
//     }

//     /**
//      * Display the specified resource.
//      *
//      * @param  \App\Models\Book  $book
//      * @return \Illuminate\Http\Response
//      */
//     public function show(Book $book)
//     {
//         //
//     }

//     /**
//      * Show the form for editing the specified resource.
//      *
//      * @param  \App\Models\Book  $book
//      * @return \Illuminate\Http\Response
//      */
//     public function edit(Book $book)
//     {
//         //
//     }

//     /**
//      * Update the specified resource in storage.
//      *
//      * @param  \Illuminate\Http\Request  $request
//      * @param  \App\Models\Book  $book
//      * @return \Illuminate\Http\Response
//      */
//     public function update(Request $request, Book $book)
//     {
//         //
//     }

//     /**
//      * Remove the specified resource from storage.
//      *
//      * @param  \App\Models\Book  $book
//      * @return \Illuminate\Http\Response
//      */
//     public function destroy(Book $book)
//     {
//         //
//     }
// }
{

    public function index()
    {
        return Book::all();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'author' => 'required|string|max:255',
            'image_url' => 'nullable'
        ]);

        return Book::create($validated);
    }

    public function show(Book $book)
    {
        return $book;
        // return $book->load('meetings', 'users');
    }

    public function update(Request $request, Book $book)
    {
        $validated = $request->validate([
            'title' => 'sometimes|required|string|max:255',
            'author' => 'sometimes|required|string|max:255',
            'image_url' => 'required'
        ]);

        $book->update($validated);

        return $book;
    }

    public function destroy(Book $book)
    {
        $book->delete();

        return response()->noContent();
    }

    public function list()
    {
        $books = Book::all(); // Fetch all books
        return view('books', compact('books')); // Return the web view
    }

    public function example()
    {
        $books = Book::all(); // Fetch all books
        return view('books-example', compact('books')); // Return the web view
    }

    public function linkToUser(Book $book)
    {
        $user = request()->user();

        $user->books()->syncWithoutDetaching([$book->id]);

        return response()->json(['message' => 'Book attached to user successfully']);

    }

    public function unlinkFromUser(Book $book)
    {
        $user = request()->user();

        $user->books()->detach($book->id);

        return response()->json(['message' => 'Book detached from user successfully']);

    }

    public function linkedUsers(Book $book)
    {
        return $book->users;
    }

    public function currentUserLinkedBooks()
    {
        $user = request()->user();

        return $user->books;

    }

}