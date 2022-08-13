import React, { useEffect, useState } from 'react';
import ProductInfo from './ProductInfo';

interface Product{
    "id": string,
    "item_name": string,
    "item_unit_cost": number,
    "item_unit_weight": string,
    "type": string
}

// Renders an array of profucts
function Products() {
    const [products, setProducts] = useState<any[]>([])

    // Once rendered fetch data
    useEffect(() => {
        const getProducts = async () => {
            await fetch('https://quant-spark.github.io/qs-test/test.json')
                .then(response => response.json())
                .then(data => { setProducts(data)});
        }
        getProducts().catch(console.error);
        
    }, []);

    // If Products have been retrieved, render cards.
    return (
        <div className='Body' >
            {products ? (
                <div className='Cards'>
                        {products.map((product: Product, i: number) => (
                            <div className='Horizontal-row' key={`row-${i}`}>
                                <ProductInfo key={product.id} product={product} />
                            </div>

                        ))}
                </div>
            )
            : (
                <div>
                    <h1>
                        Waiting for products.
                    </h1>
                </div>

            )}
        </div>
    
        
        
    );
}

export default Products;