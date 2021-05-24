import * as $ from 'jquery';
// Валидация
import Validator from '/plugins/validator/validation.js';
import maskPhone from '/plugins/maskPhone/maskPhone.js';

export default $(() => {
	const loader = $('.loader'),
		body = $('body');

	const forms = $('form');

	forms.each((index, form) => {

		maskPhone('.form__phone', '+7(___)___-__-__');

		const valid = new Validator({
			selector: `#${form.id}`,
			pattern: {
				name: /^[А-яЁё]{2,}$/
			},
			method: {
				'address': [
					['notEmpty'],
				],
				'name': [
					['notEmpty'],
					['pattern', 'name']
				],
				'phone': [
					['notEmpty'],
					['pattern', 'phone']
				],
				'email': [
					['notEmpty'],
					['pattern', 'email']
				]
			},
		});

		valid.init();

		$(form).on('submit', event => {
			event.preventDefault();

			if (valid.error.size === 0) {
				// Блокирует прокрутку страницы
				body.addClass('lock');
				// Добавляет лоадер
				loader.css('display', 'flex');

				const data = {};

				$('input', form).each((index, item) => {
					data[$(item).attr('name')] = item.value;
				});

				if (form.id === 'cartForm') {
					let count = 0;
					$('.cart__set-content').each((index, item) => {
						count = $('.cart__set-number', item).text().slice(1);
						if ($('.cart__set-name', item).text() in data) {
							count = +data[$('.cart__set-name', item).text()] + +count;
						}
						data[$('.cart__set-name', item).text()] = count;
					});
				}

				$.post(
					'sendForm.php',
					data,
				)
					.done(response => {
						const popupThanks = $('#popupThanks');

						if (form.closest('.popup')) {
							const thisPopup = $(form.closest('.popup'));

							$(thisPopup).css('display', 'none');
							$('.popup__wrap', thisPopup).css('opacity', 0);

						}

						// Скрывает лоадер
						loader.css('display', 'none');

						// Снимает блокировку прокрутки страницы
						body.removeClass('lock');


						popupThanks.css('display', 'block');
						$('.popup__wrap', popupThanks).css('opacity', 1);

						setTimeout(() => {
							popupThanks.css('display', 'none');
							$('.popup__wrap', popupThanks).css('opacity', 0);
						}, 2000);

						$('input', form).each((index, item) => {
							if (item.type !== 'hidden') {
								item.value = '';
							}
						});
						console.log(response);
					})
					.fail(response => {
						console.warn(response.status + ' ' + response.statusText);
					});
			}

		});

	});

});
