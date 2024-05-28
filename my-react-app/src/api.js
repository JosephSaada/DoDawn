// api.js
const API_BASE_URL = 'http://localhost:3001'; // Update with your backend URL if different

export const loginUser = async (email, password) => {
    const response = await fetch(`${API_BASE_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    });
    return response.json();
};

export const registerUser = async (name, email, password) => {
    const response = await fetch(`${API_BASE_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
    });
    return response.json();
};

export const fetchTasks = async () => {
    const response = await fetch(`${API_BASE_URL}/tasks`);
    return response.json();
};

export const addTask = async (task) => {
    const response = await fetch(`${API_BASE_URL}/tasks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(task)
    });
    return response.json();
};

export const updateTask = async (id, task) => {
    const response = await fetch(`${API_BASE_URL}/tasks/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(task)
    });
    return response.json();
};

export const deleteTask = async (id) => {
    const response = await fetch(`${API_BASE_URL}/tasks/${id}`, {
        method: 'DELETE'
    });
    return response.json();
};
