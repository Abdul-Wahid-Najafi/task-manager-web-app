import { useState } from "react";

export default function TaskForm({ onSubmit, onCancel }) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    dueDate: "",
    priority: "medium",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title.trim()) {
      setError("Title is required");
      return;
    }
    onSubmit(form);
    setForm({ title: "", description: "", dueDate: "", priority: "medium" });
    setError("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center gap-3 w-full p-2 border-b border-gray-300 rounded-md hover:bg-gray-50"
    >
      {/* Title */}
      <input
        name="title"
        placeholder="Title *"
        value={form.title}
        onChange={handleChange}
        className="flex-1 p-2 border border-gray-300 rounded-md text-black text-sm focus:outline-none focus:ring-1 focus:ring-blue-400"
      />

      {/* Description */}
      <input
        name="description"
        placeholder="Description"
        value={form.description}
        onChange={handleChange}
        className="flex-1 p-2 border border-gray-300 rounded-md text-black text-sm focus:outline-none focus:ring-1 focus:ring-blue-400"
      />

      {/* Due Date */}
      <input
        type="date"
        name="dueDate"
        value={form.dueDate}
        onChange={handleChange}
        className="p-2 border border-gray-300 rounded-md text-black text-sm focus:outline-none focus:ring-1 focus:ring-blue-400"
      />

      {/* Priority */}
      <select
        name="priority"
        value={form.priority}
        onChange={handleChange}
        className="p-2 border border-gray-300 rounded-md text-black text-sm focus:outline-none focus:ring-1 focus:ring-blue-400"
      >
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>

      {/* Buttons */}
      <div className="flex gap-2">
        <button
          type="submit"
          className="bg-green-500 text-white text-sm px-3 py-1 rounded-md hover:bg-green-600 transition-colors"
        >
          Save
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-300 text-gray-700 text-sm px-3 py-1 rounded-md hover:bg-gray-400 transition-colors"
        >
          Cancel
        </button>
      </div>

      {/* Error */}
      {error && <span className="text-red-500 text-sm ml-2">{error}</span>}
    </form>
  );
}
