// Importing the Model and View classes
import { TodoModel } from '../model/todoModel.js';
import { TodoView } from '../view/todoView.js';

// Create instances of the Model and View
const model = new TodoModel();
const view = new TodoView();

// Helper function to refresh the UI based on current tasks
function updateView() {
  view.render(model.getTasks());
}

// === Event Bindings ===

// When a new task is added
view.bindAddTask(taskText => {
  model.addTask(taskText);   // Add to model
  updateView();              // Re-render view
});

// When a task is marked as complete or undone
view.bindCompleteTask(id => {
  model.toggleTask(id);      // Toggle completed status in model
  updateView();              // Re-render view
});

// When a task is deleted individually
view.bindDeleteTask(id => {
  model.deleteTask(id);      // Remove task from model
  updateView();              // Re-render view
});

// When all completed tasks are deleted
view.bindDeleteCompletedTasks(() => {
  model.deleteCompletedTasks();  // Remove only completed tasks
  updateView();                  // Re-render view
});

// When all tasks are deleted
view.bindDeleteAllTasks(() => {
  if (confirm('Are you sure you want to delete all tasks?')) {
    model.deleteAllTasks();  // Clear all tasks from model
    updateView();            // Re-render view
  }
});

// === Theme Toggle Logic ===

// Available theme class names
const themes = ['theme-default', 'theme-dark', 'theme-sunset', 'theme-cyberpunk'];
let currentThemeIndex = 0;

// Apply the selected theme by modifying the body's class
function applyTheme(index) {
  document.body.classList.remove(...themes);      // Remove all existing theme classes
  document.body.classList.add(themes[index]);     // Add the new one
}

// Handle theme toggle button click
const toggleBtn = document.getElementById('toggleTheme');
toggleBtn.addEventListener('click', () => {
  currentThemeIndex = (currentThemeIndex + 1) % themes.length; // Cycle through themes
  applyTheme(currentThemeIndex);                               // Apply the new theme
});

// Initialize the app with default theme
applyTheme(currentThemeIndex);

// Initial rendering of the task list
updateView();
