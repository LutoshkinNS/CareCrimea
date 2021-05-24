import * as $ from 'jquery';
import 'slick-carousel';

export default $(() => {
	$('.reviews-slider__list').slick({
		prevArrow: $('.reviews-slider__arrow-left'),
		nextArrow: $('.reviews-slider__arrow-right'),
		infinite: true,
		slidesToShow: 2,
		slidesToScroll: 1,
		dots: true,
		appendDots: $('.reviews-slider__dots'),
		responsive: [
			{
				breakpoint: 967,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
					infinite: true,
					dots: true,
					arrows: false
				}
			},
		]
	});
});
