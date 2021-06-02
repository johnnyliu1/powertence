<?php

namespace Database\Seeders;

use App\Models\Exercise;
use App\Models\Set;
use App\Models\Workout;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // \App\Models\User::factory(10)->create();
        Exercise::factory(10)->create();
        Workout::factory(3)->create();
        Set::factory(20)->create();
    }
}
