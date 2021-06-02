<?php

namespace Database\Factories;

use App\Models\Set;
use Illuminate\Database\Eloquent\Factories\Factory;

class SetFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Set::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'exercise_id' => $this->faker->numberBetween(1,20),
            'set' => $this->faker->numberBetween(3,10),
            'kg' => $this->faker->numberBetween(10,100),
            'reps' => $this->faker->numberBetween(1,15)
        ];
    }
}
