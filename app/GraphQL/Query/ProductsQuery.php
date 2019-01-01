<?php

namespace App\GraphQL\Query;

use App\Product;
use GraphQL;
use GraphQL\Type\Definition\Type;
use Rebing\GraphQL\Support\Query;

class ProductsQuery extends Query
{
    protected $attributes = [
        'name' => 'Products query'
    ];

    public function type()
    {
        return Type::listOf(GraphQL::type('product'));
    }

    public function args()
    {
        return [
            'id' => ['name' => 'id', 'type' => Type::int()],
            'name' => ['name' => 'name', 'type' => Type::string()],
            'sku' => ['name' => 'sku', 'type' => Type::string()],          
            'inventory' => ['name' => 'inventory', 'type' => Type::int()],          
        ];
    }

    public function resolve($root, $args)
    {
        if (isset($args['id'])) {
            return Product::where('id' , $args['id'])->get();
        }

        if (isset($args['name'])) {
            return Product::where('name', $args['name'])->get();
        }

        if (isset($args['sku'])) {
            return Product::where('sku', $args['sku'])->get();
        }

        if (isset($args['inventory'])) {
            return Product::where('inventory', $args['inventory'])->get();
        }

        return Product::all();
    }
}