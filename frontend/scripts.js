document.addEventListener('DOMContentLoaded', function() {
    // Event listener for login form
    if (document.getElementById('loginForm')) {
        document.getElementById('loginForm').addEventListener('submit', function(event) {
            event.preventDefault();
            alert('Logged in (simulation)');
        });
    }

    // Event listener for register form
    if (document.getElementById('registerForm')) {
        document.getElementById('registerForm').addEventListener('submit', function(event) {
            event.preventDefault();
            alert('Registered (simulation)');
        });
    }

    // Event listener for add task form
    if (document.getElementById('addTaskForm')) {
        document.getElementById('addTaskForm').addEventListener('submit', function(event) {
            event.preventDefault();
            const taskInput = document.getElementById('taskInput');
            const priority = document.getElementById('prioritySelect').value;
            const assignee = document.getElementById('assigneeSelect').value;
            addTask(taskInput.value, assignee, priority);
            taskInput.value = ''; // Clear input after adding
        });
    }
});

// Define your functions outside the DOMContentLoaded if they are used across multiple pages
function addTask(description, assignee, priority) {
    const taskList = document.getElementById('taskList');
    if (taskList) {
        const taskItem = document.createElement('li');
        const taskId = Date.now().toString(); // Generate a unique ID for each task
        taskItem.setAttribute('id', taskId);
        taskItem.textContent = `${description} - Assigned to: ${assignee} - Priority: ${priority}`;

        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.onclick = function() {
            prepareEditTask(taskId);
        };

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = function() {
            deleteTask(taskId);
        };

        taskItem.appendChild(editButton);
        taskItem.appendChild(deleteButton);

        taskList.appendChild(taskItem);
    } else {
        alert('Task list not found on this page.');
    }
}

function deleteTask(id) {
    const taskItem = document.getElementById(id);
    if (taskItem) {
        taskItem.parentNode.removeChild(taskItem);
    }
}

function prepareEditTask(id) {
    const taskItem = document.getElementById(id);
    const parts = taskItem.textContent.split(' - Assigned to: ');
    const description = parts[0];
    const details = parts[1].split(' - Priority: ');
    const assignee = details[0];
    const priority = details[1];

    document.getElementById('taskInput').value = description;
    document.getElementById('assigneeSelect').value = assignee;
    document.getElementById('prioritySelect').value = priority;
    document.getElementById('editingId').value = id; // Set the editing ID
    document.getElementById('submitButton').textContent = 'Edit Task'; // Change button text to 'Edit Task'
}

function deleteTask(id) {
    const taskItem = document.getElementById(id);
    document.getElementById('taskList').removeChild(taskItem);
}

function notify(assignee, task) {
    // Simple notification logic using alert
    alert(`Notification: ${assignee}, you have been assigned a new task: ${task}`);
}
