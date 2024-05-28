import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './components/AuthContext';
import Header from './components/Header';
import Nav from './components/Nav';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import TaskManager from './components/TaskManager';
import UserTasks from './components/UserTasks';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Header />
          <Nav />
          <AppRoutes />
        </div>
      </Router>
    </AuthProvider>
  );
}

function AppRoutes() {
  const { isAuthenticated } = useAuth();
  const [tasks, setTasks] = useState([]);

  const addTask = (newTask) => {
    setTasks([...tasks, newTask]);
  };

  const updateTask = (updatedTask) => {
    setTasks(tasks.map(task => task.id === updatedTask.id ? updatedTask : task));
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      {!isAuthenticated ? (
        <>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/* Redirect if accessing protected routes while not authenticated */}
          <Route path="/task-manager" element={<Navigate replace to="/login" />} />
          <Route path="/user-tasks" element={<Navigate replace to="/login" />} />
        </>
      ) : (
        <>
          <Route path="/task-manager" element={<TaskManager tasks={tasks} addTask={addTask} updateTask={updateTask} deleteTask={deleteTask} />} />
          <Route path="/user-tasks" element={<UserTasks tasks={tasks} />} />
          {/* Redirect if trying to access login or register while authenticated */}
          <Route path="/login" element={<Navigate replace to="/" />} />
          <Route path="/register" element={<Navigate replace to="/" />} />
        </>
      )}
      {/* Fallback Route */}
      <Route path="*" element={<Home />} />
    </Routes>
  );
}

export default App;
