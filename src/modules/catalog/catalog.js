import * as $ from 'jquery';
import 'slick-carousel';

export default $(() => {
	// Tabs
	$('.tabs__list').on('click', 'a', function(event) {
		event.preventDefault();

		$('a.active', '.tabs__list').removeClass('active');
		$(this).addClass('active');

		const tabName = $(this).data('tab'),
			tab = $('.js-tab-content[data-tab="' + tabName + '"]');

		$('.js-tab-content.active').removeClass('active');
		tab.addClass('active');
	});

});
