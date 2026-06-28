const TASKS_KEY = "kanban_tasks";

function saveTasksToStorage(tasks) {
  localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
}

function getTasksFromStorage() {
  try {
    const data = localStorage.getItem(TASKS_KEY);

    if (!data || data === "undefined") {
      return [];
    }

    return JSON.parse(data);
  } catch (error) {
    localStorage.removeItem(TASKS_KEY);
    return [];
  }
}