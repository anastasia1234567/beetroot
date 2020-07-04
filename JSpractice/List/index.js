function updateView() {
    todoList.innerHTML = '';

    const todos = getFilteredTodos();

    for (let item of todos) {
        const todoItem = document.createElement('div');
        todoItem.classList.add('todoItem');
        todoItem.setAttribute('data-id', item.id);
        // todoItem.insertAdjacentText("afterbegin", item.value);
        todoItem.innerText = item.value;
        todoList.append(todoItem);

        if (item.completed) {
            todoItem.classList.add('completed');
        }
    }
}

function switchSelected(elem) {
    document.querySelector('.selected').classList.remove('selected');
    elem.classList.add('selected');
}

const form = document.querySelector('form');
const list = document.getElementById('todoList');
const localStorage = window.localStorage;
document.getElementById(`${getFilterBy().toLocaleLowerCase()}`).classList.add('selected');

if (!getTodos()) {
    localStorage.setItem("todos", '[]');
}

function addTodo(todo) {
    const todos = getTodos();
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}

function getFilterBy() {
    return localStorage.getItem('filterBy');
}

function settFilterBy(filterBy) {
    localStorage.setItem('filterBy', filterBy);
    updateView();
}

function getTodos() {
    return JSON.parse(localStorage.getItem('todos'));
}

updateView();

form.addEventListener('submit', (event) => {
    event.preventDefault();

    const input = event.target[0];

    addTodo({
        id: Date.now(),
        value: input.value,
        completed: false,
    });

    updateView(getTodos());

    input.value = '';
});

todoList.addEventListener('click', (event) => {
    const todos = getTodos();
    const dataId = +event.target.dataset.id;
    const index = getTodos().findIndex((item) => item.id === dataId);
    todos[index].completed = !todos[index].completed;
    localStorage.setItem('todos', JSON.stringify(todos));
    updateView();
})

const allBtn = document.getElementById('all');
const activeBtn = document.getElementById('active');
const completedBtn = document.getElementById('completed');
const clearBtn = document.getElementById('clear');

allBtn.addEventListener('click', (e) => {
    settFilterBy('All')
    switchSelected(e.target);
})

function getFilteredTodos() {
    const todos = getTodos();
    switch (getFilterBy()) {
        case 'Active': {
            return todos.filter((item) => item.completed === false)
        }
        case 'Completed': {
            return todos.filter((item) => item.completed === true);
        }
        default: {
            return todos
        }
    }
}

activeBtn.addEventListener('click', (e) => {
    settFilterBy('Active')
    switchSelected(e.target);
})

completedBtn.addEventListener('click', (e) => {
    settFilterBy('Completed')
    switchSelected(e.target);
})

clearBtn.addEventListener('click', (e) => {
    const todos = getTodos().filter((item) => item.completed === false);
    localStorage.setItem('todos', JSON.stringify(todos));
    settFilterBy('All');
    switchSelected(document.getElementById('all'));
})

