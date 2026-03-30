<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Storage;
use App\Models\Product;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
        ]);

        $this->call(ProductSeeder::class);

        // Sync the seeded data to JSON
        $products = Product::orderBy('created_at', 'asc')->get();
        Storage::disk('local')->put('products.json', $products->toJson(JSON_PRETTY_PRINT));
    }
}
