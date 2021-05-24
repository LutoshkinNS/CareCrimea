self["webpackHotUpdate"]("main",{

/***/ "./modules/forms/submitForms.js":
/*!**************************************!*\
  !*** ./modules/forms/submitForms.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "../node_modules/jquery/dist/jquery.js");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _plugins_validator_validation_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../plugins/validator/validation.js */ "./plugins/validator/validation.js");
/* harmony import */ var _plugins_maskPhone_maskPhone_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../plugins/maskPhone/maskPhone.js */ "./plugins/maskPhone/maskPhone.js");
 // Валидация



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (jquery__WEBPACK_IMPORTED_MODULE_0__(function () {
  var loader = jquery__WEBPACK_IMPORTED_MODULE_0__('.loader'),
      body = jquery__WEBPACK_IMPORTED_MODULE_0__('body');
  var forms = jquery__WEBPACK_IMPORTED_MODULE_0__('form');
  forms.each(function (index, form) {
    (0,_plugins_maskPhone_maskPhone_js__WEBPACK_IMPORTED_MODULE_2__.default)('.form__phone', '+7(___)___-__-__');
    var valid = new _plugins_validator_validation_js__WEBPACK_IMPORTED_MODULE_1__.default({
      selector: "#".concat(form.id),
      pattern: {
        name: /^[А-яЁё]{2,}$/
      },
      method: {
        'address': [['notEmpty']],
        'name': [['notEmpty'], ['pattern', 'name']],
        'phone': [['notEmpty'], ['pattern', 'phone']],
        'email': [['notEmpty'], ['pattern', 'email']]
      }
    });
    valid.init();
    jquery__WEBPACK_IMPORTED_MODULE_0__(form).on('submit', function (event) {
      event.preventDefault();

      if (valid.error.size === 0) {
        // Блокирует прокрутку страницы
        body.addClass('lock'); // Добавляет лоадер

        loader.css('display', 'flex');
        var data = {};
        jquery__WEBPACK_IMPORTED_MODULE_0__('input', form).each(function (index, item) {
          data[jquery__WEBPACK_IMPORTED_MODULE_0__(item).attr('name')] = item.value;
        });

        if (form.id === 'cartForm') {
          var count = 0;
          jquery__WEBPACK_IMPORTED_MODULE_0__('.cart__set-content').each(function (index, item) {
            count = jquery__WEBPACK_IMPORTED_MODULE_0__('.cart__set-number', item).text().slice(1);

            if (jquery__WEBPACK_IMPORTED_MODULE_0__('.cart__set-name', item).text() in data) {
              count = +data[jquery__WEBPACK_IMPORTED_MODULE_0__('.cart__set-name', item).text()] + +count;
            }

            data[jquery__WEBPACK_IMPORTED_MODULE_0__('.cart__set-name', item).text()] = count;
          });
        }

        jquery__WEBPACK_IMPORTED_MODULE_0__.post('sendForm.php', data).done(function (response) {
          var popupThanks = jquery__WEBPACK_IMPORTED_MODULE_0__('#popupThanks');

          if (form.closest('.popup')) {
            var thisPopup = jquery__WEBPACK_IMPORTED_MODULE_0__(form.closest('.popup'));
            jquery__WEBPACK_IMPORTED_MODULE_0__(thisPopup).css('display', 'none');
            jquery__WEBPACK_IMPORTED_MODULE_0__('.popup__wrap', thisPopup).css('opacity', 0);
          } // Скрывает лоадер


          loader.css('display', 'none'); // Снимает блокировку прокрутки страницы

          body.removeClass('lock');
          popupThanks.css('display', 'block');
          jquery__WEBPACK_IMPORTED_MODULE_0__('.popup__wrap', popupThanks).css('opacity', 1);
          setTimeout(function () {
            popupThanks.css('display', 'none');
            jquery__WEBPACK_IMPORTED_MODULE_0__('.popup__wrap', popupThanks).css('opacity', 0);
          }, 2000);
          jquery__WEBPACK_IMPORTED_MODULE_0__('input', form).each(function (index, item) {
            if (item.type !== 'hidden') {
              item.value = '';
            }
          });
          console.log(response);
        }).fail(function (response) {
          console.warn(response.status + ' ' + response.statusText);
        });
      }
    });
  });
}));

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ "use strict";
/******/ 
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("faafa24b54f407966faf")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=main.05db0d04e36cbfe859e9.hot-update.js.map