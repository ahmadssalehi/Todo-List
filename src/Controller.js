import { Model } from '/src/model.js';
import { View } from '/src/view.js';
import { LoginView } from '/src/Login/LoginView.js';
import { LoginController } from '/src/Login/LoginController.js';

const loginView = new LoginView();
const loginController = new LoginController(loginView);

export class Controller {
	constructor() {
		this.model = new Model();
		this.view = new View();
		this.dateKey;

		this.view.bindAdd(this.handleAdd);
		this.view.bindToggle(this.handleToggle);
		this.view.bindRemove(this.handleRemove);
		this.view.bindCategoryFocus(this.handleCategoryFocus);

		this.hideSuggestionsController();
		this.setupSidebarEvents();

		this.renderCurrentView();
	}

	renderCurrentView() {
		if (this.isHomePage()) {
			this.dateKey = this.view.dateFormat();
			this.render();
		} else {
			this.renderAllTasks();
		}
	}

	isHomePage() {
		return document.title === 'TodoListApp';
	}

	render = () => {
		const tasks = this.model.loadTasks(this.dateKey);
		this.view.renderTasks(tasks, this.dateKey);
	};

	renderAllTasks = () => {
		const tasks = this.model.loadAllTasks();
		this.view.renderAllTasks(tasks);
	};

	handleAdd = (text, category) => {
		const newTask = {
			id: crypto.randomUUID?.() || Date.now().toString(),
			text,
			completed: false,
			category,
		};
		this.model.addTask(this.dateKey, newTask);
		this.renderCurrentView();
	};

	handleToggle = (dateKey, id) => {
		this.model.toggleTask(dateKey, id);
		this.renderCurrentView();
	};

	handleRemove = (dateKey, id) => {
		this.model.removeTask(dateKey, id);
		this.renderCurrentView();
	};

	handleCategoryFocus = () => {
		const categories = this.model.getAllCategories();
		this.view.renderCategorySuggestions(categories);
	};

	setupSidebarEvents = () => {
		this.view.bindToggleSidebar(this.handleOutsideSidebarClick);
	};

	handleOutsideSidebarClick = ({ target }) => {
		const clickedInside =
			target.closest('.sidebar') || target.closest('.nav-btn');
		if (this.view.isSidebarOpen() && !clickedInside) {
			this.view.closeSidebar();
		}
	};

	hideSuggestionsController = () => {
		document.addEventListener('click', (e) => {
			const clickedInsideInput = e.target.closest('.task-category');
			const clickedInsideSuggestions = e.target.closest(
				'.category-suggestions'
			);

			if (!clickedInsideInput && !clickedInsideSuggestions) {
				this.view.hideSuggestions();
			}
		});
	};
}

new Controller();
