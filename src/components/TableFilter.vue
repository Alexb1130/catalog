<script>
import { mapGetters, mapMutations } from "vuex";
export default {
	computed: mapGetters([
		"availableProducts",
		"productCategories",
		"allFilteredProducts"
	]),
	methods: mapMutations(["filteredCategories", "orderBy"])
};
</script>
<template>
	<div class="filters">
		<b>Категории: </b>
		<select @change="filteredCategories">
			<option value="0" selected>Без групировки</option>
			<option
				v-for="category in productCategories"
				:key="category.id"
				:value="category.name"
			>
				{{ category.name }}
			</option>
		</select>
		<b>Сортировать: </b>
		<label for="sort-name">По именам</label>
		<input type="checkbox" id="sort-name" name="sort" value="name" @change="orderBy" />
		<label for="sort-price">По цене</label>
		<input type="checkbox" id="sort-price" name="sort" value="price" @change="orderBy" />
	</div>
</template>
<style scoped>
input {
	display: none;
}
label {
	font-size: 14px;
	margin: 10px;
	cursor: pointer;
}
label:hover {
	opacity: .7;
}
label:active {
	opacity: .5;
}
</style>