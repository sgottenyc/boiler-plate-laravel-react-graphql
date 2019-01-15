<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Product;

class ProductTest extends TestCase
{
    /**
     * Test Create Product.
     *
     * @return the product created
     *
     *  ./vendor/bin/phpunit ./tests/Feature/ProductTest.php
     */
  
    public function testCreateProduct() {
        $query = 'mutation product {
                                      createProduct(name:"TestCreate", sku:"1a", inventory:0) {
                                        name,
                                        sku,
                                        inventory
                                      }
                                    }';

        $expected = '{                     
                        "createProduct": {
                          "name": "TestCreate",
                          "sku": "1a",
                          "inventory": 0
                        }                   
                    }';
      
        $expected = json_decode($expected,true);
          
        $response =  $this->post('/graphql', [
            'query' => $query
        ]);
      
        $response->assertStatus(200);
        $result = $response->json("data");;    
        $this->assertEquals($expected, $result);
      
    }
  
    public function testListProducts()
    {
        $query = '{  products(name:"TestCreate") { 
                                 name,
                                 inventory,
                                 sku,
                              }}';

        $expected = '{                     
                        "products": [
                          {
                            "name": "TestCreate",
                            "inventory": 0,
                            "sku": "1a"
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
  
    public function testUpdateProduct() {
       $findProduct = Product::where('name', "TestCreate")->first();
       $query = 'mutation {  
                    updateProduct(id: ' . $findProduct->id . ', inventory: 100) {
                      inventory
                    }
                 }';

        $expected = '{                     
                         "updateProduct": {
                            "inventory": "100"
                          }                    
                    }';
      
        $expected = json_decode($expected,true);
          
        $response =  $this->post('/graphql', [
            'query' => $query
        ]);
      
        $response->assertStatus(200);
        $result = $response->json("data");;    
        $this->assertEquals($expected, $result);  
    }
      
    public function testDeleteProducts() {
       $findProduct = Product::where('name', "TestCreate")->first();
       $query = 'mutation {  
                    deleteProduct(id: ' . $findProduct->id . ') {
                      name
                    }
                 }';
               
        $response =  $this->post('/graphql', [
            'query' => $query
        ]);
      
        $response->assertStatus(200);

        $checkExists = Product::where('name', "TestCreate")->count();

        //Check to see if product exists
        
        $this->assertEquals(0, $checkExists);        
    }    
}
