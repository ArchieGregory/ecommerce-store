import React from 'react';

import { useSelector } from 'react-redux';
import { BasketItem, clearBasket } from '../features/basket/basketslice';
import { useDispatch } from 'react-redux'


interface Summary {
    type: string,
    weight: number,
    quantity: number,
    cost: number
}

// Helper function to round to 2 decimal points
function roundTo2Decimals(x: number) {
    return Math.round(x * 100) / 100
}

// Helper function to creat cart summary
function typeSummaries(basket: BasketItem[]) {
    let summary: Summary[] = [];
    
    // For each basket item, add information to the summary
    basket.forEach(item => {
        const typeInSummary = summary.find((summaryItem: Summary) => summaryItem.type === item.product.type);
        if (typeInSummary) {
            typeInSummary.quantity += item.quantity;
            typeInSummary.cost = roundTo2Decimals(typeInSummary.cost + item.product.item_unit_cost)
            const weightValue = parseFloat(item.product.item_unit_weight.slice(0, -1));
            typeInSummary.weight = roundTo2Decimals(typeInSummary.weight + weightValue)
        } else {
            const weightValue = parseFloat(item.product.item_unit_weight.slice(0, -1));
            const cost = roundTo2Decimals(item.product.item_unit_cost * item.quantity);
            summary.push({
                type: item.product.type, 
                weight: weightValue, 
                cost: cost,
                quantity: item.quantity,
            })
        }
    })

    return summary;
}

// Cart function, lists basket items, total and summary
function Cart() {
    // Use Dispatch to modify state, Selectors to view data
    const dispatch = useDispatch()
    const basket = useSelector((state: any) => state.basket.items);
    const total = useSelector((state: any) => state.basket.total);

    const summary = typeSummaries(basket);

    // Render the cart, mapping over items in basket, and types
    return (
        <div className='Cart'>
            <h1>
                Basket
            </h1>
            
            {basket.map((item: BasketItem, index: number) => (
                <div key={item.product.id} className='BasketItem'>
                    {item.product.item_name} {item.product.item_unit_weight}: 
                    <span className='FloatRight'>x{item.quantity}</span>
                </div>
            ))}
            
           
            <div className='TotalStyle'>
                Total: £{total} 
                {basket.length &&  
                    <button className='ClearButton FloatRight' onClick={() => dispatch(clearBasket())}>
                        Clear
                    </button> 
                }
            </div>
            <div className='SummaryStyle'>
                {summary.map((item: Summary, index: number) => (
                    <div key={index} className='SummaryItem'>
                        <strong>{item.type}:</strong><br />
                        Weight: {item.weight}g<br />
                        Quantity: {item.quantity}<br />
                        Cost: {item.cost}<br />
                    </div>
                ))}
            </div>
        </div>


    );
}

export default Cart;