function openTaskModal(defaultColumn = "todo") {

  editingTaskId = null;   // Reset edit mode

  document.getElementById("taskForm").reset();

  currentTags = [];
  renderTagInputs();

  document.getElementById("taskColumn").value = defaultColumn;

  document.getElementById("taskModalOverlay").classList.remove("hidden");
}

function closeTaskModal() {
  document.getElementById("taskModalOverlay").classList.add("hidden");
  resetTaskForm();
}

function resetTaskForm() {
  document.getElementById("taskForm").reset();
  document.getElementById("taskId").value = "";
  document.getElementById("modalTitle").textContent = "Add New Task";
  document.getElementById("saveTaskBtn").textContent = "Save Task";

  clearErrors();

  currentTags = [];
  renderTagInputs();
}

function clearErrors() {
  document.querySelectorAll(".error").forEach(error => {
    error.textContent = "";
  });
}

function renderTagInputs() {
  const tagsContainer = document.getElementById("tagsContainer");

  if (!currentTags.length) {
    tagsContainer.innerHTML = "";
    return;
  }

  tagsContainer.innerHTML = currentTags.map(tag => `
    <div class="tag-item">
      <span>${tag}</span>
      <button type="button" class="tag-remove-btn" onclick="removeTag('${tag}')">×</button>
    </div>
  `).join("");
}
function addTag() {

  const tagInput = document.getElementById("taskTagsInput");
  const tag = tagInput.value.trim();

  if (!tag) return;

  if (!currentTags.includes(tag)) {
    currentTags.push(tag);
  }

  tagInput.value = "";
  renderTagInputs();

}

function removeTag(tagToRemove) {
  currentTags = currentTags.filter(tag => tag !== tagToRemove);
  renderTagInputs();
}

function validateTaskForm() {
  clearErrors();

  let isValid = true;

  const title = document.getElementById("taskTitle").value.trim();
  const priority = document.getElementById("taskPriority").value;
  const dueDate = document.getElementById("taskDueDate").value;
  const column = document.getElementById("taskColumn").value;

  // TITLE VALIDATION
  if (!title) {
    document.getElementById("titleError").textContent = "Title is required";
    isValid = false;
  } else if (title.length < 3) {
    document.getElementById("titleError").textContent = "Title must be at least 3 characters";
    isValid = false;
  }

  // PRIORITY VALIDATION
  if (!priority) {
    document.getElementById("priorityError").textContent = "Priority is required";
    isValid = false;
  }

  // DUE DATE VALIDATION
  if (!dueDate) {
    document.getElementById("dueDateError").textContent = "Due date is required";
    isValid = false;
  } else {
    const selectedDate = new Date(dueDate);
    const today = new Date();

    today.setHours(0, 0, 0, 0);
    selectedDate.setHours(0, 0, 0, 0);

    if (selectedDate < today) {
      document.getElementById("dueDateError").textContent = "Past date is not allowed";
      isValid = false;
    }
  }

  // COLUMN VALIDATION
  if (!column) {
    document.getElementById("columnError").textContent = "Assigned column is required";
    isValid = false;
  }

  return isValid;
}

function getTaskFormData() {
  return {
    title: document.getElementById("taskTitle").value.trim(),
    description: document.getElementById("taskDescription").value.trim(),
    priority: document.getElementById("taskPriority").value,
    dueDate: document.getElementById("taskDueDate").value,
    column: document.getElementById("taskColumn").value,
    tags: [...currentTags]
  };
}