document.addEventListener('DOMContentLoaded', function() {
    // Add/Edit Task Form Submission
    const taskForm = document.getElementById('addTaskForm');
    if (taskForm) {
        taskForm.addEventListener('submit', function(event) {
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
    }
});

document.addEventListener('DOMContentLoaded', function() {
    // Event listener for sort selection change
    const sortSelect = document.getElementById('sortSelect');
    if (sortSelect) {
        sortSelect.addEventListener('change', function() {
            sortTasks(this.value);
        });
    }
});

function addTask(description, assignee, priority) {
    const taskList = document.getElementById('taskList');
    const taskItem = document.createElement('li');
    const taskId = Date.now().toString(); // Generate a unique ID for each task
    taskItem.setAttribute('id', taskId);
    taskItem.textContent = `${description} - Assigned to: ${assignee} - Priority: ${priority}`;

    addTaskControls(taskItem, taskId);
    taskList.appendChild(taskItem);
}

function updateTask(id, description, assignee, priority) {
    const taskItem = document.getElementById(id);
    if (taskItem) {
        taskItem.textContent = `${description} - Assigned to: ${assignee} - Priority: ${priority}`;
        addTaskControls(taskItem, id);
    }
}

function addTaskControls(taskItem, taskId) {
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

    // Ensure we remove old buttons if they exist before adding new ones
    taskItem.innerHTML = `${taskItem.textContent} `;
    taskItem.appendChild(editButton);
    taskItem.appendChild(deleteButton);
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
    if (taskItem) {
        taskItem.parentNode.removeChild(taskItem);
    }
}

function sortTasks(sortBy) {
    let tasks = Array.from(document.getElementById('taskList').children);
    console.log('Initial tasks:', tasks.map(t => t.textContent));

    // Adjust priorities to be in lowercase for case-insensitive comparison
    let priorities = ['low', 'medium', 'high'];

    tasks.sort((a, b) => {
        let aText = a.textContent.split('Edit')[0].trim();
        let bText = b.textContent.split('Edit')[0].trim();
        console.log('Parsed text A:', aText);
        console.log('Parsed text B:', bText);

        if (sortBy === 'priority-desc' || sortBy === 'priority-asc') {
            // Convert priority text extracted from the task to lowercase before finding the index
            let aPriorityIndex = priorities.indexOf(aText.split(' - Priority: ')[1].toLowerCase());
            let bPriorityIndex = priorities.indexOf(bText.split(' - Priority: ')[1].toLowerCase());
            console.log('Priority A:', aPriorityIndex, 'Priority B:', bPriorityIndex);

            if (sortBy === 'priority-desc') {
                console.log('Descending comparison result:', bPriorityIndex - aPriorityIndex);
                return bPriorityIndex - aPriorityIndex;
            } else {
                console.log('Ascending comparison result:', aPriorityIndex - bPriorityIndex);
                return aPriorityIndex - bPriorityIndex;
            }
        }
    });

    console.log('Sorted tasks:', tasks.map(t => t.textContent));
    document.getElementById('taskList').innerHTML = '';
    tasks.forEach(task => {
        document.getElementById('taskList').appendChild(task);
        console.log('Appended task:', task.textContent);
    });
}
