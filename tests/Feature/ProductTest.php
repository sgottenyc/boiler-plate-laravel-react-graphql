<?php

namespace Tests\Feature;

use Tests\TestCase;

class ProductTest extends TestCase
{
    /**
     * Test Create Product.
     *
     * @return the product created
     *
     *  ./vendor/bin/phpunit ./tests/Feature/ProductTest.php
     */
    public function testListProducts()
    {
        $query = '{  products { 
                                 name,
                                 inventory,
                                 sku,
                                 id,
                              }}';

        $expected = '{                     
                        "products": [
                          {
                            "name": "bye",
                            "inventory": 15,
                            "sku": "1a",
                            "id": "3"
                          }
                        ]                      
                    }';
        $expected = json_decode($expected,true);
          
        $response =  $this->post('/graphql', [
            'query' => $query
        ]);
      
        $response->assertStatus(200);
        $result = $response->json("data");;    
        $this->assertEquals($expected, $result);
                  
    }
}
