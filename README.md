Install php 8.2 with homebrew
    `brew install php@8.2`

Make sure that it works
`php -v`

If it doesn't work look into linking with this code:
`brew link --overwrite php@8.2`

Install composer (equivalent of npm for php)
`brew install composer`

Make sure composer is in your PATH
`composer`

Navigate to the directory of the project and run composer install to install vendor files.
`composer install`

Copy the env
`cp .env.example to .env`

Run migration
`php artisan migrate`

Get laravel valet (to serve the site)
`composer global require laravel/valet`

Install valet
`valet install`

Let valet serve
`valet link`
`valet open`

Run npm build
`npm run build`

Go to booksapp.test


How to reset the database.

First go to the database/migrations/create_users_table.php file and uncomment the user file stuff.

`php artisan migrate:fresh`
`php artisan db:seed`
`php artisan db:seed --class=MeetingsTableSeeder`
You also need to re-register your user after this as well.

