import { Model } from '/src/Model.js';
import { View } from '/src/View.js';
import { calendarView } from '/src/Calendar/CalendarView.js';
import { LoginView } from '/src/Login/LoginView.js';
import { LoginController } from '/src/Login/LoginController.js';

const loginView = new LoginView();
const loginController = new LoginController(loginView);

class calendarController {
	constructor(model, view) {
		this.model = model;
		this.view = view;

		this.currentDate = new Date();
		this.selectedDate = null;
		this.month = this.currentDate.getMonth();
		this.year = this.currentDate.getFullYear();

		this.view.calendarDays.addEventListener('click', (e) => {
			this.onDayClick(e);
		});
		this.view.addTaskBtn?.addEventListener('click', () => {
			this.onAddTask();
			this.view.clearInput();
		});
		this.view.taskList?.addEventListener('change', (e) => {
			if (e.target.classList.contains('check')) {
				this.onToggleTask(e);
			}
		});
		this.view.taskList?.addEventListener('click', (e) => { 
			if (e.target.classList.contains('remove')) {
				this.onRemoveTask(e);}})
		this.view.closeModalBtn?.addEventListener('click', () =>
			this.view.closeModal()
		);
		this.view.calendarModal.addEventListener('click', (e) => {
			if (e.target === this.view.calendarModal) this.view.closeModal();
		});
		document
			.querySelector('.prev-month')
			.addEventListener('click', () => this.monthController(-1));
		document
			.querySelector('.next-month')
			.addEventListener('click', () => this.monthController(1));
		this.view.setGetMonth(() => this.month);
		this.render();
	}
	render() {
		this.month === 0
			? this.view.hideBtns('prev-month')
			: this.view.showBtns('prev-month');

		this.month === 11
			? this.view.hideBtns('next-month')
			: this.view.showBtns('next-month');

		this.view.renderCalendar(this.currentDate, this.model.tasks);
		this.view.renderDayBoxes(
			this.view.calendarDays,
			this.view.daysInMonth(this.month),
			this.view.year,
			this.month,
			this.model.tasks
		);
	}

	monthController(offset = 0) {
		this.currentDate.setMonth(this.currentDate.getMonth() + offset);
		this.month = this.currentDate.getMonth();
		this.render();
		return this.month;
	}

	onDayClick(e) {
		const dayDiv = e.target.closest('[data-date]');
		if (!dayDiv) return;
		this.selectedDate = dayDiv.dataset.date;
		this.view.renderCalendarTasks(
			this.selectedDate,
			this.model.loadTasks(this.selectedDate)
		);
		this.view.openModal();
	}

	onAddTask() {
		const taskText = this.view.taskInput.value.trim();
		const taskCategory = this.view.taskCategory.value.trim();
		if (!taskText || !this.selectedDate || !taskCategory) return;
		const newTask = {
			id: Date.now().toString(),
			text: taskText,
			completed: false,
			category: taskCategory,
		};
		this.model.addTask(this.selectedDate, newTask);
		this.view.renderCalendarTasks(
			this.selectedDate,
			this.model.loadTasks(this.selectedDate)
		);
		this.render();
	}
	onToggleTask(e) {
		const id = e.target.closest('[data-id]').dataset.id;
		const dateKey = this.selectedDate;
		this.model.toggleTask(dateKey, id);
		const tasks = this.model.loadTasks(this.selectedDate);
		this.view.renderCalendarTasks(dateKey, tasks)
	}
	onRemoveTask(e) {
		if (!e.target.classList.contains('remove')) return;
		const id = e.target.closest('[data-id]').dataset.id;
		this.model.removeTask(this.selectedDate, id);
		this.view.renderCalendarTasks(
			this.selectedDate,
			this.model.loadTasks(this.selectedDate)
		);
		this.render();
	}
}
const view = new View();
const app = new calendarController(new Model(), new calendarView(view));
