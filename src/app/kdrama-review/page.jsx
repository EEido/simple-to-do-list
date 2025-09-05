"use client";

import { useState } from "react";
import PopUpForm from "../../components/kdrama-review/PopUpForm";

export default function KdramaReview() {
  const [searchInput, setSearchInput] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dramas, setDramas] = useState([]);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const handleSaveModal = (newKdrama) => {
    setDramas([{ id: Date.now(), ...newKdrama }, ...dramas]);
    handleCloseModal();
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-900 text-white p-8 font-sans">
      {/* Search and Add section at the top */}
      <header className="w-full max-w-4xl mb-12">
        <div className="flex items-center justify-between space-x-4">
          {/* The search bar in the middle */}
          <input
            type="text"
            placeholder="Search for a K-Drama..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="flex-grow bg-gray-700 text-white border-2 border-green-400 rounded-full py-3 px-6 focus:outline-none focus:ring-2 focus:ring-green-400"
          />

          {/* The Add button */}
          <button
            onClick={handleOpenModal}
            className="bg-green-500 hover:bg-green-600 active:bg-green-700 transition-colors duration-200 text-white font-bold rounded-full py-3 px-6 shadow"
          >
            ADD
          </button>
        </div>
      </header>
      {/* Main content area for the preview cards (placeholder for now) */}
      <main className="w-full max-w-4xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {dramas.length === 0 ? (
          <p className="text-center text-gray-400 italic col-span-full">No K-Dramas added yet.</p>
        ) : (
          dramas.map((drama) => (
            <div
              key={drama.id}
              className="bg-gray-800 rounded-lg shadow-lg p-6 text-gray-400 border border-gray-700 transition-transform hover:scale-105"
            >
              <h3 className="text-xl font-bold text-green-400">{drama.title}</h3>
              <p className="text-sm italic">{drama.genre}</p>
              <p className="mt-2 text-gray-300">{drama.desc}</p>
            </div>
          ))
        )}
      </main>
      {isModalOpen && <PopUpForm onSave={handleSaveModal} onClose={handleCloseModal} />}
    </div>
  );
}
