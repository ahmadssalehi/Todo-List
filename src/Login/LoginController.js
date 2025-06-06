// src/controllers/LoginController.js
export class LoginController {
	constructor(view) {
		this.view = view;

		this.view.bindOpenModal(this.handleOpenModal.bind(this));
		this.view.bindCloseModal(this.handleCloseModal.bind(this));
		this.view.bindSubmit(this.handleLogin.bind(this));
	}

	handleOpenModal() {
		this.view.showModal();
	}

	handleCloseModal() {
		this.view.hideModal();
		this.view.clearInputs();
	}

	handleLogin(email, password) {
		console.log('Logging in with:', email, password);
		alert(`Welcome, ${email}!`);
		this.view.hideModal();
		this.view.clearInputs();
	}
}
