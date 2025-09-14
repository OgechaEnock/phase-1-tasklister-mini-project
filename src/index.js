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
      const descSpan = document.createElement("span");
      descSpan.textContent = task.description;
      descSpan.style.fontWeight = "bold";
      descSpan.style.color = getPriorityColor(task.priority);

      if (task.completed) {
        descSpan.style.textDecoration = "line-through";
        descSpan.style.color = "gray";
      }
const prioritySpan = document.createElement("span");
      prioritySpan.textContent = ` [${task.priority} priority]`;
      prioritySpan.style.color = getPriorityColor(task.priority);

      const dateSpan = document.createElement("span");
      dateSpan.textContent = ` (Due: ${task.dueDate})`;
      dateSpan.style.color = "black";

      // Edit button
      const editBtn = document.createElement("button");
      editBtn.textContent = "Edit";
      editBtn.style.marginLeft = "10px";
      editBtn.addEventListener("click", () => {
        document.querySelector("#new-task-description").value = task.description;
        document.querySelector("#priority").value = task.priority;
        document.querySelector("#due-date").value = task.dueDate;
        tasks.splice(index, 1);
        renderTasks();
      });

      // Delete button
      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "Delete";
      deleteBtn.style.marginLeft = "5px";
      deleteBtn.addEventListener("click", () => {
        tasks.splice(index, 1);
        renderTasks();
      });

      li.appendChild(checkbox);
      li.appendChild(descSpan);
      li.appendChild(prioritySpan);
      li.appendChild(dateSpan);
      li.appendChild(editBtn);
      li.appendChild(deleteBtn);

      taskList.appendChild(li);
    });
  }
// Add task
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const description = document.querySelector("#new-task-description").value.trim();
    const priority = document.querySelector("#priority").value;
    const dueDate = document.querySelector("#due-date").value;

    if (!description || !dueDate) return;

    tasks.push({ description, priority, dueDate, completed: false });
    renderTasks();
    form.reset();
  });

  // Sorting buttons
  sortPriorityAscBtn.addEventListener("click", () => {
    tasks.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
    renderTasks();
  });

  sortPriorityDescBtn.addEventListener("click", () => {
    tasks.sort((a, b) => priorityOrder[b.priority] - priorityOrder[a.priority]);
    renderTasks();
  });

  sortDateAscBtn.addEventListener("click", () => {
    tasks.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
    renderTasks();
  });

  sortDateDescBtn.addEventListener("click", () => {
    tasks.sort((a, b) => new Date(b.dueDate) - new Date(a.dueDate));
    renderTasks();
  });
});
  