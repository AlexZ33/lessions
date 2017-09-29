<template>
	<div id="app">
		<router-view></router-view>
	</div>
</template>

<script>
	export default {
		name: 'app'
	}
</script>

<style>
	#app {
		font-family: 'Avenir', Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-align: center;
		color: #2c3e50;
	}
	
	* {
		padding: 0;
		margin: 0;
	}
	
	a {
		text-decoration: none;
	}
	
	ul li {
		list-style: none;
	}
	
	body,
	html {
		font-size: 14px;
	}
</style>