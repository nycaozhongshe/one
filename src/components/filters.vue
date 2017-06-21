<template>
</template>

<script>
	import Vue from 'vue'
	Vue.filter('getdate', function(value) {
		var dt = new Date().getHours()
		var date = new Date(Date.parse(value.replace(/-/g, "/")));
		date = date.getTime();
		date = new Date(date).getHours()
		return dt - date
	})
	Vue.filter('tratime', function(val) {
		var date = new Date(Date.parse(val.replace(/-/g, "/")))
		var iDate = new Date(date).toDateString()
		var a = iDate.split(' ')
		return  a[2] + " " + a[1] + "." + a[3]
	})
	Vue.filter('oneAuther', function(val) {
		return '1'

	})
</script>

<style>

</style>