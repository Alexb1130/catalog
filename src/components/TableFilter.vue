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
		<b>По алфавиту: </b>
		<input type="radio" name="sort" value="name" @change="orderBy" />
		<b>По цене: </b>
		<input type="radio" name="sort" value="price" @change="orderBy" />
	</div>
</template>
<style scoped>
input {
	display: inline-block;
	margin: 10px;
}
</style>