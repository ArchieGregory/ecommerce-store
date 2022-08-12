import React from 'react';
import { useDispatch } from 'react-redux'
import { addToBasket } from '../features/basket/basketslice';




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
    const dispatch = useDispatch()

    return (
        <div className='card'>
            <h2>
                {product.item_name}
            </h2>
            <p>Weight: {product.item_unit_weight}</p>
            <p>Cost: {product.item_unit_cost}</p>
            <p>Type: {product.type}</p>
            <button onClick={() => dispatch(addToBasket(product))}>
                Add to cart
            </button> 
        </div>
     

    );
}

export default ProductInfo;