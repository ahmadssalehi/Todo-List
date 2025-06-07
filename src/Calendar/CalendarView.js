export class calendarView {
	constructor() {
		this.monthNames = [
			'January',
			'February',
			'March',
			'April',
			'May',
			'June',
			'July',
			'August',
			'September',
			'October',
			'November',
			'December',
		];
		this.date = new Date();
		this.year = this.date.getFullYear();
		this.day = this.date.getDate();
		this.calendarTitle = document.querySelector('.calendar-title');
		this.calendarDays = document.querySelector('.calendar-days');
		this.calendarModal = document.querySelector('.calendar-modal');
		this.modalDate = document.querySelector('.modal-date');
		this.taskList = document.querySelector('.modal-task-list');
		this.taskInput = document.querySelector('.modal-task-input');
		this.taskCategory = document.querySelector('.modal-task-category');
		this.addTaskBtn = document.querySelector('.add-task-btn');
		this.closeModalBtn = document.querySelector('.close-modal');
		this.prevMonth = document.querySelector('.prev-month');
		this.nextMonth = document.querySelector('.next-month');
	}

	clearInput() {
		this.taskInput.value = '';
		this.taskCategory.value = '';
	}

	setGetMonth(callback) {
		this.getMonth = callback;
	}

	daysInMonth(month) {
		return new Date(this.year, month + 1, 0).getDate();
	}

	dateFormat(year, month, day) {
		return `${year}-${String(month + 1).padStart(2, '0')}-${String(
			day
		).padStart(2, '0')}`;
	}

	renderCalendar() {
		const month = this.getMonth();
		const startDay = new Date(this.year, month, 1).getDay();
		this.calendarTitle.textContent = `${this.monthNames[month]} ${this.year}`;
		this.calendarDays.innerHTML = '';
		const emptyCell = `<div class="h-9 border border-gray-300 rounded bg-gray-50 invisible"></div>`;
		this.calendarDays.insertAdjacentHTML(
			'beforeend',
			Array(startDay).fill(emptyCell).join('')
		);
	}

	renderDayBoxes(container, daysInMonth, year, month, tasks) {
		const dayBoxes = Array.from({ length: daysInMonth }, (_, i) => {
			const day = i + 1;
			const dateKey = this.dateFormat(year, month, day);
			const dayTasks = tasks[dateKey] || [];
			const taskCount = dayTasks.length
				? `<span class="bg-gray-400 text-gray-100 text-xs px-1  rounded max-w-full">${dayTasks.length}</span>`
				: '';

			return `<div data-date="${dateKey}" class="h-9 w-9 border border-gray-300 rounded bg-white hover:bg-yellow-100 cursor-pointer items-center justify-center flex flex-col">
        	<div class="text-xs text-gray-400">${day}</div>
			${taskCount}
			</div>
    `;
		}).join('');

		container.insertAdjacentHTML('beforeend', dayBoxes);
	}

	renderCalendarTasks(dateKey, tasks) {
		this.modalDate.textContent = dateKey;
		if (!tasks.length) {
			this.taskList.innerHTML = `<li class="text-gray-500">No tasks</li>`;
		} else {
			this.taskList.innerHTML = tasks
				.map(
					(task) => `
	      <li data-id= '${
					task.id
				}' class="flex items-center justify-between p-2 border-b border-gray-300 gap-2 py-1">
		  	<input type="checkbox" class="check" ${task.completed ? 'checked' : ''}>
				<div class="flex justify-between w-full">
					<span class="flex-1 ${task.completed ? 'line-through text-gray-400' : ''}">${
						task.text
					}</span>
					<span class="text-gray-400">${task.category}
					</span>
				</div>
	        <button class="remove text-red-500 hover:text-red-700">&times;</button>
	      </li>`
				)
				.join('');
		}
		this.taskInput.value = '';
	}

	hideBtns(btn) {
		if (btn === 'prev-month') {
			this.prevMonth.classList.add('invisible');
		} else {
			this.nextMonth.classList.add('invisible');
		}
	}

	showBtns(btn) {
		if (btn === 'prev-month') {
			this.prevMonth.classList.remove('invisible');
		} else {
			this.nextMonth.classList.remove('invisible');
		}
	}

	openModal() {
		this.calendarModal.classList.remove('hidden');
	}

	closeModal() {
		this.calendarModal.classList.add('hidden');
	}

	bindHandleCalendarModal() {
		this.closeModalBtn?.addEventListener('click', () => this.closeModal());
		this.calendarModal.addEventListener('click', (e) => {
			if (e.target === this.calendarModal) this.closeModal();
		});
	}

	bindMonthChangeBtn(handler) {
		this.prevMonth.addEventListener('click', () => handler(-1));
		this.nextMonth.addEventListener('click', () => handler(1));
	}

	bindDayClick(handler) {
		this.calendarDays.addEventListener('click', (e) => {
			handler(e);
		});
	}

	bindAddTask(handler) {
		this.addTaskBtn?.addEventListener('click', () => {
			handler();
			this.clearInput();
		});
	}

	bindToggleTask(handler) {
		this.taskList?.addEventListener('change', (e) => {
			if (e.target.classList.contains('check')) {
				handler(e);
			}
		});
	}

	bindRemoveTask(handler) {
		this.taskList?.addEventListener('click', (e) => {
			if (e.target.classList.contains('remove')) {
				handler(e);
			}
		});
	}
}
