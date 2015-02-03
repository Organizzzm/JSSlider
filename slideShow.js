(function(){
	
var settings = {
	slideDelay: 3000,
	fadeDelay: 35,
	wrapperID: "jsSliderWarp",
	slideIndex: 0
}


initializeSettings();
initializeSlideShow();
startSlideShow();

settings.wrapper.onmouseover = function(){
	stopSlideShow();
}
settings.wrapper.onmouseout = function(){
	startSlideShow();
}
settings.decrButton.onclick = function(){
	if(settings.loadSlide == true){
		clearInterval(settings.fadeActiveSlidesID);
		settings.side = "decr";
		transitionSlides();
	}
}
settings.incrButton.onclick = function(){
	console.log(settings.loadSlide);
	if(settings.loadSlide == true){
		clearInterval(settings.fadeActiveSlidesID);
		settings.side = "incr";
		transitionSlides();
	}
	
}



window.addEventListener('focus', startSlideShow);    
window.addEventListener('blur', stopSlideShow);






function initializeSettings(){
	settings.wrapper = document.getElementById(settings.wrapperID) || null;
	settings.slides = document.querySelectorAll('.slide') || [];
	settings.incrButton = document.getElementById("incr") || null;
	settings.decrButton = document.getElementById("decr") || null;
	settings.currentSlide = 0;
	settings.side = "incr";
	settings.fadeActiveSlidesID;
	settings.loadSlide = true;
}

function initializeSlideShow(){	
	for (var i = 0; i <= settings.slides.length - 1; i++) {
			settings.slides[i].style.opacity = 0;
		};

	settings.slides[settings.slideIndex].style.opacity = 1;	
}

function startSlideShow(){
	settings.slideShowID = setInterval(transitionSlides, settings.slideDelay);
}

function stopSlideShow(){
	clearInterval(settings.slideShowID);
}

function transitionSlides(){
	settings.loadSlide = false;
	var currentSlide = settings.slides[settings.slideIndex];
	
	if(settings.side == "incr"){
		++(settings.slideIndex);
		if(settings.slideIndex >= settings.slides.length){
			settings.slideIndex = 0;
		}
	}else if(settings.side == "decr"){
		--(settings.slideIndex);
		if(settings.slideIndex < 0){
			settings.slideIndex = settings.slides.length-1;
		}
	}

	var nextSlide = settings.slides[settings.slideIndex];

	var currentSlideOpacity = 1;
  	var nextSlideOpacity = 0;
	var opacityLevelIncrement = 1 / settings.fadeDelay;
	settings.fadeActiveSlidesID = setInterval(fadeActiveSlides, settings.fadeDelay);

	function fadeActiveSlides() {
	    currentSlideOpacity -= opacityLevelIncrement;
	    nextSlideOpacity += opacityLevelIncrement;
	    
	    if (currentSlideOpacity >= 0 && nextSlideOpacity <= 1) {
	      currentSlide.style.opacity = currentSlideOpacity;
	      nextSlide.style.opacity = nextSlideOpacity; 
	    }
	    else {
	      currentSlide.style.opacity = 0;
	      nextSlide.style.opacity = 1; 
	      clearInterval(settings.fadeActiveSlidesID);
	      settings.loadSlide = true;
	    }        
  	}
}
})();





