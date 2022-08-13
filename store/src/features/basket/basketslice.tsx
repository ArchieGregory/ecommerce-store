import { createSlice } from '@reduxjs/toolkit'

interface Product {
    "id": string,
    "item_name": string,
    "item_unit_cost": number,
    "item_unit_weight": string,
    "type": string,
}

export interface BasketItem {
    product: Product,
    quantity: number,
}

export interface StateType {
    items: BasketItem[],
    total: number,
}

// Helper function to round to 2 decimal points
function roundTo2Decimals(x: number) {
    return Math.round(x * 100) / 100;
}


export const basketSlice = createSlice({
    name: 'basket',
    initialState: {
        items: [],
        total: 0,
    },
    reducers: {
        addToBasket: (state: StateType, action: any) => {
            const productInBasket = state.items.find((item: BasketItem) => item.product.id === action.payload.id);
            if (productInBasket) {
                productInBasket.quantity++;
                state.total = roundTo2Decimals(state.total + productInBasket.product.item_unit_cost);


            } else {
                state.items.push({ product: {...action.payload}, quantity: 1 });
                state.total = roundTo2Decimals(state.total + action.payload.item_unit_cost);
            }
        },
        clearBasket: (state: StateType) => {
            state.items = [];
            state.total = 0;
        }
    }
})

export const { addToBasket, clearBasket } = basketSlice.actions

export default basketSlice.reducer