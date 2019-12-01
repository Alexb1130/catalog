<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
import TableFilter from "./TableFilter";
export default {
	data() {
		return {
			checkedProducts: [],
			cols: ["Выбран", "Категория", "Товар", "Цена"]
		};
	},
	components: {
		TableFilter
	},
	computed: mapGetters([
		"availableProducts",
		"productCategories",
		"allProducts",
		"allFilteredProducts"
	]),
	methods: {
		...mapActions(["getProducts"]),
		...mapMutations(["addCart"]),

		sendToCart() {
			this.addCart(this.checkedProducts);

			if (!this.allFilteredProducts.length) {
				document
					.querySelectorAll("select option")
					.forEach(el => (el.selected = el.defaultSelected));
			}
		}
	},
	created() {
		this.getProducts();
	}
};
</script>
<template>
	<div class="table-container">
		<div v-if="!allProducts">
			<p class="loading">Загружаю товары...</p>
		</div>
		<div class="table-settings">
			<TableFilter />

			<button
				:disabled="!checkedProducts.length || !availableProducts.length"
				@click="sendToCart"
			>
				В корзину
			</button>
		</div>
		<table>
			<thead>
				<tr>
					<th v-for="(col, i) in cols" :key="i">
						{{ col }}
					</th>
				</tr>
			</thead>
			<tbody>
				<template v-if="allFilteredProducts.length">
					<tr
						v-for="product in allFilteredProducts"
						:key="product.id"
					>
						<td>
							<input
								type="checkbox"
								:value="product"
								v-model="checkedProducts"
							/>
						</td>
						<td>{{ product.group.name }}</td>
						<td>{{ product.name }}</td>
						<td>{{ product.price }} ₽</td>
					</tr>
				</template>
				<template v-else>
					<tr v-for="product in availableProducts" :key="product.id">
						<td>
							<input
								type="checkbox"
								:value="product"
								v-model="checkedProducts"
							/>
						</td>
						<td>{{ product.group.name }}</td>
						<td>{{ product.name }}</td>
						<td>{{ product.price }} ₽</td>
					</tr>
				</template>
			</tbody>
		</table>
	</div>
</template>
<style>
.table-container {
	position: relative;
}
@keyframes loading {
	from {
		opacity: 0;
	}
	to {
		opacity: 1;
	}
}
.loading {
	position: absolute;
	top: 200px;
	left: 0;
	right: 0;
	margin: auto;
	animation: loading 1s infinite;
	animation-direction: alternate-reverse;
	font-size: 20px;
}
.table-settings {
	display: flex;
	justify-content: space-between;
	margin-bottom: 15px;
}
.filters {
	display: flex;
	align-items: center;
}
select {
	margin: 0 10px;
}
table {
	position: relative;
	width: 100%;
	border-collapse: collapse;
	overflow: hidden;
	box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
	background-color: #55608f;
}

th,
td {
	padding: 15px;
	text-align: left;
	color: #fff;
}

thead th {
	color: #dd5;
}
</style>