import * as $ from 'jquery';

export default $(() => {
	const body = $('body'),
		popupWrap = $('.popup__wrap'),
		popupImg = $('.popup__img > img');

	const openPopup = popupID => {
		// Блокирует прокрутку страницы
		body.addClass('lock');
		// Показывает модальное окно
		$(popupID).css('display', 'block');
		popupWrap.animate({
			opacity: 1
		});
	};

	const closePopup = () => {
		// Убирает блокировку прокрутки страницы
		body.removeClass('lock');
		// Скрываем модальное окно
		$('.popup').css({
			display: 'none'
		});
		popupWrap.css({
			opacity: 0
		});
		// Удаляем изображение модального окна
		popupImg.attr('src', '');
	};

	$(document).on('click', event => {
		const target = event.target;
		// Находит карточку
		const item = target.closest('.cards__item');

		// Подробнее
		if (target.closest('.cards__more')) {
			// Менят заголовок модального окна на заголовок из карточки
			$('.popup__title', $('#popupMore')).text($('.cards__title', item).text());
			// Менят изображение модального окна на изображение из карточки
			popupImg.attr('src', $('.cards__img > img', item).attr('src'));
			// Вставляет описание из карточки
			$('.popup__desc-text').html($('.cards__desc-block').html());
			// Показывает дополнительное описание в модальном окне
			$('.cards__desc-hidden', '.popup__desc-block').css('display', 'block');

			openPopup('#popupMore');
			return;

		}

		// Купить в 1 клик
		if (target.closest('.cards__buy')) {

			// Менят заголовок модального окна на заголовок из карточки
			$('.popup__title', $('#popupBuyOneClick')).text('Купить ' + $('.cards__title', item).text().toLowerCase());
			// Менят изображение модального окна на изображение из карточки
			popupImg.attr('src', $('.cards__img > img', item).attr('src'));

			openPopup('#popupBuyOneClick');
			return;

		}

		// купить в 1 клик внутри попапа подробнее
		if (target.closest('.popup__buy')) {

			// Менят заголовок модального окна на заголовок из карточки
			// eslint-disable-next-line max-len
			$('.popup__title', $('#popupBuyOneClick')).text('Купить ' + $('.popup__title', $('#popupMore')).text().toLowerCase());

			$('#popupMore').css({
				display: 'none'
			});
			openPopup('#popupBuyOneClick');
			return;

		}

		// Добавление в корзину
		if (target.closest('.price-group__button-icon') || target.closest('.price-group__button')) {

			openPopup('#popupCartAdd');
			setTimeout(closePopup, 2000);
			return;
		}

		// Отзывы
		if (target.closest('.reviews-slider__more')) {
			const sliderItem = target.closest('.reviews-slider__item');
			$('.popup__content', '#reviewsId').html('<div class="reviews-slider__item"></div>');
			$('.reviews-slider__item', '.popup__content').replaceWith($(sliderItem).clone());
			openPopup('#popupReviews');
			return;
		}

		// Обратный звонок
		if (target.closest('.contacts__button') || target.closest('.navbar__button')) {
			openPopup('#popupCall');
			return;
		}

		// Закрыть
		if (!target.closest('.popup__wrap') || target.closest('.popup__close')) {
			target.closest('.loader') ? false : closePopup();
		}
	});
});
