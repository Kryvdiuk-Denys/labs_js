const createTodo = (text) => ({
  id: Date.now().toString(),
  text: text.trim(),
  completed: false,
  dateAdded: new Date(),
  dateUpdated: new Date()
});

const updateTodoText = (todo, newText) => ({
  ...todo,
  text: newText.trim(),
  dateUpdated: new Date()
});

const toggleTodo = (todo) => ({
  ...todo,
  completed: !todo.completed,
  dateUpdated: new Date()
});

const sortByDateAdded = (todos) => [...todos].sort((a, b) => a.dateAdded - b.dateAdded);
const sortByStatus = (todos) => [...todos].sort((a, b) => a.completed - b.completed);
const sortByDateUpdated = (todos) => [...todos].sort((a, b) => b.dateUpdated - a.dateUpdated);


const createTodoElement = (todo, onToggle, onEdit, onDelete) => {
  const li = document.createElement('li');
  li.className = `todo-item ${todo.completed ? 'todo-item--completed' : ''}`;
  li.dataset.id = todo.id;

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.className = 'todo-item__checkbox';
  checkbox.checked = todo.completed;
  checkbox.addEventListener('change', () => onToggle(todo.id));

  const textInput = document.createElement('input');
  textInput.type = 'text';
  textInput.className = 'todo-item__text';
  textInput.value = todo.text;
  textInput.addEventListener('blur', (e) => onEdit(todo.id, e.target.value));
  textInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.target.blur();
    }
  });

  const deleteBtn = document.createElement('button');
  deleteBtn.className = 'todo-item__delete';
  deleteBtn.textContent = 'Видалити';
  deleteBtn.addEventListener('click', () => onDelete(todo.id));

  li.appendChild(checkbox);
  li.appendChild(textInput);
  li.appendChild(deleteBtn);

  return li;
};

const renderTodos = (todos, container, onToggle, onEdit, onDelete) => {
  container.innerHTML = '';
  todos.forEach(todo => {
    const element = createTodoElement(todo, onToggle, onEdit, onDelete);
    container.appendChild(element);
  });
};

let todos = [];
let currentSort = null;

const refs = {
  todoForm: document.getElementById('todoForm'),
  taskInput: document.getElementById('taskInput'),
  todoList: document.getElementById('todoList'),
  sortButtons: document.querySelectorAll('.todo-sort__button')
};

const handleAddTodo = (e) => {
  e.preventDefault();
  const text = refs.taskInput.value.trim();
  if (text) {
    const newTodo = createTodo(text);
    todos = [...todos, newTodo];
    renderTodos(todos, refs.todoList, handleToggleTodo, handleEditTodo, handleDeleteTodo);
    refs.taskInput.value = '';
  }
};

const handleToggleTodo = (id) => {
  todos = todos.map(todo => todo.id === id ? toggleTodo(todo) : todo);
  renderTodos(todos, refs.todoList, handleToggleTodo, handleEditTodo, handleDeleteTodo);
};

const handleEditTodo = (id, newText) => {
  if (newText.trim()) {
    todos = todos.map(todo => todo.id === id ? updateTodoText(todo, newText) : todo);
    renderTodos(todos, refs.todoList, handleToggleTodo, handleEditTodo, handleDeleteTodo);
  }
};

const handleDeleteTodo = (id) => {
  const element = refs.todoList.querySelector(`[data-id="${id}"]`);
  if (element) {
    element.classList.add('removing');
    setTimeout(() => {
      todos = todos.filter(todo => todo.id !== id);
      renderTodos(todos, refs.todoList, handleToggleTodo, handleEditTodo, handleDeleteTodo);
    }, 300);
  }
};

const handleSort = (sortType) => {
  if (sortType === 'reset') {
    currentSort = null;
    renderTodos(todos, refs.todoList, handleToggleTodo, handleEditTodo, handleDeleteTodo);
  } else {
    currentSort = sortType;
    let sortedTodos;
    switch (sortType) {
      case 'dateAdded':
        sortedTodos = sortByDateAdded(todos);
        break;
      case 'status':
        sortedTodos = sortByStatus(todos);
        break;
      case 'dateUpdated':
        sortedTodos = sortByDateUpdated(todos);
        break;
      default:
        sortedTodos = todos;
    }
    renderTodos(sortedTodos, refs.todoList, handleToggleTodo, handleEditTodo, handleDeleteTodo);
  }
};


refs.todoForm.addEventListener('submit', handleAddTodo);

refs.sortButtons.forEach(button => {
  button.addEventListener('click', (e) => {
    const sortType = e.target.dataset.sort;
    handleSort(sortType);
  });
});

// Initial render
renderTodos(todos, refs.todoList, handleToggleTodo, handleEditTodo, handleDeleteTodo);
