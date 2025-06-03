const navBtn = document.querySelector('.nav-btn');
const sidebar = document.querySelector('.sidebar');
const input = document.querySelector('.task-input');
const addBtn = document.querySelector('.add-task-btn');
const list = document.querySelector('.task-list');

navBtn.addEventListener('click', (e) => {
	sidebar.classList.toggle('-translate-x-full');
	sidebar.classList.toggle('translate-x-0');
	backdrop.classList.toggle('hidden');
	e.stopPropagation();
});

sidebar.onclick = (e) => e.stopPropagation();

document.onclick = ({ target }) => {
	const sidebarOpen = sidebar.classList.contains('translate-x-0');
	const clickedInsideSidebarOrBtn =
		target.closest('.sidebar') || target.closest('.navBtn');

	if (sidebarOpen && !clickedInsideSidebarOrBtn) {
		sidebar.classList.add('-translate-x-full');
		sidebar.classList.remove('translate-x-0');
		backdrop.classList.add('hidden');
	}
};

addBtn.onclick = () => {
	const val = input.value.trim();
	if (!val) return;

	const li = document.createElement('li');
	li.className = 'flex justify-between items-center bg-gray-100 p-2 rounded';
	li.innerHTML = `
        <label class="flex items-center space-x-3">
            <input type="checkbox" class="form-checkbox w-6 h-6 text-blue-600" />
            <span class="text-lg">${val}</span>
            </label>
        <button class="remove-btn text-red-500 hover:text-red-700 ml-4 text-xl">❌</button>
        `;

	list.appendChild(li);
	input.value = '';
	input.focus();
};

list.onclick = (e) => {
	if (e.target.classList.contains('remove-btn'))
		e.target.parentElement.remove();
};
