$(window).on('scroll',function(){
	if($(window).scrollTop()){
		$('nav').addClass('black');
	}
	else{
		$('nav').removeClass('black');
	}
});
/*debugger;*/
$(document).ready(function(){
	$('.menu h4').click(function(){
		$('nav ul').toggleClass("active");
	});
});