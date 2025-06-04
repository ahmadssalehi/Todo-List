export class View {
	constructor() {
		this.taskInput = document.querySelector('.task-input');
		this.taskList = document.querySelector('.task-list');
		this.addBtn = document.querySelector('.add-btn');
	}

	getTaskText() {
		return this.taskInput.value.trim();
	}

	clearInput() {
		this.taskInput.value = '';
	}

	renderTasks(tasks) {
		this.taskList.innerHTML = '';
		tasks.forEach((task) => this.addTaskToDOM(task));
	}

	addTaskToDOM({ id, text, completed }) {
		const item = document.createElement('div');
		item.className = 'flex items-center justify-between p-2 border-b gap-2';
		item.dataset.id = id;
		item.innerHTML = `
                <input type="checkbox" class="check" ${
									completed ? 'checked' : ''
								}>
                <span class="flex-1 ${
									completed ? 'line-through text-gray-400' : ''
								}">${text}</span>
                <button class="remove text-red-500">&times;</button>
    `;
		this.taskList.appendChild(item);
	}

	bindAdd(handler) {
		this.addBtn.addEventListener('click', () => {
			const text = this.getTaskText();
			if (!text) return;
			handler(text);
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
}
