import * as $ from 'jquery';

export default $(document).ready(() => {
	let position = 1;
	// positionDot = 0;
	const sliderImages = $('.hero-slider__images'),
		wrapWidth = $('.hero-slider__wrap').width(),
		slidesLenght = $('.hero-slider__item').length;

	const addsDot = () => {
		for (let index = 0; index < slidesLenght; index++) {
			$('.hero-slider__dots-list').append($('<li class="hero-slider__dots-item"></li>'));
		}

		$('.hero-slider__dots-item:first-child').addClass('dot-active');
	};
	addsDot();

	const addsSlide = () => {
		sliderImages.css("left", `-${wrapWidth}px`);

		const clonePrevSlide = $('.hero-slider__item').eq(slidesLenght - 1).clone(true);
		$('.hero-slider__images').prepend(clonePrevSlide);
	};
	addsSlide();

	// const nextDot = position => {
	// 	console.log('position: ', position);
	// 	$('.dot-active').removeClass('dot-active');
	// 	$('.hero-slider__dots-item').eq(position).addClass('dot-active');
	// 	$('.hero-slider__number-slide').text(position + 1);
	// };

	const nextSlide = position => {
		const cloneNextSlide = $('.hero-slider__item').eq(position).clone(true);
		$('.hero-slider__images').append(cloneNextSlide);

		console.log('position next: ', position);

		$('.dot-active').removeClass('dot-active');
		if (position > 0) {
			sliderImages.css("transform", `translateX(-${wrapWidth * position}px)`);
		} else {
			sliderImages.css("transform", `translateX(${wrapWidth * Math.abs(position)}px)`);
		}
		$('.hero-slider__dots-item').eq(position).addClass('dot-active');
		$('.hero-slider__number-slide').text(position + 1);
	};

	const prevSlide = position => {
		const clonePrevSlide = $('.hero-slider__item').eq(slidesLenght - 1).clone(true);
		$('.hero-slider__item').eq(0).replaceWith(clonePrevSlide);

		console.log('position prev: ', position);

		$('.dot-active').removeClass('dot-active');
		if (position > 0) {
			sliderImages.css("transform", `translateX(-${wrapWidth * position}px)`);
		} else {
			sliderImages.css("transform", `translateX(${wrapWidth * Math.abs(position)}px)`);
		}
		$('.hero-slider__dots-item').eq(position).addClass('dot-active');
		$('.hero-slider__number-slide').text(position + 1);
	};

	$('.hero-slider__elements').on('click', event => {
		const target = event.target;

		if (target.closest('.hero-slider__arrows-right')) {
			++position;
			nextSlide(position);

		} else if (target.closest('.hero-slider__arrows-left')) {
			--position;
			const clonePrevSlide = $('.hero-slider__item').eq(slidesLenght - 1).clone(true);
			$('.hero-slider__images').prepend(clonePrevSlide);
			prevSlide(position);
		}
		// else if (target.matches('.hero-slider__dots-item')) {
		// 	$('.hero-slider__dots-item').each((index, elem) => {
		// 		if (elem === target) {
		// 			positionDot = index;
		// 		}
		// 	});
		// }
		// if (position > slidesLenght - 1) {
		// 	positionDot = 0;
		// }

		// if (position < 0) {
		// 	positionDot = slidesLenght - 1;
		// }

	});
});
