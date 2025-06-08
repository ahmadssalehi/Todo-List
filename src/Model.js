export class Model {
	constructor(storageKey = 'tasks') {
		this.storageKey = storageKey;
		this.tasks = JSON.parse(localStorage.getItem(this.storageKey) || '{}');
	}

	saveTask() {
		localStorage.setItem(this.storageKey, JSON.stringify(this.tasks));
	}

	loadTasks(dateKey) {
		return this.tasks[dateKey] || [];
	}

	loadAllTasks() {
		return this.tasks;
	}

	addTask(dateKey, task) {
		if (!this.tasks[dateKey]) this.tasks[dateKey] = [];
		this.tasks[dateKey].push(task);
		this.saveTask();
	}

	removeTask(dateKey, id) {
		if (!this.tasks[dateKey]) return;
		this.tasks[dateKey] = this.tasks[dateKey].filter((task) => task.id !== id);
		if (this.tasks[dateKey].length === 0) delete this.tasks[dateKey];
		this.saveTask();
	}

	toggleTask(dateKey, id) {
		if (!this.tasks[dateKey]) return;
		this.tasks[dateKey] = this.tasks[dateKey].map((task) =>
			task.id === id ? { ...task, completed: !task.completed } : task
		);
		this.saveTask();
	}

	updateTask(dateKey, id, updates) {
		if (!this.tasks[dateKey]) return;
		this.tasks[dateKey] = this.tasks[dateKey].map((task) =>
			task.id === id ? { ...task, ...updates } : task
		);
		this.saveTask();
	}
}
