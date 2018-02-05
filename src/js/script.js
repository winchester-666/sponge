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




var linkNav = document.querySelectorAll('[href^="#"]'),
V = 0.3;
for (var i = 0; i < linkNav.length; i++) {
	linkNav[i].addEventListener('click', function(e) {
		e.preventDefault();
		document.getElementsByClassName("num_section-link--active")[0].classList.remove('num_section-link--active');
		var w = window.pageYOffset,
		hash = this.href.replace(/[^#]*(.*)/, '$1');
		document.querySelectorAll('.num_section-link[href^="'+hash+'"]')[0].classList.add('num_section-link--active');
		t = document.querySelector(hash).getBoundingClientRect().top,
		start = null;
		requestAnimationFrame(step);
		function step(time) {
			if (start === null) start = time;
			var progress = time - start,
			r = (t < 0 ? Math.max(w - progress/V, w + t) : Math.min(w + progress/V, w + t));
			window.scrollTo(0,r);
			if (r != w + t) {
				requestAnimationFrame(step)
			} else {
				location.hash = hash  
			}
		}
	}, false);
}