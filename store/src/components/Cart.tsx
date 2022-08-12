import React from 'react';

import { useSelector } from 'react-redux';
import { BasketItem } from '../features/basket/basketslice';



function Cart() {
    const basket = useSelector((state: any) => state.basket.items);
    const total = useSelector((state: any) => state.basket.total);

    return (
        <div className='Cart'>
            <h1>
                Basket
            </h1>
            {basket.map((item: BasketItem, index: number) => (
                <p key={item.product.id}>{item.product.item_name} {item.quantity}</p>
            ))}

            <p>
                Total {total}
            </p>
        </div>


    );
}

export default Cart;