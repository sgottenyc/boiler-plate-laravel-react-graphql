<?php

namespace App\GraphQL\Mutation;

use App\Product;
use GraphQL;
use GraphQL\Type\Definition\Type;
use Rebing\GraphQL\Support\Mutation;    

class CreateProductMutation extends Mutation
{
    protected $attributes = [
        'name' => 'CreateProduct',
        
    ];

    public function type()
    {
        return GraphQL::type('product');
    }

    public function args()
    {
        return [           
            'name' => ['name' => 'name', 'type' => Type::nonNull(Type::string())],
            'sku' => ['name' => 'sku', 'type' => Type::nonNull(Type::string())],
            'inventory' => ['name' => 'inventory', 'type' => Type::nonNull(Type::int())],                    
        ];
    }

    public function resolve($root, $args)
    {
        $product = new Product();
        $product->name = $args['name'];
        $product->sku = $args['sku'];
        $product->inventory = $args['inventory'];
        $product->save();
        return $product;
    }
}