'use client';

import { useState } from 'react';
import { FaInstagram, FaGithub, FaLinkedin } from 'react-icons/fa';
import useTasks from '../hooks/useTasks';
import TaskItem from './TaskItem';

export default function TodoList() {
  const { tasks, setTasks } = useTasks();
  const [editTaskId, setEditTaskId] = useState<number | null>(null);
  const [editTaskText, setEditTaskText] = useState('');
  const [filter, setFilter] = useState<'all' | 'completed' | 'incomplete'>('all');

  const addOrSaveTask = () => {
    if (editTaskText.trim() === '') {
      alert('Task cannot be empty');
      return;
    }

    if (editTaskId !== null) {
      const updatedTasks = tasks.map(task =>
        task.id === editTaskId ? { ...task, text: editTaskText } : task
      );
      setTasks(updatedTasks);
      setEditTaskId(null);
      setEditTaskText('');
    } else {
      const updatedTasks = [...tasks, { id: Date.now(), text: editTaskText, completed: false }];
      setTasks(updatedTasks);
      setEditTaskText('');
    }
  };

  const removeTask = (id: number) => {
    const updatedTasks = tasks.filter(task => task.id !== id);
    setTasks(updatedTasks);
  };

  const startEditTask = (id: number, text: string) => {
    setEditTaskId(id);
    setEditTaskText(text);
  };

  const cancelEditTask = () => {
    setEditTaskId(null);
    setEditTaskText('');
  };

  const toggleComplete = (id: number) => {
    const updatedTasks = tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'completed') return task.completed;
    if (filter === 'incomplete') return !task.completed;
    return true;
  });

  return (
    <div className="w-full max-w-md">
      <div className="bg-gray-900 bg-opacity-50 rounded-lg shadow-lg p-6 mb-8">
        <input
          type="text"
          value={editTaskText}
          onChange={(e) => setEditTaskText(e.target.value)}
          className="w-full bg-gray-800 text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
          placeholder="Enter The Task Here..."
        />
        <button
          onClick={addOrSaveTask}
          className="w-full mt-4 bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500"
        >
          {editTaskId !== null ? 'Save' : 'Add'}
        </button>
        {editTaskId !== null && (
          <button
            onClick={cancelEditTask}
            className="w-full mt-2 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            Cancel
          </button>
        )}
        
      </div>
      {editTaskId === null && (<>
        <div className="mb-4">
        Filter by status:{' '}
        <button onClick={() => setFilter('all')} className={`mr-2 ${filter === 'all' ? 'font-bold' : ''}`}>All</button>
        <button onClick={() => setFilter('completed')} className={`mr-2 ${filter === 'completed' ? 'font-bold' : ''}`}>Completed</button>
        <button onClick={() => setFilter('incomplete')} className={filter === 'incomplete' ? 'font-bold' : ''}>Incomplete</button>
      </div>
        <ul className="space-y-4">
          {filteredTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onEdit={startEditTask}
              onRemove={removeTask}
              onToggleComplete={toggleComplete}
            />
          ))}
        </ul></>
      )}
      <div className="mt-8 flex justify-center space-x-4">
        <a href="https://github.com/imthebest9" target='_blank' className="text-gray-400 hover:text-yellow-400">
          <FaGithub size={24} />
        </a>
        <a href="https://www.linkedin.com/in/lookai/" target='_blank' className="text-gray-400 hover:text-yellow-400">
          <FaLinkedin size={24} />
        </a>
      </div>
    </div>
  );
}
