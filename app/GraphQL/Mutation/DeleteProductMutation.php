<?php

namespace App\GraphQL\Mutation;

use App\Product;
use GraphQL;
use GraphQL\Type\Definition\Type;
use Rebing\GraphQL\Support\Mutation;    

class DeleteProductMutation extends Mutation
{
    protected $attributes = [
        'name' => 'DeleteProductMutation',
        
    ];

    public function type()
    {
        return GraphQL::type('product');
    }

    public function args()
    {
        return [           
            'id' => ['name' => 'id', 'type' => Type::nonNull(Type::int())]
        ];
    }

    public function resolve($root, $args)
    {
        $product = Product::find($args['id']);
        $product->delete();  
        return $product;
    }
}