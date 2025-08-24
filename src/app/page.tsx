"use client";

import { useState } from "react";

export default function Home() {
  const [taskInput, setTaskInput] = useState("");
  const [tasks, setTasks] = useState<{ id: number; content: string; done: boolean }[]>([]);

  const handleSaveTask = () => {
    if (taskInput.trim() === "") {
      return;
    }
    const newTask = {
      id: Date.now(),
      content: taskInput,
      done: false,
    };
    setTasks([newTask, ...tasks]);
    setTaskInput("");
  };

  const handleDoneTask = (id: number) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, done: !task.done } : task)));
  };

  const handleDeleteTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id != id));
  };

  const [viewRemain, setViewRemain] = useState(true);
  const remainingTask = tasks.filter((task) => !task.done);
  const accomplishedTask = tasks.filter((task) => task.done);

  return (
    <div className="font-sans items-center justify-items-center min-h-screen ">
      <main className="flex flex-col row-start-2 items-center sm:items-start">
        <div className="font-mono flex justify-center w-full max-w-2xl space-x-4 p-4">
          <button onClick={() => setViewRemain(true)} className=" bg-gray-700 text-green-400 border border-green-400 rounded-md py-2 px-6">
            Remaining
          </button>
          <button onClick={() => setViewRemain(false)} className="bg-gray-700 text-green-400 border border-green-400 rounded-md py-2 px-6">
            Accomplished
          </button>
        </div>
        {viewRemain && (
          <ol className="font-mono w-full list-inside list-decimal text-sm/6 text-center sm:text-left">
            <div className="flex space-x-2 p-4 pt-0">
              <input
                type="text"
                placeholder="What's next?"
                value={taskInput}
                onChange={(e) => setTaskInput(e.target.value)}
                className="flex-1 bg-gray-700 text-white border border-green-400 rounded-md py-2 px-4 focus:outline-none focus:ring focus:ring-green-400"
              />
              <button onClick={handleSaveTask} className="bg-green-500 text-white rounded-md py-2 px-4">
                ADD
              </button>
            </div>
          </ol>
        )}
        <div className="box-content size-128 border-4 p-4 space-y-3">
          {(viewRemain ? remainingTask : accomplishedTask).map((task) => (
            <div key={task.id} className="flex items-center justify-between">
              <div className="flex-1">{task.content}</div>
              <div className="flex space-x-2">
                <button onClick={() => handleDoneTask(task.id)} className="border-2 p-1">
                  done
                </button>
                <button onClick={() => handleDeleteTask(task.id)} className="border-2 p-1">
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
