"use client";

import { useState, useEffect } from "react";

export default function Home() {
  const [taskInput, setTaskInput] = useState("");
  const [taskDesc, setTaskDesc] = useState("");
  const [tasks, setTasks] = useState<{ id: number; title: string; description: string; done: boolean }[]>([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch("/api/tasks");
        if (!response.ok) {
          throw new Error("Network response is not okay");
        }
        const data = await response.json();
        setTasks(data);
      } catch (error) {
        console.error("Failed to fetch", error);
      }
    };
    fetchTasks();
  }, []);

  const handleSaveTask = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (taskInput.trim() === "") {
      return;
    }
    let finalDesc = taskDesc;
    if (taskDesc.trim() === "") {
      finalDesc = "Desciption not found";
    }
    const newTask = {
      title: taskInput,
      description: finalDesc,
      done: false,
    };
    try {
      const response = await fetch("/api/tasks", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(newTask),
      });
      if (!response.ok) {
        throw new Error("Network error");
      }
      const createdTask = await response.json();
      setTasks([createdTask, ...tasks]);
      setTaskInput("");
      setTaskDesc("");
    } catch (error) {
      console.error("Create new task error", error);
    }
  };

  const handleClearTask = async (taskid: number) => {
    try {
      const response = await fetch(`/api/tasks/${taskid}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete the task.");
      }
      setTasks(tasks.filter((task) => task.id != taskid));
    } catch (error) {
      console.error("Error in deleting:", error);
    }
  };
  const handleDoneTask = (id: number) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, done: !task.done } : task)));
  };

  const [viewRemain, setViewRemain] = useState(true);
  const remainingTask = tasks.filter((task) => !task.done);
  const accomplishedTask = tasks.filter((task) => task.done);

  return (
    <div className="font-mono items-center justify-items-center min-h-screen">
      <main className="flex flex-col row-start-2 items-center sm:items-start">
        <div className="font-mono flex justify-center w-full max-w-2xl space-x-4 p-4">
          <button
            onClick={() => setViewRemain(true)}
            className={`rounded-md py-2 px-6 transition-colors duration-200 border border-green-400 ${
              viewRemain ? "bg-green-600 text-white" : "bg-gray-700 text-green-400"
            }`}
          >
            Remaining
          </button>
          <button
            onClick={() => setViewRemain(false)}
            className={`rounded-md py-2 px-6 transition-colors duration-200 border border-green-400 ${
              !viewRemain ? "bg-green-600 text-white" : "bg-gray-700 text-green-400"
            }`}
          >
            Accomplished
          </button>
        </div>
        {viewRemain && (
          <div className="font-mono w-full list-inside list-decimal text-sm/6 text-center sm:text-left">
            <form onSubmit={handleSaveTask}>
              <div className="flex space-x-2 p-4 pt-0">
                <input
                  type="text"
                  placeholder="Title"
                  value={taskInput}
                  onChange={(e) => setTaskInput(e.target.value)}
                  className="flex-1 bg-gray-700 text-white border border-green-400 rounded-md py-2 px-4 focus:outline-none focus:ring focus:ring-green-400"
                />
                <input
                  type="text"
                  placeholder="Description"
                  value={taskDesc}
                  onChange={(e) => setTaskDesc(e.target.value)}
                  className="flex-1 bg-gray-700 text-white border border-green-400 rounded-md py-2 px-4 focus:outline-none focus:ring focus:ring-green-400"
                />
                <button type="submit" className="bg-green-500 text-white rounded-md py-2 px-4">
                  ADD
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="box-content size-128 border-4 p-4 space-y-3">
          {(viewRemain ? remainingTask : accomplishedTask).map((task) => (
            <div key={task.id} className="flex items-center justify-between border-1 p-2">
              <div className="flex-1">
                <h2> {task.title}</h2>
                <p>{task.description}</p>
              </div>
              <div className="flex space-x-2">
                <button onClick={() => handleDoneTask(task.id)} className="border-2 p-1">
                  {task.done ? "undone" : "done"}
                </button>
                <button onClick={() => handleClearTask(task.id)} className="border-2 p-1">
                  clear
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
