import * as Model from '/src/model.js';
import { View } from '/src/view.js';

export class Controller {
	constructor() {
		this.model = Model;
		this.view = new View();
		this.navBtn = document.querySelector('.nav-btn');
		this.sidebar = document.querySelector('.sidebar');
		this.backdrop = document.querySelector('.backdrop');

		this.view.bindAdd(this.handleAdd);
		this.view.bindToggle(this.handleToggle);
		this.view.bindRemove(this.handleRemove);

		this.render();
		this.navController();
	}

	navController = () => {
		this.navBtn.addEventListener('click', (e) => {
			this.sidebar.classList.toggle('-translate-x-full');
			this.sidebar.classList.toggle('translate-x-0');
			this.backdrop.classList.toggle('hidden');
			e.stopPropagation();
		});

		this.sidebar.onclick = (e) => e.stopPropagation();

		document.onclick = ({ target }) => {
			const sidebarOpen = this.sidebar.classList.contains('translate-x-0');
			const clickedInsideSidebarOrBtn =
				target.closest('.sidebar') || target.closest('.nav-btn');

			if (sidebarOpen && !clickedInsideSidebarOrBtn) {
				this.sidebar.classList.add('-translate-x-full');
				this.sidebar.classList.remove('translate-x-0');
				this.backdrop.classList.add('hidden');
			}
		};
	};

	render = () => {
		const tasks = this.model.loadTasks();
		this.view.renderTasks(tasks);
	};

	handleAdd = (text) => {
		const newTask = {
			id: Date.now().toString(),
			text,
			completed: false,
			date: new Date().toISOString(),
			category: 'general',
		};
		this.model.addTask(newTask);
		this.render();
	};

	handleToggle = (id) => {
		this.model.toggleTask(id);
		this.render();
	};

	handleRemove = (id) => {
		this.model.removeTask(id);
		this.render();
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
