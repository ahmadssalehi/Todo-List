const STORAGE_KEY = 'tasks';

export const loadTasks = () =>
	JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');

export const saveTasks = (tasks) =>
	localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));

export const addTask = (task) => {
	const tasks = loadTasks();
	tasks.push(task);
	saveTasks(tasks);
};

export const removeTask = (id) => {
	let tasks = loadTasks();
	tasks = tasks.filter((task) => task.id !== id);
	saveTasks(tasks);
};

export const toggleTask = (id) => {
	let tasks = loadTasks();
	tasks = tasks.map((task) =>
		task.id === id ? { ...task, completed: !task.completed } : task
	);
	saveTasks(tasks);
};
