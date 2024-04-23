document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    // Login logic here
    alert('Logged in (simulation)');
});

document.getElementById('registerForm').addEventListener('submit', function(event) {
    event.preventDefault();
    // Registration logic here
    alert('Registered (simulation)');
});

document.getElementById('addTaskForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const taskInput = document.querySelector('#addTaskForm input[type="text"]');
    const priority = document.querySelector('#prioritySelect').value;
    const assignee = document.querySelector('#assigneeSelect').value;

    addTask(taskInput.value, assignee, priority);
    taskInput.value = ''; // Clear input after adding
});

document.getElementById('taskForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const taskInput = document.getElementById('taskInput');
    const priority = document.getElementById('prioritySelect').value;
    const assignee = document.getElementById('assigneeSelect').value;
    const editingId = document.getElementById('editingId').value;

    if (editingId) {
        updateTask(editingId, taskInput.value, assignee, priority);
    } else {
        addTask(taskInput.value, assignee, priority);
    }
    taskInput.value = ''; // Clear input after adding or editing
    document.getElementById('editingId').value = ''; // Clear the editing ID
    document.getElementById('submitButton').textContent = 'Add Task'; // Reset button to 'Add Task'
});

function addTask(description, assignee, priority) {
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

    document.getElementById('taskList').appendChild(taskItem);
    notify(assignee, description);
}

function updateTask(id, description, assignee, priority) {
    const taskItem = document.getElementById(id);
    taskItem.textContent = `${description} - Assigned to: ${assignee} - Priority: ${priority}`;
    // Re-add edit and delete buttons after updating text
    taskItem.appendChild(taskItem.querySelector('button'));
    taskItem.appendChild(taskItem.querySelector('button'));
}


function editTask(taskItem, description, assignee, priority) {
    const newDesc = prompt("Edit your task description:", description);
    const newAssignee = prompt("Edit your assignee:", assignee);
    const newPriority = prompt("Edit your priority:", priority);
    if (newDesc && newAssignee && newPriority) {
        taskItem.textContent = `${newDesc} - Assigned to: ${newAssignee} - Priority: ${newPriority}`;
        taskItem.appendChild(taskItem.querySelector('button')); // Re-add edit button
        taskItem.appendChild(taskItem.querySelector('button')); // Re-add delete button
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
