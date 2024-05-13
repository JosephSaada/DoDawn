import React, { useState } from 'react';

function UserTasks({ tasks }) {
  const [selectedUser, setSelectedUser] = useState('Alice');

  const filteredTasks = tasks.filter(task => task.assignee === selectedUser);

  return (
    <div>
      <h2>Tasks for {selectedUser}</h2>
      <select value={selectedUser} onChange={(e) => setSelectedUser(e.target.value)}>
        <option value="Alice">Alice</option>
        <option value="Bob">Bob</option>
        <option value="Charlie">Charlie</option>
        <option value="Dana">Dana</option>
      </select>
      <ul>
        {filteredTasks.map(task => (
          <li key={task.id} style={{ textDecoration: task.status === 'Done' ? 'line-through' : 'none' }}>
            {task.description} - Priority: {task.priority} - Status: {task.status}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserTasks;
