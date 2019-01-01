<?php

namespace App\GraphQL\Type;

use GraphQL\Type\Definition\Type;
use Rebing\GraphQL\Support\Type as GraphQLType;

class ProductType extends GraphQLType
{
    protected $attributes = [
        'name' => 'Product',
    ];

    /*
    * Uncomment following line to make the type input object.
    * http://graphql.org/learn/schema/#input-types
    */
    // protected $inputObject = true;

    public function fields()
    {
        return [
            'id' => [
                'type' => Type::nonNull(Type::string()),
                'description' => 'The id of the product'
            ],
            'name' => [
                'type' => Type::string(),
                'description' => 'The name of the product'
            ],
            'sku' => [
                'type' => Type::string(),
                'description' => 'The sku of the product'
            ],          
            'inventory' => [
                'type' => Type::int(),
                'description' => 'The inventory for the product'
            ],          
        ];
    }
}

?>