const formSelector = document.querySelector('[data-fn-form]');
const formInputSelector = document.querySelector('[data-fn-input-form]');
const formErrorSelector = document.querySelector('[data-fn-error]');
const listSelector = document.querySelector('[data-fn-list]');
const searchInputSelector = document.querySelector('[data-fn-input-search]');
const editInput = document.createElement('input');

let todosArray = [];

// Render list
function renderList(items) {
    listSelector.innerHTML = "";

    items.forEach((item) => {
        const newItem = document.createElement("li");
        newItem.classList.add('c-item');
        newItem.setAttribute('data-key', `${item.id}`);

        // om item är completed, sätt checked annars inget
        const checkedAttribute = item.completed ? 'checked' : null;

        // om item är completed, sätt disabled annars inte
        const disabledAttribute = item.completed ? 'disabled' : "";
        
        // om item är completed, lägg på class
        if (item.completed === true) {
            newItem.classList.add('c-item--checked');
        }

        newItem.innerHTML = `
            <div class="c-item__group">
                <input class="c-item__toggle" id="${item.id}" type="checkbox" ${checkedAttribute} />
                <label class="c-item__label" for="${item.id}">${item.name}</label>
            </div>
            <button class="c-item__button c-item__button--edit" type="button" ${disabledAttribute}>Edit</button>
            <button class="c-item__button c-item__button--delete" type="button" ${disabledAttribute}>Delete</button>
        `;

        listSelector.appendChild(newItem);
    });

    // Toggle completed
    const toggleInputElements = document.querySelectorAll('.c-item__toggle');
    toggleInputElements.forEach((element) => {
        element.addEventListener('click', (e) => {
            e.preventDefault();
            toggleTodo(element.parentElement.parentElement.getAttribute('data-key'));
        });
    });

    // Edit button
    const editButtonElements = document.querySelectorAll('.c-item__button--edit');
    editButtonElements.forEach((element) => {
        element.addEventListener('click', (e) => {
            e.preventDefault();
            editTodo(element);
        });
    });

    // Delete button
    const deleteButtonElements = document.querySelectorAll('.c-item__button--delete');
    deleteButtonElements.forEach((element) => {
        element.addEventListener('click', (e) => {
            e.preventDefault();
            deleteTodo(element.parentElement.getAttribute('data-key'));
        });
    });
}

// Add todo
function addTodo(newTodo) {

    class TodoObject {
        constructor(name, completed, id) {
            this.name = name;
            this.completed = completed;
            this.id = id;
        }
    }

    const newTodoItem = new TodoObject(newTodo, false, Date.now());

    // find() = returnerar första item som matchar med input value (newTodo)
    const existingTodo = todosArray.find(item => item.name === newTodo);

    // om input value finns & den inte är samma sedan tidigare
    if (newTodo && !existingTodo) {
        todosArray.push(newTodoItem);
        formErrorSelector.innerHTML = '';
    } else {
        // om input value finns & den finns sedan innan
        formErrorSelector.innerHTML = newTodo && existingTodo ? "Den här uppgiften finns redan" : "Du måste ange en uppgift";
    }

    formInputSelector.value = "";
    addToLocalStorage();
}

// Add to localStorage
function addToLocalStorage() {
    localStorage.setItem('todosArray', JSON.stringify(todosArray));
    renderList(todosArray);
}

// Get from localStorage
function getFromLocalStorage() {
    const storedItems = localStorage.getItem('todosArray');

    if (storedItems) {
        todosArray = JSON.parse(storedItems);
        renderList(todosArray);
    }
}

getFromLocalStorage();

// Toggle completed
function toggleTodo(id) {

    todosArray.forEach((item) => {

        if (item.id == id) {
            item.completed = !item.completed;
        }
    });

    addToLocalStorage();
}

// Delete todo
function deleteTodo(id) {
    // filter() = returnerar en ny array med items, förutom det item som ska tas bort
    todosArray = todosArray.filter(item => item.id != id);
    addToLocalStorage();
}

// Edit todo
function editTodo(element) {
    const item = element.parentElement;
    const itemId = item.getAttribute('data-key');
    const itemClass = item.className;
    const itemSelectedClass = 'c-item c-item--selected';
    const itemElements = document.querySelectorAll('.c-item');
    const objIndex = todosArray.findIndex(item => item.id == itemId);

    itemElements.forEach(item => {
        item.className = 'c-item';
        item.children[1].innerHTML = 'Edit';
    });

    if (itemClass == itemSelectedClass) {

        if (editInput.value != "") {
            const todoNewValue = editInput.value;
            todosArray[objIndex].name = todoNewValue;
            addToLocalStorage();
        } else {
            addToLocalStorage();
        }

    } else {
        const existingTodoName = todosArray[objIndex].name;
        item.className = itemSelectedClass;
        item.children[0].appendChild(editInput);

        element.innerHTML = 'Ok';

        editInput.classList.add('c-item__input');
        editInput.type = 'text';
        editInput.value = existingTodoName;
    }
}

// Search todo
function searchTodo() {
    formErrorSelector.innerHTML = '';

    const searchValue = searchInputSelector.value.toLowerCase();

    // filter() = returnerar en ny array med item som matchar sökord
    filterArray = todosArray.filter((item) => {
        
        if (item.name === searchValue) {
            return searchValue;
        }
    });

    // om filterArray har items, rendera lista baserat på denna, annars ta ordinarie
    filterArray.length ? renderList(filterArray) : renderList(todosArray);
}

formSelector.addEventListener('submit', (e) => {
    e.preventDefault();

    const todoValue = formInputSelector.value;
    addTodo(todoValue);
});

searchInputSelector.addEventListener('input', searchTodo);