window.onload = function() {
var preloader = document.getElementById("preloader");
var nav_menu__item = document.querySelectorAll('.nav_menu__item');
var service_item = document.querySelectorAll('.service_item');
var btn_mob = document.getElementsByClassName('btn_mob');
var nav_menu = document.getElementsByClassName('nav_menu');

setTimeout(
	function(){fadeOut(preloader);

// menu animation
Array.prototype.forEach.call(nav_menu__item, function(el, i){
	el.style.opacity = 0;
});

j=0;
interv= setInterval(function(){
	if (!nav_menu__item[j]) {
		clearInterval(interv);
		return;
	};
	fadeIn(nav_menu__item[j]);
	++j;
}, 200);

// service slist animation
Array.prototype.forEach.call(service_item, function(el, i){
	el.style.opacity = 0;
});

i=0;
interv= setInterval(function(){
	if (!service_item[i]) {
		clearInterval(interv);
		return;
	};
	fadeIn(service_item[i]);
	++i;
}, 100);


btn_mob[0].onclick = function() {
	nav_menu[0].classList.toggle('nav_menu--active');
	btn_mob[0].classList.toggle('btn_mob--active');
};
	},1000);
};



function fadeIn(el) {

	var last = +new Date();
	var tick = function() {
		el.style.opacity = +el.style.opacity + (new Date() - last) / 400;
		last = +new Date();

		if (+el.style.opacity < 1) {
			(window.requestAnimationFrame && requestAnimationFrame(tick)) || setTimeout(tick, 16);
		}
	};
	tick();
}

function fadeOut(el){
	el.style.opacity = 1;
	var interpreloader = setInterval(
		function(){
			el.style.opacity = el.style.opacity - 0.05;
			if (el.style.opacity <= 0.05){ 
				clearInterval(interpreloader);
				preloader.style.display = "none";
			}
		},16);
}