<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

use Illuminate\Support\Facades\DB;


class BooksTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::statement('SET FOREIGN_KEY_CHECKS=0;'); // Disable foreign key checks
        DB::table('books')->truncate();           // Truncate the table
        DB::statement('SET FOREIGN_KEY_CHECKS=1;'); // Re-enable foreign key checks
        
        for($i = 0; $i < 1; $i++) {
            DB::table('books')->insert([
                [
                    'title' => 'To Kill a Mockingbird',
                    'author' => 'Harper Lee',
                    'image_url' => 'https://covers.openlibrary.org/b/id/12907439-L.jpg',
                    'created_at' => now(),
                    'updated_at' => now(),
                ],
                [
                    'title' => '1984',
                    'author' => 'George Orwell',
                    'image_url' => 'https://images-na.ssl-images-amazon.com/images/P/0451524934.01._SX360_SCLZZZZZZZ_.jpg',
                    'created_at' => now(),
                    'updated_at' => now(),
                ],
                [
                    'title' => 'Pride and Prejudice',
                    'author' => 'Jane Austen',
                    'image_url' => 'https://images-na.ssl-images-amazon.com/images/P/0553213105.01._SX360_SCLZZZZZZZ_.jpg',
                    'created_at' => now(),
                    'updated_at' => now(),
                ],
                [
                    'title' => 'The Great Gatsby',
                    'author' => 'F. Scott Fitzgerald',
                    'image_url' => 'https://images-na.ssl-images-amazon.com/images/P/0743273567.01._SX360_SCLZZZZZZZ_.jpg',
                    'created_at' => now(),
                    'updated_at' => now(),
                ],
                [
                    'title' => 'The Sun Also Rises',
                    'author' => 'Ernest Hemingway',
                    'image_url' => 'https://ia600100.us.archive.org/view_archive.php?archive=/5/items/l_covers_0012/l_covers_0012_62.zip&file=0012627101-L.jpg',
                    'created_at' => now(),
                    'updated_at' => now(),
                ],
                [
                    'title' => 'War and Peace',
                    'author' => 'Leo Tolstoy',
                    'image_url' => 'https://images-na.ssl-images-amazon.com/images/P/1400079985.01._SX360_SCLZZZZZZZ_.jpg',
                    'created_at' => now(),
                    'updated_at' => now(),
                ],
                [
                    'title' => "Swann's Way",
                    'author' => 'Marcel Proust',
                    'image_url' => 'https://images-na.ssl-images-amazon.com/images/P/0142437964.01._SX360_SCLZZZZZZZ_.jpg',
                    'created_at' => now(),
                    'updated_at' => now(),
                ]
            ]);
    
        }
    }
}
