<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Book extends Model
{
    use HasFactory;

    protected $fillable = ['title', 'author', 'image_url'];

    public function users()
    {
        return $this->belongsToMany(User::class);
    }

    public function meetings()
    {
        return $this->hasMany(Meeting::class);
    }

}
