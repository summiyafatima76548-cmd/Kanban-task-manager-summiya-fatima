let tasks = [];
let currentTags = [];

function createTask(taskData) {
  const newTask = {
    id: Date.now(),
    title: taskData.title,
    description: taskData.description || "",
    priority: taskData.priority,
    column: taskData.column,
    dueDate: taskData.dueDate,
    tags: taskData.tags ? [...new Set(taskData.tags.map(t => t.toLowerCase()))] : [],
    createdAt: Date.now()
  };

  tasks.push(newTask);
  saveTasksToStorage(tasks);

  return newTask;
}
function deleteTask(taskId) {

  const confirmDelete = confirm("Are you sure you want to delete this task?");

  if (!confirmDelete) {
    return;
  }

  tasks = tasks.filter(task => task.id !== taskId);

  saveTasksToStorage(tasks);

  renderBoard();
}
function updateTask(taskId, updatedData) {

  const task = tasks.find(task => task.id === taskId);

  if (!task) return;

  task.title = updatedData.title;
  task.description = updatedData.description;
  task.priority = updatedData.priority;
  task.column = updatedData.column;
  task.dueDate = updatedData.dueDate;
  task.tags = [...updatedData.tags];

  saveTasksToStorage(tasks);
}
function moveTaskRight(taskId) {

  const task = tasks.find(task => task.id === taskId);

  if (!task) return;

  if (task.column === "todo") {
    task.column = "inprogress";
  } else if (task.column === "inprogress") {
    task.column = "done";
  }

  saveTasksToStorage(tasks);
  renderBoard();
}

function moveTaskLeft(taskId) {

  const task = tasks.find(task => task.id === taskId);

  if (!task) return;

  if (task.column === "done") {
    task.column = "inprogress";
  } else if (task.column === "inprogress") {
    task.column = "todo";
  }

  saveTasksToStorage(tasks);
  renderBoard();
}
let editingTaskId = null;

function editTask(taskId) {

  editingTaskId = taskId;

  const task = tasks.find(task => task.id === taskId);

  if (!task) return;

  openTaskModal(task.column);

  document.getElementById("modalTitle").textContent = "Edit Task";

  document.getElementById("taskTitle").value = task.title;

  document.getElementById("taskDescription").value = task.description;

  document.getElementById("taskPriority").value = task.priority;

  document.getElementById("taskDueDate").value = task.dueDate;

}