import * as $ from 'jquery';

export default $(() => {
	$('.navbar-block').on('click', event => {
		const target = event.target;

		if (target.closest('a[href^="#"]')) {
			const id = $(target.closest('a')).attr('href'),
				top = $(id).offset().top;
			$('body,html').animate({ scrollTop: top }, 500);
		}
	});
});
