export default class Validator {
	constructor({ selector, pattern = {}, method }) {
		this.form = document.querySelector(selector);
		this.buttonSubmit = this.form.querySelector('button[type="submit"]');
		this.pattern = pattern;
		this.method = method;
		// eslint-disable-next-line arrow-body-style
		this.elementsForm = [...this.form.elements].filter(item => {
			return item.tagName.toLowerCase() !== 'button' && item.type !== 'button' && item.type !== 'hidden';
		});
		this.error = new Set();
	}

	init() {
		this.setPattern();
		this.elementsForm.forEach(elem => elem.addEventListener('input', this.checkIt.bind(this)));
		this.form.addEventListener('submit', () => {
			this.elementsForm.forEach(elem => this.checkIt({ target: elem }));
		});
	}

	isValid(elem) {
		const validatorMethod = {
			notEmpty(elem) {
				if (elem.value.trim() === '') {
					return false;
				}
				return true;
			},
			pattern(elem, pattern) {
				return pattern.test(elem.value);
			}
		};

		if (this.method) {
			const method = this.method[elem.name];

			if (method) {
				return method.every(item => validatorMethod[item[0]](elem, this.pattern[item[1]]));
			}
		} else {
			console.warn('Необходимо передать селектор полей ввода и методы проверки этих полей');
		}

		return true;
	}

	checkIt(event) {
		const target = event.target;
		if (this.isValid(target)) {
			this.showSuccess(target);
			this.error.delete(target);
		} else {
			this.showError(target);
			this.error.add(target);
		}
		this.disableSend();
	}

	disableSend() {
		if (this.error.size) {
			this.buttonSubmit.disabled = true;
		} else {
			this.buttonSubmit.disabled = false;
		}
	}

	showError(elem) {
		elem.classList.remove('success');
		elem.classList.add('error');
		if (elem.nextElementSibling && elem.nextElementSibling.classList.contains('error-message')) {
			if (elem.value === '') {
				elem.nextElementSibling.textContent = 'Заполните это поле';
			} else {
				elem.nextElementSibling.textContent = 'Ошибка в этом поле';
			}
			return;
		}
		const errorDiv = document.createElement('div');
		if (elem.value === '') {
			errorDiv.textContent = 'Заполните это поле';
		} else {
			errorDiv.textContent = 'Ошибка в этом поле';
		}
		errorDiv.classList.add('error-message');
		elem.insertAdjacentElement('afterend', errorDiv);
	}

	showSuccess(elem) {
		elem.classList.remove('error');
		elem.classList.add('success');
		if (elem.nextElementSibling && elem.nextElementSibling.classList.contains('error-message')) {
			elem.nextElementSibling.remove();
		}
	}

	setPattern() {

		if (!this.pattern.phone) {
			this.pattern.phone = /^\+?[78]([-()]*\d){10,}$/;
		}

		if (!this.pattern.email) {
			this.pattern.email = /^\w+@\w\.\w{2,}$/;
		}

		if (!this.pattern.name) {
			this.pattern.name = /^[А-яЁё]{2,}$/;
		}

	}
}



