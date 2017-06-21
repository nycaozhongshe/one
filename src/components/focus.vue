<template>
	<span class="focus" :class='{focuson: tra}' @click="show">关注</span>


</template>

<script>
	export default{
		data(){
		return{
			tra: false
		}
	},
	methods:{
		show(){
			this.tra =!this.tra
		}
	}

	}

</script>

<style scoped>
	.focus{
		display: inline-block;
		width: 100%;
		height: 100%;
		border: 2px solid #666;
		border-radius: 4px;
	}
	.focuson{
		border:none;
		background: #959595;
		color: #333;
	}
	/*.botton {
				width: 18%;
				display: inline-block;
				border: 2px solid #666;
				vertical-align: top;
				margin-top: .2rem;
				margin-left: .2rem;
				border-radius: 4px;
				height: .58rem;
				line-height: .58rem;
				font-weight: 500;
				text-align: center;
			}*/
</style>