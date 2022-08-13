import React from 'react';

import { useSelector } from 'react-redux';
import { BasketItem } from '../features/basket/basketslice';

interface Summary {
    type: string,
    weight: number,
    quantity: number,
    cost: number
}

function roundTo2Decimals(x: number) {
    return Math.round(x * 100) / 100
}

function typeSummaries(basket: BasketItem[]) {
    let summary: Summary[] = [];
    
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

function Cart() {
    const basket = useSelector((state: any) => state.basket.items);
    const total = useSelector((state: any) => state.basket.total);

    const summary = typeSummaries(basket);

    return (
        <div className='Cart'>
            <h1>
                Basket
            </h1>
            <div >
                {basket.map((item: BasketItem, index: number) => (
                    <div key={item.product.id} className='BasketItem'>
                        {item.product.item_name} {item.product.item_unit_weight}: <span className='alignRight'>x{item.quantity}</span>
                    </div>
                ))}
            </div>
            

            <h2>
                Total: £{total}
            </h2>
            <div className='SummaryStyle'>
                {summary.map((item: Summary, index: number) => (
                    <div key={index} className='SummaryItem'>
                        <strong>{item.type}:</strong><br />
                        Weight: {item.weight}<br />
                        Quantity: {item.quantity}<br />
                        Cost: {item.cost}<br />
                    </div>
                ))}
            </div>
        </div>


    );
}

export default Cart;