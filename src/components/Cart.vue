<script>
    import { mapGetters } from 'vuex';
    export default {
        computed: mapGetters(["cartProducts"])
    }
</script>

<template>
    <div class="cart">
        <h1>Корзина</h1>
        <p v-if="!cartProducts.length">Тут пока пусто</p>
        <ul>
            <li v-for="product in cartProducts" :key="product.id">
                <span>
                    {{product.name}}
                </span>
                <span>
                    {{product.price}} ₽
                </span>
            </li>
        </ul>
    </div>
</template>
<style scoped>
.cart {
    border-left: 1px solid #f5f5f5;
}
h1 {
    margin-top: 0;
}
ul {
    margin: 0 15px;
    padding: 0;
    list-style: none;
}
li {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #f5f5f5;
}
span {
    text-align: left;
    display: inline-block;
    margin: 15px 20px;
}
span:first-child {
    max-width: 60%;
}
span:last-child {
    text-align: right;
}
</style>