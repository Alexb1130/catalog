<template>
	<div id="app">
		<div class="main-content">
			<Table />
			<Cart />
		</div>
	</div>
</template>

<script>
import Table from "./components/Table";
import Cart from "./components/Cart";
export default {
	name: "app",
	components: {
		Table,
		Cart
	}
};
</script>

<style>
body {
	font-family: "Avenir", Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	margin-top: 60px;
	text-align: center;
	color: #dedef0;
	background-color: #2d334a;
}

.main-content {
  display: grid;
  grid-template-columns: 2fr 1fr;
  margin-left: 5px;
  grid-gap: 5px;
  min-height: 100vh;
}
</style>
