const fetchTodos = async () => {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=10')
        const data = await response.json()
        return data
    } catch(error) {
        console.log(error);
    }
    
}

const todoHtmlFragment = (item) => `
    <li class="todo-item" key="${item.id}">
        <div class="todo-item__ulid">
            <h3>${item.id}</h3>
        </div>
        <div class="todo-item__content">
            <h2>User Id: ${item.userId}</h2>
            <h3>Title: ${item.title}</h3>
        </div>
        <div class="todo-item__actions">
            <button class="view-button" data-id="${item.id}">VIEW</button>
            <button class="delete-button" data-id="${item.id}">DELETE</button>
        </div>
    </li>
`

const renderTodos = (todos, rootElement) => {
    let html = ''
    console.log(todos);
    todos.map(item => html += todoHtmlFragment(item))
    rootElement.innerHTML = html

    document.querySelectorAll('.view-button').forEach(button => {
        button.addEventListener('click', async (event) => {
            const todoId = event.target.getAttribute('data-id');
            const todo = await fetchTodoById(todoId);
            alert(`Todo ID: ${todo.id}\nUser ID: ${todo.userId}\nTitle: ${todo.title}\nCompleted: ${todo.completed}`);
        });
    });

    document.querySelectorAll('.delete-button').forEach(button => {
        button.addEventListener('click', async (event) => {
            const todoId = event.target.getAttribute('data-id');
            await deleteTodoById(todoId);
            const todos = await fetchTodos();
            renderTodos(todos, rootElement);
        });
    });
}

const fetchTodoById = async (id) => {
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
    }
};

const createTodo = async (todo) => {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            body: JSON.stringify(todo),
            headers: {
              'Content-type': 'application/json; charset=UTF-8',
            },
        })
        const data = await response.json()
        return data
    } catch(error) {
        console.log(error)
    }
}

const deleteTodoById = async (id) => {
    try {
        await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
            method: 'DELETE',
        });
    } catch (error) {
        console.log(error);
    }
};

document.addEventListener('DOMContentLoaded', async () => {
    const todos = await fetchTodos()
    const rootElement = document.getElementById('todo-list')
    renderTodos(todos, rootElement)

    const createTodoButton = document.getElementById('todo-create')
    const todoTitleInput = document.getElementById('todo-title');

    createTodoButton.addEventListener('click', async () => {
        const title = todoTitleInput.value || 'New todo';
        const newTodo = await createTodo({
            userId: 1,
            title: title,
            completed: false
        })

        const todoItem = document.createElement('li');
        todoItem.className = 'todo-item';
        todoItem.setAttribute('key', newTodo.id);
        todoItem.innerHTML = `
            <div class="todo-item__ulid">
                <h3>${newTodo.id}</h3>
            </div>
            <div class="todo-item__content">
                <h2>User Id: ${newTodo.userId}</h2>
                <h3>Title: ${newTodo.title}</h3>
            </div>
            <div class="todo-item__actions">
                <button class="view-button" data-id="${newTodo.id}">VIEW</button>
                <button class="delete-button" data-id="${newTodo.id}">DELETE</button>
            </div>
        `;
        rootElement.appendChild(todoItem);

        todoItem.querySelector('.view-button').addEventListener('click', async (event) => {
            const todoId = event.target.getAttribute('data-id');
            const todo = await fetchTodoById(todoId);
            alert(`Todo ID: ${todo.id}\nUser ID: ${todo.userId}\nTitle: ${todo.title}\nCompleted: ${todo.completed}`);
        });

        todoItem.querySelector('.delete-button').addEventListener('click', async (event) => {
            const todoId = event.target.getAttribute('data-id');
            await deleteTodoById(todoId);
            todoItem.remove();
        });

        todoTitleInput.value = '';
    })
})
