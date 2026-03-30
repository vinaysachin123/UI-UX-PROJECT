<?php

namespace Database\Seeders;

use App\Models\Product;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Product::create([
            'name' => 'Sample Product from Seeder',
            'quantity_in_stock' => 10,
            'price_per_item' => 99.99,
        ]);
        
        Product::create([
            'name' => 'Demo Testing Item',
            'quantity_in_stock' => 5,
            'price_per_item' => 10.00,
        ]);
    }
}
