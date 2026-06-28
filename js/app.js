document.addEventListener("DOMContentLoaded", () => {
  tasks = getTasksFromStorage();

  setMinDueDate();
  renderBoard();
  setupSectionAEvents();
});
function setMinDueDate() {
  const dueDateInput = document.getElementById("taskDueDate");
  const today = new Date().toISOString().split("T")[0];
  dueDateInput.min = today;
}

function setupSectionAEvents() {
  const openTaskModalBtn = document.getElementById("openTaskModalBtn");
  const closeTaskModalBtn = document.getElementById("closeTaskModalBtn");
  const cancelTaskBtn = document.getElementById("cancelTaskBtn");
  const taskForm = document.getElementById("taskForm");
  const addTagBtn = document.getElementById("addTagBtn");
  const taskModalOverlay = document.getElementById("taskModalOverlay");
  const addColumnTaskBtns = document.querySelectorAll(".add-column-task-btn");
const searchInput = document.getElementById("searchInput");

searchInput.addEventListener("input", () => {
  renderBoard();
});
const priorityFilter = document.getElementById("priorityFilter");

priorityFilter.addEventListener("change", () => {
  renderBoard();
});
const sortTasks = document.getElementById("sortTasks");
const clearFiltersBtn = document.getElementById("clearFiltersBtn");

sortTasks.addEventListener("change", () => {
  renderBoard();
});
clearFiltersBtn.addEventListener("click", () => {

  document.getElementById("searchInput").value = "";
  document.getElementById("priorityFilter").value = "";
  document.getElementById("sortTasks").value = "";

  renderBoard();

});

  // OPEN MAIN ADD TASK MODAL
 const themeToggleBtn = document.getElementById("themeToggleBtn");

// OPEN MAIN ADD TASK MODAL
openTaskModalBtn.addEventListener("click", () => {
  openTaskModal("todo");
});
  // LOAD SAVED THEME
const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {
  document.body.classList.add("dark-mode");
  themeToggleBtn.textContent = "☀ Light Mode";
}
themeToggleBtn.addEventListener("click", () => {

  document.body.classList.toggle("dark-mode");

  if (document.body.classList.contains("dark-mode")) {
    themeToggleBtn.textContent = "☀ Light Mode";
    localStorage.setItem("theme", "dark");
  } else {
    themeToggleBtn.textContent = "🌙 Dark Mode";
    localStorage.setItem("theme", "light");
  }

});

  // OPEN COLUMN-SPECIFIC MODAL
  addColumnTaskBtns.forEach(button => {
    button.addEventListener("click", () => {
      openTaskModal(button.dataset.column);
    });
  });

  // CLOSE MODAL
  closeTaskModalBtn.addEventListener("click", closeTaskModal);
  cancelTaskBtn.addEventListener("click", closeTaskModal);

  // ADD TAG
  addTagBtn.addEventListener("click", addTag);

  // PRESS ENTER TO ADD TAG
  document.getElementById("taskTagsInput").addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTag();
    }
  });

  // CLICK OUTSIDE MODAL TO CLOSE
  taskModalOverlay.addEventListener("click", (e) => {
    if (e.target === taskModalOverlay) {
      closeTaskModal();
    }
  });

  // FORM SUBMIT
  taskForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const isValid = validateTaskForm();
    if (!isValid) return;

   const formData = getTaskFormData();
if (editingTaskId === null) {
  createTask(formData);
} else {
  updateTask(editingTaskId, formData);
  editingTaskId = null;
}

renderBoard();
closeTaskModal();
 });

}
