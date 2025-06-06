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
		this.urlName = window.location.pathname;

		this.view.bindAdd(this.handleAdd);
		this.view.bindToggle(this.handleToggle);
		this.view.bindRemove(this.handleRemove);
		this.view.bindCategoryFocus(this.handleCategoryFocus);

		if (this.urlName.includes('index.html')) this.render();
		if (this.urlName.includes('allTasks.html')) this.renderAllTasks();

		this.hideSuggestionsController();
		this.setupSidebarEvents();
	}

	render = () => {
		const tasks = this.model.loadTasks(this.dateFormat());
		this.view.renderTasks(tasks);
	};

	renderAllTasks = () => {
		const tasks = this.model.loadAllTasks();
		Object.entries(tasks).forEach(([dateKey, tasks]) => {
			this.view.renderAllTasks(tasks);
		});
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
		this.model.addTask(this.dateFormat(), newTask);
		this.render();
	};

	handleToggle = (id) => {
		this.model.toggleTask(this.dateFormat(), id);
		this.render();
	};

	handleRemove = (id) => {
		this.model.removeTask(this.dateFormat(), id);
		this.render();
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
//
// const input = document.querySelector('.task-input');
// const addBtn = document.querySelector('.add-task-btn');
// const list = document.querySelector('.task-list');

// addBtn.onclick = () => {
// 	const val = input.value.trim();
// 	if (!val) return;

// 	const li = document.createElement('li');
// 	li.className = 'flex justify-between items-center bg-gray-100 p-2 rounded';
// 	li.innerHTML = `
//         <label class="flex items-center space-x-3">
//             <input type="checkbox" class="form-checkbox w-6 h-6 text-blue-600" />
//             <span class="text-lg">${val}</span>
//             </label>
//         <button class="remove-btn text-red-500 hover:text-red-700 ml-4 text-xl">❌</button>
//         `;

// 	list.appendChild(li);
// 	input.value = '';
// 	input.focus();
// };

// list.onclick = (e) => {
// 	if (e.target.classList.contains('remove-btn'))
// 		e.target.parentElement.remove();
// };
