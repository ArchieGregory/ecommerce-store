import React, { useEffect, useState } from 'react';
import ProductInfo from './ProductInfo';

interface Product{
    "id": string,
    "item_name": string,
    "item_unit_cost": number,
    "item_unit_weight": string,
    "type": string
}

// helper function to nest array
function nestItems(productArray: any[], rowLength: number) {
    productArray.slice();
    let nestedArray = [];
    while (productArray.length){
        nestedArray.push(productArray.splice(0, rowLength));
    }
    return nestedArray;
}

function Products() {
    const [products, setProducts] = useState<any[]>([])

    useEffect(() => {
        // Get data 
        const getProducts = async () => {
            await fetch('https://quant-spark.github.io/qs-test/test.json')
                .then(response => response.json())
                .then(data => { setProducts(nestItems(data, 3))});
        }

        getProducts().catch(console.error);
        
    }, []);
    console.log("Items nested", products);
    return (
        <div>

            {products ? (
                <div>
                    {products.map((row, index) => (
                        <div className='Horizontal-row' key={`row-${index}`}>
                            {row.map((product: Product, i: number) => (
                                <ProductInfo key={product.id} product={product} />
                            ))}
                        </div>
                    ))}
                </div>
            )
            : (
                <div>
                    <h1>
                        Waiting for products
                    </h1>
                </div>

            )}
        </div>
    
        
        
    );
}

export default Products;