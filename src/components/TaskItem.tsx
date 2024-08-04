'use client';

import { FaEdit, FaTrash, FaCheck } from 'react-icons/fa';

interface Task {
  id: number;
  text: string;
  completed: boolean;
}

interface TaskItemProps {
  task: Task;
  onEdit: (id: number, text: string) => void;
  onRemove: (id: number) => void;
  onToggleComplete: (id: number) => void;
}

const TaskItem = ({ task, onEdit, onRemove, onToggleComplete }: TaskItemProps) => (
  <li className="bg-gray-900 bg-opacity-50 rounded-lg shadow-lg p-4 flex items-center justify-between">
    <span className={`text-white ${task.completed ? 'line-through' : ''}`}>{task.text}</span>
    <div>
      <button onClick={() => onToggleComplete(task.id)} className="text-yellow-400 hover:text-yellow-300 mr-2">
        <FaCheck />
      </button>
      <button onClick={() => onEdit(task.id, task.text)} className="text-blue-400 hover:text-blue-300 mr-2">
        <FaEdit />
      </button>
      <button onClick={() => onRemove(task.id)} className="text-red-400 hover:text-red-300">
        <FaTrash />
      </button>
    </div>
  </li>
);

export default TaskItem;
