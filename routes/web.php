<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\BookController;
use App\Http\Controllers\MeetingController;
use App\Http\Controllers\SessionController;


/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::get('/dashboard', function () {
    return view('dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});



Route::get('/books', [BookController::class, 'list'])->name('books.list')
    ->middleware(['auth', 'verified']);

Route::get('/books-example', [BookController::class, 'example'])->name('books.example')
    ->middleware(['auth', 'verified']);


Route::get('/meetings', [MeetingController::class, 'list'])->name('meetings.list')
    ->middleware(['auth', 'verified']);

Route::get('/meetings/create', [MeetingController::class, 'create'])->name('meetings.create')
    ->middleware(['auth', 'verified']);

Route::middleware('auth')->get('/api/session/user', [SessionController::class, 'show']);

Route::middleware('auth')->get('/api/books/like/{book}',[BookController::class, 'linkedUsers']);

Route::middleware('auth')->get('/api/session/books', [BookController::class, 'currentUserLinkedBooks'])->name('session.books.index');
Route::middleware('auth')->get('/api/session/books/{book}', [BookController::class, 'currentUserIfLinked']);
Route::middleware('auth')->post('/api/session/books/{book}',[BookController::class, 'linkToUser']);
Route::middleware('auth')->delete('/api/session/books/{book}',[BookController::class, 'unlinkFromUser']);

Route::middleware('auth')->get('/api/meetings/join',[MeetingController::class, 'meetings.list'])->name('session.meetings.join');
Route::middleware('auth')->get('/api/meetings/join/{meeting}',[MeetingController::class, 'linkedUsers']);
Route::middleware('auth')->post('/api/session/meetings/join/{meeting}',[MeetingController::class, 'linkToUser']);
Route::middleware('auth')->delete('/api/session/meetings/join/{meeting}',[MeetingController::class, 'unlinkFromUser']);

Route::middleware('auth')->post('/api/session/meetings/host',[MeetingController::class, 'storeFromSession'])->name('session.meetings.host');

Route::get('/easy', function() { return view('easy-form');});

require __DIR__.'/auth.php';
