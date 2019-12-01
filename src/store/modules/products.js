import { orderBy } from 'lodash'

const _adaptationProductsStructure = products => {
    const adaptedProducts = []

    products.forEach(el => {
        el.skus.forEach(skusEl => {
            skusEl.group = {
                ...el.group
            }
            adaptedProducts.push(skusEl)
        })
    })

    return adaptedProducts
}

const _orderBy = (state, event, field) => {
    let orderType = event.target.checked ? 'desc' : 'asc';

    if (state.filteredProducts.length) {
        state.filteredProducts = orderBy(state.filteredProducts, field, orderType);
    }

    state.products = orderBy(state.products, field, orderType);
}

export default {
    state: {
        products: [],
        productsOriginal: [],
        cart: [],
        filteredProducts: []
    },
    actions: {
        async getProducts({ commit }) {
            const response = await fetch('https://ssdev.superagent.ru/TestApp/Values/GetWithParent')
            const products = await response.json()

            commit('unpateProducts', products)
        }
    },
    mutations: {
        unpateProducts(state, products) {
            state.productsOriginal = products;
            state.products = _adaptationProductsStructure(products)
        },
        addCart(state, products) {
            state.cart = [...new Set(products)]
        },
        filteredCategories(state, event) {
            state.filteredProducts = state.products.filter(el => el.group.name === event.target.value)
        },
        orderByName(state, event) {
            _orderBy(state, event, 'name')
        },
        orderByPrice(state, event) {
            _orderBy(state, event, 'price')
        }
    },
    getters: {
        allProducts(state) {
            return state.products.length;
        },
        allFilteredProducts(state) {
            return state.filteredProducts.filter(el => !state.cart.includes(el))
        },
        availableProducts(state) {
            return state.products.filter(el => !state.cart.includes(el))
        },
        cartProducts(state) {
            return state.cart
        },
        productCategories(state) {
            return state.productsOriginal.map(el => el.group)
        }
    }
}