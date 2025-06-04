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

	getTask() {
		return [this.taskInput.value.trim(), this.taskCategory.value.trim()];
	}

	clearInput() {
		this.taskInput.value = '';
		this.taskCategory.value = '';
	}

	renderTasks(tasks) {
		this.taskList.innerHTML = '';
		tasks.forEach((task) => this.addTaskToDOM(task));
	}

	addTaskToDOM({ id, text, category, completed }) {
		const item = document.createElement('div');
		item.className = 'flex items-center justify-between p-2 border-b gap-2';
		item.dataset.id = id;
		item.innerHTML = `
                <input type="checkbox" class="check" ${
									completed ? 'checked' : ''
								}>
				<div class="flex justify-between w-full">
					<span class="flex-1 ${
						completed ? 'line-through text-gray-400' : ''
					}">${text}</span>
					<span class="text-gray-400">${category}
					</span>
				</div>
                <button class="remove text-red-500">&times;</button>
    `;
		this.taskList.appendChild(item);
	}

	bindCategoryFocus(handler) {
		this.taskCategory.addEventListener('focus', handler);
		this.taskCategory.addEventListener('input', handler);
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
				'block w-full text-left px-2 py-1 hover:bg-gray-100 text-sm';
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
		this.suggestionsBox.classList.remove('opacity-100', 'visible');
		this.suggestionsBox.classList.add('opacity-0', 'invisible');
	}

	bindAdd(handler) {
		this.addBtn.addEventListener('click', () => {
			const [text, category] = this.getTask();
			if (!text || !category) return;
			handler(text, category);
			this.clearInput();
		});
	}

	bindToggle(handler) {
		this.taskList.addEventListener('change', (e) => {
			if (e.target.classList.contains('check')) {
				const id = e.target.closest('[data-id]').dataset.id;
				handler(id);
			}
		});
	}

	bindRemove(handler) {
		this.taskList.addEventListener('click', (e) => {
			if (e.target.classList.contains('remove')) {
				const id = e.target.closest('[data-id]').dataset.id;
				handler(id);
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
	}

	closeSidebar() {
		this.sidebar.classList.add('-translate-x-full');
		this.sidebar.classList.remove('translate-x-0');
		this.backdrop.classList.add('hidden');
	}

	isSidebarOpen() {
		return this.sidebar.classList.contains('translate-x-0');
	}
}
