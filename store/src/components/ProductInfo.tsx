import React from 'react';


interface Product {
    "id": string,
    "item_name": string,
    "item_unit_cost": number,
    "item_unit_weight": string,
    "type": string
}


interface ProductInfoProps {
    product: Product,
}


function ProductInfo ({product}: ProductInfoProps) {
    return (
        <div className='card'>
            <h2>
                {product.item_name}
            </h2>
            <p>Weight: {product.item_unit_weight}</p>
            <p>Cost: {product.item_unit_cost}</p>
            <p>Type: {product.type}</p>
            <button>Add to cart</button> 
        </div>
     

    );
}

export default ProductInfo;