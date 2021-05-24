import * as $ from 'jquery';

export default $(() => {

	const open = () => {
		$('.burger-menu__popup').css('display', 'block');
	};

	const close = () => {
		$('.burger-menu__popup').css('display', 'none');
	};

	$(document).on('click', event => {

		const target = event.target;

		if (target.closest('.burger-menu__button')) {
			open();
			return;
		}

		if (target.matches('.nav__item > a')) {
			close();
			return;
		}

		if (!target.closest('.nav--burger') || target.closest('.burger-menu__close')) {
			close();
			return;
		}

	});
});
