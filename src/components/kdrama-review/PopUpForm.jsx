"use client";

import { useState } from "react";

export default function PopUpForm({ onSave, onClose }) {
  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("");
  const [desc, setDesc] = useState("");

  const handleSave = () => {
    if (title.trim() === "") {
      alert("Title is required");
      return;
    }
    onSave({ title, genre, desc });

    setTitle("");
    setGenre("");
    setDesc("");
  };

  return (
    <div className="fixed inset-0 bg-opacity-75 flex items-center justify-center p-4">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-md w-full border border-green-400">
        <h2 className="text-2xl font-bold mb-4 text-center">Add New K-Drama</h2>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full bg-gray-700 text-white border border-green-400 rounded-md py-2 px-4 focus:outline-none focus:ring focus:ring-green-400"
          />
          <input
            type="text"
            placeholder="Genre"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            className="w-full bg-gray-700 text-white border border-green-400 rounded-md py-2 px-4 focus:outline-none focus:ring focus:ring-green-400"
          />
          <textarea
            placeholder="Description"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            className="w-full bg-gray-700 text-white border border-green-400 rounded-md py-2 px-4 h-32 resize-none focus:outline-none focus:ring focus:ring-green-400"
          />
        </div>

        <div className="mt-6 flex justify-end space-x-4">
          <button onClick={onClose} className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md transition-colors">
            Cancel
          </button>
          <button onClick={handleSave} className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md transition-colors">
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
