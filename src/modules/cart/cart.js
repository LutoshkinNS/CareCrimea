import * as $ from 'jquery';

export default $(() => {
	let count = 1,
		numberOfGoods = 0,
		sumPrice = 0;

	const addSetInNav = thisCard => {
		++count;
		$('.price-group__count-set', thisCard).text(count);
	};

	const removeSetInNav = thisCard => {
		--count;
		$('.price-group__count-set', thisCard).text(count);
	};

	const isOneItem = () => {
		// eslint-disable-next-line max-len
		$('.cart__item').length > 1 ? $('.cart__item:first-child').addClass('hidden') : $('.cart__item:first-child').removeClass('hidden');
	};

	const addResultSumm = sum => {
		$('.cart__result-summ').text(sum);
	};

	const addSet = (thisCard, target = '.cards') => {
		//Получает стоимость набора из карточки
		const priceSet = $('.price-group__price', thisCard).text().match(/\d*/);

		// Добавляет количество наборов в корзине
		$('.navbar__cart-count').css('display', 'block').text(++numberOfGoods);
		// Создает набор
		const set = `
				<li class="cart__item">
					<img src="${$(target + '__img > img', thisCard).attr('src')}" alt="" class="cart__set-img">
					<div class="cart__set-content">
						<p class="cart__set-name">${$(target + '__title', thisCard).text()}</p>
						<span class="cart__set-number">x${count}</span>
						<div class="cart__elements-wrap">
							<span class="cart__set-price">${count * priceSet} руб.</span>
							<span class="cart__set-close">x</span>
						</div>
					</div>
				</li>
			`;

		// Итоговая сумма
		sumPrice += count * priceSet;
		addResultSumm(sumPrice);

		// Добавляет набор в блок КОРЗИНА
		$('.cart__list').append(set);
	};

	const removeSet = target => {

		const setItem = target.closest('.cart__item');
		sumPrice -= $('.cart__set-price', setItem).text().match(/\d*/);
		addResultSumm(sumPrice);

		target.closest('.cart__item').remove();
	};

	$(document).on('click', event => {

		const target = event.target;
		let thisCard = target.closest('.cards__item');

		if (target.closest('.price-group__pros')) {
			addSetInNav(thisCard);
			return;
		}

		if (target.closest('.price-group__cons') && count > 1) {
			removeSetInNav(thisCard);
			return;
		}

		if (target.closest('.price-group__button-icon') || target.closest('.price-group__button')) {
			if (target.closest('.popup')) {
				thisCard = target.closest('.popup');
				addSet(thisCard, '.popup');
				isOneItem();
				return;
			}
			addSet(thisCard);
			isOneItem();
			return;
		}

		if (target.closest('.cart__set-close')) {
			removeSet(target);
			isOneItem();
			return;
		}

	});
});
