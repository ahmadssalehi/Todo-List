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

			return `<div data-date="${dateKey}" class="border border-gray-300 rounded ${
				dayTasks.length ? 'bg-yellow-200' : 'bg-white'
			} hover:bg-yellow-100 cursor-pointer items-center justify-center flex flex-col">
			<div class="p-2 text-center rounded-lg  cursor-pointer">${day}</div>
			</div>
    `;
		}).join('');

		container.insertAdjacentHTML('beforeend', dayBoxes);
	}

	renderCalendarTasks(dateKey, tasks) {
		this.modalDate.textContent = dateKey.replaceAll('-', '/');
		if (!tasks.length) {
			this.taskList.innerHTML = `<li class="text-gray-500">No tasks</li>`;
		} else {
			this.taskList.innerHTML = tasks
				.map(function (task) {
					const completedCheck = `${
						task.completed ? 'line-through text-gray-400' : ''
					}`;
					return `
	      <li data-id= '${
					task.id
				}' class="flex items-center justify-between p-2 border-b border-gray-300 gap-2 py-1">
				<label class="relative inline-flex items-center cursor-pointer">
  <input
    type="checkbox"
    class="peer check appearance-none h-5 w-5 border-2 border-yellow-400 rounded checked:bg-yellow-500 checked:border-yellow-500 cursor-pointer" ${
			task.completed ? 'checked' : ''
		}
  />
  <svg
    class="absolute left-0 top-0 h-6 w-6 text-white pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity"
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
					${completedCheck}">${task.text}</span>
					<span class="text-gray-400 ${completedCheck}">${task.category}
					</span>
				</div>
	       <button class="text-red-500 hover:text-red-700 cursor-pointer" aria-label="Remove task">
							<i class="remove fas fa-trash"></i>
						</button>
	      </li>`;
				})
				.join('');
		}
		this.clearInput();
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
