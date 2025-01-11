<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Carbon\Carbon;
use Carbon\CarbonTimeZone;
use Illuminate\Support\Facades\DB;



class MeetingsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::statement('SET FOREIGN_KEY_CHECKS=0;'); // Disable foreign key checks
        DB::table('meetings')->truncate();           // Truncate the table
        DB::statement('SET FOREIGN_KEY_CHECKS=1;'); // Re-enable foreign key checks


       // Set timezone to Eastern Time 
        $easternTimezone = new CarbonTimeZone('America/New_York');

        // Get current time in Eastern Time and adjust
        $dateTime = Carbon::now($easternTimezone)
            ->addWeek()                // Add one week
            ->setTime(19, 0, 0);       // Set time to 7:00 PM
        
        for($i = 0; $i < 1; $i++) {
            DB::table('meetings')->insert([
                [
                    'user_id' => 1,
                    'book_id' => 1,
                    'zoom_link' => '',
                    'date_time' => $dateTime->toDateTimeString(),
                    'description' => "Hey bros, let's read this book!"
                ],
                [
                    'user_id' => 1,
                    'book_id' => 3,
                    'zoom_link' => '',
                    'date_time' => $dateTime->toDateTimeString(),
                    'description' => "Hey girls, I want to read a book!"
                ]
            ]);
    
        }
    }
}
