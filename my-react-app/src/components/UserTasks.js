import React, { useState, useEffect } from 'react';
import { fetchTasks } from '../api'; // Adjust the import path as necessary

function UserTasks() {
  const [selectedUser, setSelectedUser] = useState('Alice');
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const loadTasks = async () => {
      const fetchedTasks = await fetchTasks();
      setTasks(fetchedTasks);
    };
    loadTasks();
  }, []);

  const filteredTasks = tasks.filter(task => task.assignee === selectedUser);

  return (
    <div style={{ maxWidth: '800px', margin: 'auto', padding: '20px', textAlign: 'center' }}>
      <h2 style={{ marginBottom: '20px' }}>Tasks for {selectedUser}</h2>
      <select 
        value={selectedUser} 
        onChange={(e) => setSelectedUser(e.target.value)} 
        style={{ display: 'block', width: '100%', maxWidth: '400px', margin: '0 auto 20px auto', padding: '10px', borderRadius: '4px' }}
      >
        <option value="Alice">Alice</option>
        <option value="Bob">Bob</option>
        <option value="Charlie">Charlie</option>
        <option value="Dana">Dana</option>
      </select>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {filteredTasks.map(task => (
          <li key={task._id} style={{ textDecoration: task.status === 'Done' ? 'line-through' : 'none', padding: '10px 0' }}>
            {task.description} - Priority: {task.priority} - Status: {task.status}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserTasks;
