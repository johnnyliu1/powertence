<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Workout extends Model
{
    use HasFactory;
    protected $guarded = [];
    protected $fillable = [
        'user_id',
        'name'
    ];

    public function user() {
        return $this->belongsTo('App\User');
    }

    public function exercises() {
        return $this->hasMany(Exercise::class);
    }

}
