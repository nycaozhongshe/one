<template>
</template>

<script>
	var  touchEven = function() {
		$("body").on("touchstart",
			function(e) {
				e.preventDefault();
				startX = e.originalEvent.changedTouches[0].pageX,
					startY = e.originalEvent.changedTouches[0].pageY;
			});
		$("body").on("touchmove",
			function(e) {
				e.preventDefault();
				moveEndX = e.originalEvent.changedTouches[0].pageX,
					moveEndY = e.originalEvent.changedTouches[0].pageY,
					X = moveEndX - startX;
				Y = moveEndY - startY;
				if(Math.abs(X) > Math.abs(Y) && X > 0) {
					//left to right
				} else if(Math.abs(X) > Math.abs(Y) && X < 0) {
					//"right to left"
				} else if(Math.abs(Y) > Math.abs(X) && Y > 0) {
					//top to bottom
				} else if(Math.abs(Y) > Math.abs(X) && Y < 0) {
					//bottom to top
				} else {

				}

			});
	}
</script>

<style>

</style>