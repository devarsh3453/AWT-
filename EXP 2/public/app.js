// Application state and DOM elements
let currentFilter = 'all';
const todoInput = document.getElementById('todoInput');
const descriptionInput = document.getElementById('descriptionInput');
const addBtn = document.getElementById('addBtn');
const todoList = document.getElementById('todoList');
const totalCount = document.getElementById('totalCount');
const completedCount = document.getElementById('completedCount');
const clearCompleted = document.getElementById('clearCompleted');
const filterBtns = document.querySelectorAll('.filter-btn');
const emptyState = document.getElementById('emptyState');

// Event listeners
addBtn.addEventListener('click', addTodo);
todoInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addTodo();
});
descriptionInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && e.ctrlKey) addTodo();
});
clearCompleted.addEventListener('click', clearCompletedTodos);

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentFilter = btn.dataset.filter;
        renderTodos();
    });
});

// Fetch todos from server
async function fetchTodos() {
    try {
        const response = await fetch('/api/todos');
        if (!response.ok) throw new Error('Failed to fetch todos');
        return await response.json();
    } catch (error) {
        console.error('Error fetching todos:', error);
        return [];
    }
}

// Add new todo
async function addTodo() {
    const title = todoInput.value.trim();
    const description = descriptionInput.value.trim();

    if (!title) {
        alert('Please enter a todo title');
        return;
    }

    try {
        const response = await fetch('/api/todos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title, description })
        });

        if (!response.ok) throw new Error('Failed to add todo');

        const newTodo = await response.json();
        console.log('✅ Todo added:', newTodo);

        // Clear inputs
        todoInput.value = '';
        descriptionInput.value = '';
        todoInput.focus();

        // Refresh todo list
        renderTodos();
    } catch (error) {
        console.error('Error adding todo:', error);
        alert('Failed to add todo');
    }
}

// Toggle todo completion status
async function toggleTodo(id) {
    try {
        const todos = await fetchTodos();
        const todo = todos.find(t => t.id === id);

        if (!todo) return;

        const response = await fetch(`/api/todos/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ completed: !todo.completed })
        });

        if (!response.ok) throw new Error('Failed to update todo');

        console.log('Todo updated:', await response.json());
        renderTodos();
    } catch (error) {
        console.error('Error toggling todo:', error);
        alert('Failed to update todo');
    }
}

// Delete todo
async function deleteTodo(id) {
    try {
        const response = await fetch(`/api/todos/${id}`, {
            method: 'DELETE'
        });

        if (!response.ok) throw new Error('Failed to delete todo');

        console.log('Todo deleted:', await response.json());
        renderTodos();
    } catch (error) {
        console.error('Error deleting todo:', error);
        alert('Failed to delete todo');
    }
}

// Clear all completed todos
async function clearCompletedTodos() {
    if (!confirm('Are you sure you want to delete all completed todos?')) {
        return;
    }

    try {
        const response = await fetch('/api/todos', {
            method: 'DELETE'
        });

        if (!response.ok) throw new Error('Failed to clear completed todos');

        const result = await response.json();
        console.log(' Cleared completed:', result);
        renderTodos();
    } catch (error) {
        console.error('Error clearing completed todos:', error);
        alert('Failed to clear completed todos');
    }
}

// Filter todos based on current filter
function getFilteredTodos(todos) {
    switch (currentFilter) {
        case 'active':
            return todos.filter(todo => !todo.completed);
        case 'completed':
            return todos.filter(todo => todo.completed);
        default:
            return todos;
    }
}

// Update statistics
function updateStats(todos) {
    const total = todos.length;
    const completed = todos.filter(todo => todo.completed).length;
    const active = total - completed;

    totalCount.textContent = `Total: ${total}`;
    completedCount.textContent = `Completed: ${completed}`;
    clearCompleted.style.display = active === 0 && total > 0 ? 'none' : 'block';
}

// Render todos on the page
async function renderTodos() {
    const todos = await fetchTodos();
    const filteredTodos = getFilteredTodos(todos);

    updateStats(todos);

    // Show/hide empty state
    if (todos.length === 0) {
        emptyState.classList.add('show');
        todoList.innerHTML = '';
        return;
    } else {
        emptyState.classList.remove('show');
    }

    // Build HTML for todos
    todoList.innerHTML = filteredTodos.map(todo => `
    <li class="todo-item ${todo.completed ? 'completed' : ''}">
      <input 
        type="checkbox" 
        class="checkbox" 
        ${todo.completed ? 'checked' : ''}
        onchange="toggleTodo(${todo.id})"
      >
      <div class="todo-content">
        <div class="todo-title">${escapeHtml(todo.title)}</div>
        ${todo.description ? `<div class="todo-description">${escapeHtml(todo.description)}</div>` : ''}
        <div class="todo-date">${formatDate(todo.createdAt)}</div>
      </div>
      <button class="delete-btn" onclick="deleteTodo(${todo.id})">Delete</button>
    </li>
  `).join('');
}

// Helper: Escape HTML to prevent XSS
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Helper: Format date
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

// Initial render
renderTodos();
