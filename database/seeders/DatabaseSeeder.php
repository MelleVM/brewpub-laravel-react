<?php

namespace Database\Seeders;

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
        DB::table('tables')->insert(
            [
            'number' => 'T1'
            ],
            [
            'number' => 'T2'
            ],
            [
            'number' => 'T3'
            ],
            [
            'number' => 'T4'
            ],
            [
            'number' => 'T5'
            ],
            [
            'number' => 'T6'
            ]
        );
    }
}
