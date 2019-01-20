<?php

namespace App\GraphQL\Mutations;

use App\Model\Product;
use GraphQL;
use GraphQL\Type\Definition\ResolveInfo;   

class DeleteProducts
{
    public function resolve($rootValue, array $args, $context, ResolveInfo $resolveInfo): Product
    {
        $ids = $args["id"];
        for($x=0; $x < count($ids); $x++) {
          //delete product here
        }
    }
}