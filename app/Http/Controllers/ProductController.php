<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // Return JSON list of all products, ordered by datetime submitted
        return response()->json(Product::orderBy('created_at', 'asc')->get());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'quantity_in_stock' => 'required|integer|min:0',
            'price_per_item' => 'required|numeric|min:0',
        ]);

        Product::create($validated);

        $this->syncToJsonFile();

        return response()->json(Product::orderBy('created_at', 'asc')->get());
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'quantity_in_stock' => 'required|integer|min:0',
            'price_per_item' => 'required|numeric|min:0',
        ]);

        $product = Product::findOrFail($id);
        $product->update($validated);

        $this->syncToJsonFile();

        return response()->json(Product::orderBy('created_at', 'asc')->get());
    }

    /**
     * Serialize the products table to an XML/JSON file.
     * Fulfills test requirement: "The submitted data of the form should be saved in an XML / JSON file with valid XML / JSON syntax."
     */
    private function syncToJsonFile()
    {
        $products = Product::orderBy('created_at', 'asc')->get();
        Storage::disk('local')->put('products.json', $products->toJson(JSON_PRETTY_PRINT));
    }
}
