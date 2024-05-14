import React, { useState } from 'react';

function TaskManager({ tasks, addTask, updateTask, deleteTask }) {
  const [taskInput, setTaskInput] = useState('');
  const [priority, setPriority] = useState('low');
  const [assignee, setAssignee] = useState('Alice');
  const [status, setStatus] = useState('To Do');
  const [editingId, setEditingId] = useState('');
  const [sortOrder, setSortOrder] = useState('priority-asc');

  const handleAddOrEditTask = (event) => {
    event.preventDefault();
    if (editingId) {
      updateTask({ id: editingId, description: taskInput, assignee, priority, status });
    } else {
      addTask({ id: Date.now().toString(), description: taskInput, assignee, priority, status });
    }
    setTaskInput('');
    setEditingId('');
  };

  const prepareEditTask = (task) => {
    setTaskInput(task.description);
    setAssignee(task.assignee);
    setPriority(task.priority);
    setStatus(task.status);
    setEditingId(task.id);
  };

  const sortTasks = (order) => {
    const sortedTasks = [...tasks].sort((a, b) => {
      if (order === 'priority-asc') {
        return a.priority.localeCompare(b.priority);
      } else if (order === 'priority-desc') {
        return b.priority.localeCompare(a.priority);
      }
      return 0;
    });
    return sortedTasks;
  };

  const updateTaskStatus = (id, newStatus) => {
    const updatedTasks = tasks.map(task =>
      task.id === id ? { ...task, status: newStatus } : task
    );
    updatedTasks.forEach(updatedTask => updateTask(updatedTask));
  };

  const sortedTasks = sortTasks(sortOrder);

  return (
    <main>
      <form onSubmit={handleAddOrEditTask}>
        <input
          type="text"
          value={taskInput}
          onChange={(e) => setTaskInput(e.target.value)}
          placeholder="Add a new task"
          required
        />
        <select value={assignee} onChange={(e) => setAssignee(e.target.value)}>
          <option value="Alice">Alice</option>
          <option value="Bob">Bob</option>
          <option value="Charlie">Charlie</option>
          <option value="Dana">Dana</option>
        </select>
        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="To Do">To Do</option>
          <option value="In Progress">In Progress</option>
          <option value="Done">Done</option>
        </select>
        <input type="hidden" value={editingId} />
        <button type="submit">{editingId ? 'Edit Task' : 'Add Task'}</button>
      </form>
      <select onChange={(e) => setSortOrder(e.target.value)} value={sortOrder}>
        <option value="priority-asc">Sort by Priority (Ascending)</option>
        <option value="priority-desc">Sort by Priority (Descending)</option>
      </select>
      <ul>
        {sortedTasks.map(task => (
          <li key={task.id} style={{ textDecoration: task.status === 'Done' ? 'line-through' : 'none' }}>
            {task.description} - Assigned to: {task.assignee} - Priority: {task.priority} - Status: {task.status}
            <select value={task.status} onChange={(e) => updateTaskStatus(task.id, e.target.value)}>
              <option value="To Do">To Do</option>
              <option value="In Progress">In Progress</option>
              <option value="Done">Done</option>
            </select>
            <button onClick={() => prepareEditTask(task)}>Edit</button>
            <button onClick={() => deleteTask(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </main>
  );
}

export default TaskManager;
