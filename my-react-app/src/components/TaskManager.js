import React, { useState } from 'react';

function TaskManager() {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState('');
  const [priority, setPriority] = useState('low');
  const [assignee, setAssignee] = useState('Alice');
  const [editingId, setEditingId] = useState('');
  const [sortOrder, setSortOrder] = useState('priority-asc');

  const handleAddOrEditTask = (event) => {
    event.preventDefault();
    if (editingId) {
      updateTask(editingId, taskInput, assignee, priority);
    } else {
      addTask(taskInput, assignee, priority);
    }
    setTaskInput('');
    setEditingId('');
  };

  const addTask = (description, assignee, priority) => {
    const newTask = { id: Date.now().toString(), description, assignee, priority };
    setTasks([...tasks, newTask]);
  };

  const updateTask = (id, description, assignee, priority) => {
    const updatedTasks = tasks.map(task =>
      task.id === id ? { ...task, description, assignee, priority } : task
    );
    setTasks(updatedTasks);
  };

  const deleteTask = (id) => {
    const updatedTasks = tasks.filter(task => task.id !== id);
    setTasks(updatedTasks);
  };

  const prepareEditTask = (task) => {
    setTaskInput(task.description);
    setAssignee(task.assignee);
    setPriority(task.priority);
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
    setTasks(sortedTasks);
  };

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
        <input type="hidden" value={editingId} />
        <button type="submit">{editingId ? 'Edit Task' : 'Add Task'}</button>
      </form>
      <select onChange={(e) => sortTasks(e.target.value)} value={sortOrder}>
        <option value="priority-asc">Sort by Priority (Ascending)</option>
        <option value="priority-desc">Sort by Priority (Descending)</option>
      </select>
      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            {task.description} - Assigned to: {task.assignee} - Priority: {task.priority}
            <button onClick={() => prepareEditTask(task)}>Edit</button>
            <button onClick={() => deleteTask(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </main>
  );
}

export default TaskManager;
