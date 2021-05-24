import * as $ from 'jquery';
import 'slick-carousel';

export default $(() => {
	$('.hero-slider__images').slick({
		prevArrow: $('.hero-slider__arrows-left'),
		nextArrow: $('.hero-slider__arrows-right'),
		dots: true,
		appendDots: $('.hero-slider__dots'),
		autoplay: true,
		autoplaySpeed: 2000,
	});

	$('.hero-slider__images').on('afterChange', (event, slick, currentSlide) => {
		$('.hero-slider__number-slide').text(currentSlide + 1);
	});

	$('.hero-text__button').on('click', event => {
		event.preventDefault();
		const id = $('.hero-text__button').attr('href'),
			top = $(id).offset().top;
		$('body,html').animate({ scrollTop: top }, 500);
	});
});

