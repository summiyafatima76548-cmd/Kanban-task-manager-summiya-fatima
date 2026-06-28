function renderBoard() {
  renderSimpleColumn("todo", "todoTasks");
  renderSimpleColumn("inprogress", "inprogressTasksList");
  renderSimpleColumn("done", "doneTasks");
 updateStatistics();
}


function renderSimpleColumn(columnName, containerId) {

  const container = document.getElementById(containerId);

  const searchText = document
  .getElementById("searchInput")
  .value
  .toLowerCase();
  const priorityFilter = document
  .getElementById("priorityFilter")
  .value;
  const sortType = document
  .getElementById("sortTasks")
  .value;

const columnTasks = tasks.filter(task => {

  return (
  task.column === columnName &&
  task.title.toLowerCase().trim().includes(searchText.trim())&&
  (priorityFilter === "" ||
    task.priority.toLowerCase() === priorityFilter)
);
});
if (sortType === "newest") {
  columnTasks.sort((a, b) => b.createdAt - a.createdAt);
}

if (sortType === "oldest") {
  columnTasks.sort((a, b) => a.createdAt - b.createdAt);
}

if (sortType === "duedate") {
  columnTasks.sort(
    (a, b) => new Date(a.dueDate) - new Date(b.dueDate)
  );
}
  if (columnTasks.length === 0) {

    container.innerHTML = `
      <div class="empty-state">
        <p>No tasks yet</p>
      </div>
    `;

    return;
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  container.innerHTML = columnTasks.map(task => {

    const dueDate = new Date(task.dueDate);
    dueDate.setHours(0, 0, 0, 0);

    const isOverdue =
      dueDate < today && task.column !== "done";
      let countdownText = "";

const diffTime = dueDate - today;
const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

if (task.column !== "done") {
  if (diffDays > 1) {
    countdownText = `Due in ${diffDays} days`;
  } else if (diffDays === 1) {
    countdownText = "Due Tomorrow";
  } else if (diffDays === 0) {
    countdownText = "Due Today";
  } else {
    countdownText = `Overdue by ${Math.abs(diffDays)} days`;
  }
}

    return `
      <div class="task-card ${isOverdue ? "overdue" : ""} ${task.column === "done" ? "done-task" : ""}">
<h3 class="${task.column === "done" ? "done-title" : ""}">
  ${task.column === "done" ? `<span class="done-icon">✔</span>` : ""}
  ${task.title}
</h3>

        ${task.tags && task.tags.length ? `
          <div class="tags-container">
            ${task.tags.map(tag => `
              <span class="tag-pill">${tag}</span>
            `).join("")}
          </div>
        ` : ""}

        <span class="priority-badge ${task.priority.toLowerCase()}">
          ${task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
        </span>

        <div class="task-actions">

          ${task.column !== "todo" ? `
            <button class="move-btn"
              onclick="moveTaskLeft(${task.id})">
              ⬅
            </button>
          ` : ""}

          ${task.column !== "done" ? `
            <button class="move-btn"
              onclick="moveTaskRight(${task.id})">
              ➡
            </button>
          ` : ""}
                    <button class="edit-btn"
            onclick="editTask(${task.id})">
            ✏ Edit
          </button>

          <button class="delete-btn"
            onclick="deleteTask(${task.id})">
            🗑 Delete
          </button>

        </div>

        <p>
          ${
            task.description
              ? task.description.length > 60
                ? task.description.substring(0, 60) + "..."
                : task.description
              : "No description"
          }
        </p>

        <small>
          Due:
          ${new Date(task.dueDate).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric"
          })}
          <p class="countdown">
  ${countdownText}
</p>
        </small>

        ${
          isOverdue
            ? `<div class="overdue-badge">Overdue</div>`
            : ""
        }

      </div>
    `;
  }).join("");
}
function updateStatistics() {

  document.getElementById("totalTasks").textContent = tasks.length;

  document.getElementById("todoCount").textContent =
    tasks.filter(task => task.column === "todo").length;

  document.getElementById("progressCount").textContent =
    tasks.filter(task => task.column === "inprogress").length;

  document.getElementById("doneCount").textContent =
    tasks.filter(task => task.column === "done").length;
// OVERDUE COUNT
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const overdueTasks = tasks.filter(task => {
    const dueDate = new Date(task.dueDate);
    dueDate.setHours(0, 0, 0, 0);

    return dueDate < today && task.column !== "done";
  });

  document.getElementById("overdueCount").textContent =
    overdueTasks.length;
const completedTasks = tasks.filter(task => task.column === "done").length;

const completion =
  tasks.length === 0
    ? 0
    : Math.round((completedTasks / tasks.length) * 100);

document.getElementById("completionPercent").textContent =
  completion + "%";
  // UPDATE PROGRESS BAR
document.getElementById("progressPercent").textContent = completion + "%";
document.getElementById("progressFill").style.width = completion + "%";
}
