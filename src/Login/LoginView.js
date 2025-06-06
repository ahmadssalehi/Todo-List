export class LoginView {
	constructor() {
		this.modal = document.querySelector('.login-modal');
		this.loginBtn = document.querySelector('.login-btn');
		this.closeBtn = document.querySelector('.close-login-btn');
		this.form = document.querySelector('.login-form');
		this.emailInput = document.querySelector('.email-input');
		this.passwordInput = document.querySelector('.password-input');
	}

	showModal() {
		this.modal.classList.remove('hidden');
	}

	hideModal() {
		this.modal.classList.add('hidden');
	}

	clearInputs() {
		this.emailInput.value = '';
		this.passwordInput.value = '';
	}

	bindOpenModal(handler) {
		this.loginBtn?.addEventListener('click', (e) => {
			e.stopPropagation();
			handler();
		});
	}

	bindCloseModal(handler) {
		this.closeBtn?.addEventListener('click', handler);
		this.modal?.addEventListener('click', (e) => {
			if (e.target === this.modal) handler();
		});
	}

	bindSubmit(handler) {
		this.form?.addEventListener('submit', (e) => {
			e.preventDefault();
			handler(this.emailInput.value.trim(), this.passwordInput.value.trim());
		});
	}
}
