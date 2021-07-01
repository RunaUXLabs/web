$(document).ready(function(){
	$(".more_open a").on("click", function(){
		$(this).hide();
		$(".more_cts."+$(this).attr("data-name")).slideDown();
	});
});