import React from "react";

const TaskItem = ({ task }) => {
  return (
    <div className="flex items-center justify-between gap-7 rounded-xl border border-gray-300 p-4">
      <div className="flex-1">
        <h3 className="font-medium text-lg">{task.title}</h3>
        <p className="text-slate-700 text-justify">{task.description}</p>
      </div>

      <div className="flex items-center gap-4">
        <span
          className={`inline-block font-medium text-sm text-gray-700 rounded-full py-1 px-2 ${
            task.status === "pending"
              ? `bg-yellow-400`
              : task.status == "inprogress"
                ? `bg-orange-400`
                : `bg-green-600 text-white`
          }`}
        >
          {task.status}
        </span>
        <span className="inline-block font-medium text-sm">
          Due: {task.dueDate}
        </span>
        <button className="flex items-center justify-center w-6 h-6 cursor-pointer rounded-full p-0.5 transition-colors hover:bg-gray-300">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-6 h-6 stroke-gray-500"
          >
            <circle cx="12" cy="12" r="1" />
            <circle cx="19" cy="12" r="1" />
            <circle cx="5" cy="12" r="1" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default TaskItem;
