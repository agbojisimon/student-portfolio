// Cache DOM elements
const taskInput = document.getElementById('task-input');
const taskCategory = document.getElementById('task-category');
const addTaskBtn = document.getElementById('add-task-btn');
const inputError = document.getElementById('input-error');
const taskList = document.getElementById('task-list');
const emptyMessage = document.getElementById('empty-message');
const completedList = document.getElementById('completed-list');
const completedSection = document.getElementById('completed-section');

// tasks array holds task objects: { id, text, category, completed }
let tasks = [];

function saveTasks() {
  localStorage.setItem('planner_tasks', JSON.stringify(tasks));
}

function addTask() {
  const text = taskInput.value.trim();
  const category = taskCategory.value;
  if (text === '') {
    inputError.textContent = 'Task description cannot be empty.';
    return;
  }
  inputError.textContent = '';
  const task = {
    id: Date.now(),
    text: text,
    category: category,
    completed: false
  };
  tasks.push(task);
  taskInput.value = '';
  renderTasks();
  saveTasks();
}

function renderTasks() {
  const pending = tasks.filter(t => !t.completed);
  const completed = tasks.filter(t => t.completed);

  taskList.innerHTML = '';
  completedList.innerHTML = '';

  if (pending.length === 0) {
    emptyMessage.hidden = false;
  } else {
    emptyMessage.hidden = true;
  }

  pending.forEach(task => {
    taskList.appendChild(createTaskElement(task));
  });

  completed.forEach(task => {
    completedList.appendChild(createTaskElement(task));
  });

  completedSection.hidden = completed.length === 0;
}

function createTaskElement(task) {
  const li = document.createElement('li');
  li.setAttribute('data-id', task.id);
  if (task.completed) {
    li.classList.add('completed');
  }
  const span = document.createElement('span');
  span.textContent = task.text + ' ';
  const small = document.createElement('small');
  small.textContent = '(' + task.category + ')';
  span.appendChild(small);
  li.appendChild(span);
  const completeBtn = document.createElement('button');
  completeBtn.className = 'complete-btn';
  completeBtn.textContent = task.completed ? 'Mark Incomplete' : 'Mark Complete';
  completeBtn.onclick = function() { toggleComplete(task.id); };
  li.appendChild(completeBtn);
  const deleteBtn = document.createElement('button');
  deleteBtn.className = 'delete-btn';
  deleteBtn.textContent = 'Delete';
  deleteBtn.onclick = function() { deleteTask(task.id); };
  li.appendChild(deleteBtn);
  return li;
}

function toggleComplete(id) {
  const task = tasks.find(t => t.id === id);
  if (!task) return;
  task.completed = !task.completed;
  renderTasks();
  saveTasks();
}

function deleteTask(id) {
  const remaining = tasks.filter(t => t.id !== id);
  tasks.length = 0;
  remaining.forEach(t => tasks.push(t));
  renderTasks();
  saveTasks();
}

// Load tasks from localStorage on page load
(function loadTasks() {
  const stored = localStorage.getItem('planner_tasks');
  if (stored) {
    try {
      tasks = JSON.parse(stored);
    } catch (e) {
      tasks = [];
    }
  }
  renderTasks();
})();

addTaskBtn.addEventListener('click', addTask);

taskInput.addEventListener('keydown', function(e) {
  if (e.key === 'Enter') {
    e.preventDefault();
    addTask();
  }
});
