import React, { useState, useEffect } from 'react';

function UserTasks({ tasks }) {
  const [selectedUser, setSelectedUser] = useState('Alice');
  const [localTasks, setLocalTasks] = useState([]);

  useEffect(() => {
    // Simulating fetching tasks or ensure tasks are loaded
    if (tasks) {
      setLocalTasks(tasks);
    } else {
      // Optionally, fetch tasks from a server or handle empty state
      setLocalTasks([]); // set to empty array if tasks is undefined to avoid errors
    }
  }, [tasks]);

  const filteredTasks = localTasks.filter(task => task.assignee === selectedUser);

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
          <li key={task.id} style={{ textDecoration: task.status === 'Done' ? 'line-through' : 'none', padding: '10px 0' }}>
            {task.description} - Priority: {task.priority} - Status: {task.status}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserTasks;
