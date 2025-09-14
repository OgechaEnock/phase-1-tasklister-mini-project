document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("#create-task-form");
  const taskList = document.querySelector("#tasks");

  const sortPriorityAscBtn = document.querySelector("#sort-priority-asc");
  const sortPriorityDescBtn = document.querySelector("#sort-priority-desc");
  const sortDateAscBtn = document.querySelector("#sort-date-asc");
  const sortDateDescBtn = document.querySelector("#sort-date-desc");

  let tasks = [];

  const priorityOrder = { high: 3, medium: 2, low: 1 };

  function getPriorityColor(priority) {
    switch (priority) {
      case "high": return "red";
      case "medium": return "orange";
      default: return "green";
    }
  }

  // Render all tasks
  function renderTasks() {
    taskList.innerHTML = "";
    tasks.forEach((task, index) => {
      const li = document.createElement("li");

      // Checkbox section
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.checked = task.completed;
      checkbox.addEventListener("change", () => {
        task.completed = checkbox.checked;
        renderTasks();
      });