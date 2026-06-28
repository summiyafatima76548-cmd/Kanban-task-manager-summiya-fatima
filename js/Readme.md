## Features
- Add new tasks using a modal form.
- Edit existing tasks with pre-filled data.
- Delete tasks with confirmation.
- Move tasks between To Do, In Progress, and Done columns.
- Priority levels (High, Medium, Low) with color-coded badges.
- Due date picker with past date validation.
- Overdue task detection with visual indicator.
- Dynamic due date countdown (Due Today, Due Tomorrow, Due in X Days, Overdue).
- Multiple tags support with add and remove functionality.
- Search tasks by title.
- Filter tasks by priority.
- Sort tasks by newest, oldest, and due date.
- Real-time dashboard statistics (Total Tasks, To Do, In Progress, Done, Overdue, Completion Percentage).
- Clear all active search, filter, and sort options with one click.
- Progress bar showing overall task completion.
- Dark and Light mode toggle.
- Theme preference saved using Local Storage.
- data saved and restored using Local Storage.
- Responsive layout for Desktop, Tablet, and Mobile devices.
- Inline form validation for required fields.
- Empty state message when no tasks are available.

---

## Screenshorts
### Mobile tab view
![alt text](q1.PNG)
![alt text](q2.PNG)
![alt text](q3.PNG)
### Desktop board
![alt text](d1.PNG)
![alt text](d2.PNG)

---

## Technologies used 
🔹 Basic Website Technologies
1. HTML

✔️ Website ka structure banata hai

headings
buttons
sections
forms

📌 Example: page ka skeleton

2. CSS

✔️ Website ko design karta hai

colors
layout
responsive design (mobile/desktop)
styling

📌 Example: beautiful UI banana

3. JavaScript (optional but common)

✔️ Website ko interactive banata hai

buttons click
drag & drop (Kanban me important ⭐)
popup/modal
data save/load
Local Storage (data save karne ke liye)

---

## How to Run Locally

1. Download or clone the repository
2. Open project folder in VS Code
3. Open `index.html` file
4. Right click and select "Open with Live Server"
5. Project will run on your browser

---

## Data Structure

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

---

## What I Learned

- How to build a responsive website using HTML, CSS, and JavaScript
- How to manage tasks using a Kanban board system
- How to use JavaScript for adding, deleting, and moving tasks
- How to work with DOM manipulation
- How to use Local Storage to save data in browser
- How to use Git and GitHub for project uploading and version control
- How to create a clean and user-friendly UI design
