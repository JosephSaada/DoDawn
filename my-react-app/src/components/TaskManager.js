// src/components/TaskManager.js
import React, { useState, useEffect } from 'react';
import { fetchTasks, addTask, updateTask, deleteTask } from '../api';

function TaskManager() {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState('');
  const [priority, setPriority] = useState('low');
  const [assignee, setAssignee] = useState('Alice');
  const [status, setStatus] = useState('To Do');
  const [editingId, setEditingId] = useState('');
  const [sortOrder, setSortOrder] = useState('priority-asc');

  useEffect(() => {
    const loadTasks = async () => {
      const fetchedTasks = await fetchTasks();
      setTasks(fetchedTasks);
    };
    loadTasks();
  }, []);

  const handleAddOrEditTask = async (event) => {
    event.preventDefault();
    const newTask = {
      description: taskInput,
      assignee,
      priority,
      status
    };

    if (editingId) {
      const updatedTask = await updateTask(editingId, newTask);
      setTasks(tasks.map(task => task._id === updatedTask._id ? updatedTask : task));
    } else {
      const addedTask = await addTask(newTask);
      setTasks([...tasks, addedTask]);
    }

    setTaskInput('');
    setEditingId('');
  };

  const prepareEditTask = (task) => {
    setTaskInput(task.description);
    setAssignee(task.assignee);
    setPriority(task.priority);
    setStatus(task.status);
    setEditingId(task._id);
  };

  const handleDeleteTask = async (taskId) => {
    await deleteTask(taskId);
    setTasks(tasks.filter(task => task._id !== taskId));
  };

  const sortTasks = (order) => {
    return [...tasks].sort((a, b) => {
      return order === 'priority-asc' ? a.priority.localeCompare(b.priority) : b.priority.localeCompare(a.priority);
    });
  };

  const sortedTasks = sortTasks(sortOrder);

  return (
    <main style={{ padding: '20px', maxWidth: '400px', margin: 'auto' }}>
      <form onSubmit={handleAddOrEditTask} style={{ display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'center' }}>
        <input
          type="text"
          value={taskInput}
          onChange={(e) => setTaskInput(e.target.value)}
          placeholder="Add a new task"
          required
          style={{ padding: '10px', width: '100%' }}
        />
        <select value={assignee} onChange={(e) => setAssignee(e.target.value)} style={{ padding: '10px', width: '100%' }}>
          <option value="Alice">Alice</option>
          <option value="Bob">Bob</option>
          <option value="Charlie">Charlie</option>
          <option value="Dana">Dana</option>
        </select>
        <select value={priority} onChange={(e) => setPriority(e.target.value)} style={{ padding: '10px', width: '100%' }}>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <select value={status} onChange={(e) => setStatus(e.target.value)} style={{ padding: '10px', width: '100%' }}>
          <option value="To Do">To Do</option>
          <option value="In Progress">In Progress</option>
          <option value="Done">Done</option>
        </select>
        <button type="submit" style={{ padding: '10px', backgroundColor: 'green', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', width: '100%' }}>
          {editingId ? 'Edit Task' : 'Add Task'}
        </button>
      </form>
      <select onChange={(e) => setSortOrder(e.target.value)} value={sortOrder} style={{ padding: '10px', width: '100%', marginTop: '20px' }}>
        <option value="priority-asc">Sort by Priority (Ascending)</option>
        <option value="priority-desc">Sort by Priority (Descending)</option>
      </select>
      <ul style={{ listStyleType: 'none', padding: 0, width: '100%', marginTop: '20px' }}>
        {sortedTasks.map(task => (
          <li key={task._id} style={{ padding: '10px', marginBottom: '10px', border: '1px solid #ccc', borderRadius: '4px', backgroundColor: '#f9f9f9', textAlign: 'center', textDecoration: task.status === 'Done' ? 'line-through' : 'none' }}>
            <p>{task.description}</p>
            <p>Assigned to: {task.assignee}</p>
            <p>Priority: {task.priority}</p>
            <p>Status: {task.status}</p>
            <div>
              <button onClick={() => prepareEditTask(task)} style={{ margin: '5px', padding: '5px 10px', backgroundColor: 'green', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Edit</button>
              <button onClick={() => handleDeleteTask(task._id)} style={{ margin: '5px', padding: '5px 10px', backgroundColor: 'red', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}

export default TaskManager;
