<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'quantity_in_stock',
        'price_per_item',
    ];

    protected $casts = [
        'quantity_in_stock' => 'integer',
        'price_per_item' => 'decimal:2',
    ];
}
