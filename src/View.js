export class View {
	constructor() {
		this.taskInput = document.querySelector('.task-input');
		this.taskCategory = document.querySelector('.task-category');
		this.suggestionsBox = document.querySelector('.category-suggestions');
		this.taskList = document.querySelector('.task-list');
		this.addBtn = document.querySelector('.add-btn');
		this.navBtn = document.querySelector('.nav-btn');
		this.sidebar = document.querySelector('.sidebar');
		this.backdrop = document.querySelector('.backdrop');
	}
	
	dateFormat() {
		const date = new Date();
		const year = date.getFullYear();
		const month = date.getMonth() + 1;
		const day = date.getDate();
		return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(
			2,
			'0'
		)}`;
	}

	getTask() {
		return [this.taskInput.value.trim(), this.taskCategory.value.trim()];
	}

	clearInput() {
		this.taskInput.value = '';
		this.taskCategory.value = '';
	}

	renderTasks(tasks, dateKey) {
		this.taskList && (this.taskList.innerHTML = '');
		tasks.forEach((task) => {
			this.addTaskToDOM(task, dateKey);
		});
	}

	renderAllTasks(tasks) {
		this.taskList && (this.taskList.innerHTML = '');
		Object.entries(tasks).forEach(([dateKey, tasks]) => {
			tasks.forEach((task) => {
				this.addTaskToDOM(task, dateKey);
			});
		});
	}

	addTaskToDOM({ id, text, category, completed }, dateKey) {
		const item = document.createElement('div');
		item.className =
			'task flex p-2 border-b border-gray-300 gap-2 items-center';
		item.dataset.id = id;
		item.dataset.date = dateKey;
		const completedCheck = `${completed ? 'line-through text-gray-400' : ''}`;
		item.innerHTML = `
						<label class="relative inline-flex items-center cursor-pointer">
    						<input
								type="checkbox"
    							class="peer check appearance-none h-5 w-5 border-2 border-yellow-400 rounded checked:bg-yellow-500 						checked:border-yellow-500 cursor-pointer" ${
									completed ? 'checked' : ''
								}
    						/>
    						<svg
    							class="absolute left-0 top-0 h-6 w-6 text-white pointer-events-none opacity-0 peer-checked:opacity-100 						transition-opacity"
    							viewBox="0 0 24 24"
    							fill="none"
    							stroke="currentColor"
    							stroke-width="3"
    							stroke-linecap="round"
    							stroke-linejoin="round"
   						 	>
    							<polyline points="20 6 9 17 4 12" />
							</svg>
						</label>

						<div class="flex justify-between items-center w-full gap-2">
							<span class="flex-1 
								${completedCheck}">${text}
							</span>
							<span class="text-gray-400 text-sm pt-[1px] ${completedCheck}">${
								dateKey === this.dateFormat() ? 'Today' : dateKey.replaceAll('-', '/')}
							</span>
							<span class="text-gray-400 ${completedCheck}">${category}
							</span>
						</div>
						<button class="text-red-500 hover:text-red-700 cursor-pointer" aria-label="Remove task">
							<i class="remove fas fa-trash"></i>
						</button>
    `;
		this.taskList?.appendChild(item);
	}

	bindCategoryFocus(handler) {
		this.taskCategory?.addEventListener('focus', handler);
		this.taskCategory?.addEventListener('input', handler);
	}

	renderCategorySuggestions(categories) {
		if (!categories.length) {
			this.hideSuggestions();
			return;
		}

		this.suggestionsBox.innerHTML = '';
		categories.forEach((cat) => {
			const btn = document.createElement('button');
			btn.textContent = cat;
			btn.className =
				'block w-full text-left px-2 py-1 hover:bg-yellow-100 text-sm cursor-pointer rounded';
			btn.addEventListener('click', () => {
				this.taskCategory.value = cat;
				this.hideSuggestions();
			});
			this.suggestionsBox.appendChild(btn);
		});
		this.suggestionsBox.classList.remove('opacity-0', 'invisible');
		this.suggestionsBox.classList.add('opacity-100', 'visible');
	}

	hideSuggestions() {
		this.suggestionsBox?.classList.remove('opacity-100', 'visible');
		this.suggestionsBox?.classList.add('opacity-0', 'invisible');
	}

	bindAdd(handler) {
		this.addBtn?.addEventListener('click', () => {
			const [text, category] = this.getTask();
			if (!text || !category) return;
			handler(text, category);
			this.clearInput();
		});
	}

	bindToggle(handler) {
		this.taskList?.addEventListener('change', (e) => {
			if (e.target.classList.contains('check')) {
				const item = e.target.closest('[data-id]');
				const { id, date: dateKey } = item.dataset;
				handler(dateKey, id);
			}
		});
	}

	bindRemove(handler) {
		this.taskList?.addEventListener('click', (e) => {
			if (e.target.classList.contains('remove')) {
				const id = e.target.closest('[data-id]').dataset.id;
				const dateKey = e.target.closest('[data-date]').dataset.date;
				handler(dateKey, id);
			}
		});
	}

	bindToggleSidebar(handler) {
		this.navBtn.addEventListener('click', (e) => {
			this.toggleSidebar();
			e.stopPropagation();
		});
		this.sidebar.addEventListener('click', (e) => e.stopPropagation());

		document.addEventListener('click', (e) => {
			handler(e);
		});
	}

	toggleSidebar() {
		this.sidebar.classList.toggle('-translate-x-full');
		this.sidebar.classList.toggle('translate-x-0');
		this.backdrop.classList.toggle('hidden');
		this.navBtn.classList.toggle('hidden');
	}

	closeSidebar() {
		this.sidebar.classList.add('-translate-x-full');
		this.sidebar.classList.remove('translate-x-0');
		this.backdrop.classList.add('hidden');
		this.navBtn.classList.remove('hidden');
	}

	isSidebarOpen() {
		return this.sidebar.classList.contains('translate-x-0');
	}
}
