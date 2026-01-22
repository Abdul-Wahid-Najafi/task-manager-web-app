import React, { useState, useEffect } from "react";
import "./App.css";
import { fetchTasks, createTask } from "./api/tasks";
import TaskList from "./components/TaskList";
import Loading from "./components/Loading";
import TaskForm from "./components/TaskForm";

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [numFilterApplied, setNumFilterApplied] = useState(0);

  // NEW: show/hide form
  const [showTaskForm, setShowTaskForm] = useState(false);

  const load = async () => {
    try {
      setLoading(true);
      const params = {};
      if (statusFilter !== "all") params.status = statusFilter;
      if (priorityFilter !== "all") params.priority = priorityFilter;
      params.sortBy = "dueDate";

      const data = await fetchTasks(params);
      setTasks(data.tasks);
    } catch (e) {
      console.log("Error Loading Tasks!!!", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, [statusFilter, priorityFilter]);

  // Add a task
  const handleSaveTask = async (formData) => {
    try {
      await createTask(formData); // save to server.js
      setShowTaskForm(false); // hide form
      load(); // reload tasks
    } catch (error) {
      console.log("Error saving task", error);
      alert("Error saving task!");
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Task Manager</h1>
        <p className="mb-5">React Frontend Developer Assessment</p>
        {/* NEW: Task Form appears below button */}
        {showTaskForm && (
          <div className=" app-main transition-all duration-300 max-h-96 opacity-100 ease-in-out  p-4 border rounded-xl bg-gray-50 shadow-sm">
            <TaskForm onSubmit={handleSaveTask} />
          </div>
        )}
      </header>

      <main className="app-main">
        <div className="max-h-175 flex flex-col gap-5 bg-white p-8 rounded-xl ring ring-slate-100">
          <div className="flex items-center justify-between gap-3 border-b p-5 border-b-gray-300">
            <h1 className="font-semibold text-2xl">Your Tasks</h1>
            <div className="flex items-center gap-5">
              {/* Add New Task Button */}
              <div className="flex flex-col">
                <button
                  onClick={() => setShowTaskForm(!showTaskForm)}
                  className="flex items-center justify-center gap-1 bg-blue-500 rounded-lg py-1 px-3 text-white cursor-pointer transition-colors hover:bg-blue-600"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-4 h-4"
                  >
                    <path d="M5 12h14" />
                    <path d="M12 5v14" />
                  </svg>{" "}
                  <span>Add new task</span>
                </button>
              </div>

              {/* Filters button (unchanged) */}
              <div className="relative">
                <button
                  className="flex items-center justify-center gap-1 bg-gray-100 py-1 px-3 rounded-lg cursor-pointer transition-colors hover:bg-gray-200"
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <span>Filter</span>
                  <span>{numFilterApplied !== 0 && numFilterApplied}</span>
                </button>

                {/* Filters dropdown code remains the same */}
              </div>
            </div>
          </div>

          {loading && <Loading />}
          {!loading && tasks.length === 0 && (
            <div className="text-center text-gray-500 py-10">
              <p className="text-lg font-medium">No tasks yet</p>
              <p className="text-sm">Create your first task to get started</p>
            </div>
          )}
          {!loading && tasks.length > 0 && <TaskList tasks={tasks} />}
        </div>
      </main>
    </div>
  );
}

export default App;
