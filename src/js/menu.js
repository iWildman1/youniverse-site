// import scrollStop from './scrollStop.js';

/*! scrollStop.js | (c) 2017 Chris Ferdinandi | MIT License | http://github.com/cferdinandi/scrollStop */
/**
 * Run functions after scrolling has stopped
 * @param  {Function} callback The function to run after scrolling
 */
var scrollStop = function ( callback ) {
	// Make sure a valid callback was provided
	if ( !callback || Object.prototype.toString.call( callback ) !== '[object Function]' ) return;
	// Setup scrolling variable
	var isScrolling;
	// Listen for scroll events
	window.addEventListener('scroll', function ( event ) {
		// Clear our timeout throughout the scroll
		window.clearTimeout( isScrolling );
		// Set a timeout to run after scrolling ends
		isScrolling = setTimeout(function() {
			// Run the callback
			callback();
		}, 66);
	}, false);
};
///////////////////////////////////////////////////////////////////////////////////

function init(){
	const menuItems = document.querySelectorAll('.menu ul li a');
	let scrolling = false;

	menuItems.forEach(function(item){
		item.addEventListener('click', scrollToLink, {passive : false})
	});

	function scrollToLink(e){
		e.preventDefault();
		const element = e.target.getAttribute('href');
		document.querySelector(element).scrollIntoView({
			behavior: 'smooth'
		});
	}

	window.addEventListener('scroll', function(){
		if(!scrolling){
			scrolling = true;
			document.querySelector('.menu').classList.add('nav-hide');
			document.querySelector('.knowledge-icon').classList.add('hide');
		}
	}, {passive : true});

	scrollStop(function () {
		scrolling = false;
		setTimeout(() => {
			document.querySelector('.menu').classList.remove('nav-hide')
			document.querySelector('.knowledge-icon').classList.remove('hide');
		}, 200);
	});
}

module.exports = {
    init : init
}
