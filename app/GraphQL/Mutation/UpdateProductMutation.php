<?php

namespace App\GraphQL\Mutation;

use App\Product;
use GraphQL;
use GraphQL\Type\Definition\Type;
use Rebing\GraphQL\Support\Mutation;    

class UpdateProductMutation extends Mutation
{
    protected $attributes = [
        'name' => 'UpdateProductMutation',
        
    ];

    public function type()
    {
        return GraphQL::type('product');
    }

    public function args()
    {
        return [           
            'id' => ['name' => 'id', 'type' => Type::nonNull(Type::int())], //required
            'name' => ['name' => 'name', 'type' => Type::string()],
            'sku' => ['name' => 'sku', 'type' => Type::string()], //not required
            'inventory' => ['name' => 'inventory', 'type' => Type::int()],                 
        ];
    }

    public function resolve($root, $args)
    {
        $product = Product::find($args['id']);
        $product->name = isset($args['name']) ? $args['name'] : $product->name;
        $product->sku = isset($args['sku']) ? $args['sku'] : $product->sku;
        $product->inventory =isset($args['inventory']) ? $args['inventory'] : $product->inventory;
        $product->save();
        return $product;
    }
}