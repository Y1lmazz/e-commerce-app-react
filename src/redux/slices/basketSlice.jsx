import { createSlice } from '@reduxjs/toolkit'


const getBasketFromStorage = () => {
    try {
        if (localStorage.getItem("basket")) {
            return JSON.parse(localStorage.getItem("basket"));
        }
    }
    catch (error) {
        console.error("LocalStorage'dan veri alinamadı", error)
    }
    return [];
}

const initialState = {
    products: getBasketFromStorage(),
    drawer: false,
    totalPrice: 0
}

const basketToStorage = (basket) => {
    localStorage.setItem("basket", JSON.stringify(basket))
}



export const basketSlice = createSlice({
    name: "basket",
    initialState,
    reducers: {
        addToBasket: (state, action) => {
            const findProduct = state.products && state.products.find((product) => product.id === action.payload.id);
            if (findProduct) {
                findProduct.number += action.payload.number
                basketToStorage(state.products)

            } else {
                state.products = [...state.products, action.payload]
                basketToStorage(state.products)
            }

        },
        setDrawer: (state) => {
            state.drawer = !state.drawer
        },
        calculateTotalPrice: (state) => {
            state.totalPrice = 0
            state.products && state.products.map((product) => {
                state.totalPrice += product.price * product.number;
            })
        },

        removeFromBasket: (state, action) => {
            const updatedProducts = state.products.filter(
                (product) => product.id !== action.payload.id
            );
            state.products = updatedProducts;
            basketToStorage(updatedProducts);

            console.log('Mevcut sepet:', state.products);
            console.log('removeFromBasket çağrıldı, id:', action.payload.id);
        }



    }

})

export const { addToBasket, setDrawer, calculateTotalPrice, removeFromBasket } = basketSlice.actions
export default basketSlice.reducer


