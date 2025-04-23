"use client";

import { useState } from "react";

export default function TodoItem({ todo, onToggleComplete, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(todo.title);

  const handleSave = () => {
    if (editedText.trim()) {
      onEdit(todo.id, editedText);
      setIsEditing(false);
    }
  };

  return (
    <div className="todo-item">
      {isEditing ? (
        <div className="flex items-center w-full space-x-2">
          <input
            type="text"
            className="input-field flex-grow"
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
            autoFocus
          />
          <button 
            onClick={handleSave}
            className="bg-accent hover:bg-yellow-400 text-gray-800 px-3 py-1 rounded"
          >
            Simpan
          </button>
          <button 
            onClick={() => setIsEditing(false)}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-3 py-1 rounded"
          >
            Batal
          </button>
        </div>
      ) : (
        <>
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => onToggleComplete(todo.id)}
              className="mr-3 h-5 w-5 text-primary"
            />
            <span className={`${todo.completed ? "line-through text-gray-500" : ""}`}>
              {todo.title}
            </span>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => setIsEditing(true)}
              className="text-primary hover:text-blue-700"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(todo.id)}
              className="text-red-500 hover:text-red-700"
            >
              Hapus
            </button>
          </div>
        </>
      )}
    </div>
  );
}