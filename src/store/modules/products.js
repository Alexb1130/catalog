import _ from 'lodash'

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
        orderBy(state, { target }) {

            let orderType;

            if (target.value === 'name') {
                orderType = target.checked ? 'asc' : 'desc';
            } else {
                orderType = target.checked ? 'desc' : 'asc';
            }

            if (state.filteredProducts.length) {
                state.filteredProducts = _.orderBy(state.filteredProducts, target.value, orderType);
            }

            state.products = _.orderBy(state.products, target.value, orderType);
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