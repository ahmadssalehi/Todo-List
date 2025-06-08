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
		this.checkPageAndRender();
	}

	checkPageAndRender() {
		if (document.title === 'TodoListApp') {
			this.dateKey = this.dateFormat();
			this.render();
		} else {
			this.renderAllTasks();
		}
	}

	render = () => {
		const tasks = this.model.loadTasks(this.dateKey);
		this.view.renderTasks(tasks, this.dateKey);
	};

	renderAllTasks = () => {
		const tasks = this.model.loadAllTasks();
		this.view.renderAllTasks(tasks);
	};

	dateFormat() {
		const date = new Date();
		const year = date.getFullYear();
		const month = date.getMonth();
		const day = date.getDate();
		return `${year}-${String(month + 1).padStart(2, '0')}-${String(
			day
		).padStart(2, '0')}`;
	}

	handleAdd = (text, category) => {
		const newTask = {
			id: Date.now().toString(),
			text,
			completed: false,
			category,
		};
		this.model.addTask(this.dateKey, newTask);
		this.checkPageAndRender();
	};

	handleToggle = (dateKey, id) => {
		this.model.toggleTask(dateKey, id);
		this.checkPageAndRender();
	};

	handleRemove = (dateKey, id) => {
		this.model.removeTask(dateKey, id);
		this.checkPageAndRender();
	};

	handleCategoryFocus = () => {
		const tasks = this.model.loadTasks();
		const categories = [
			...new Set(tasks.map((task) => task.category).filter(Boolean)),
		];
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