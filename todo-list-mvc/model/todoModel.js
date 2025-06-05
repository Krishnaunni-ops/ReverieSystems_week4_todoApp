export class TodoModel {
  constructor() {
    // Initialize an empty array to store tasks
    this.tasks = [];
  }

  // Add a new task to the list
  addTask(text) {
    const task = {
      id: Date.now(),        // Unique ID based on current time
      text,                  // Task description
      completed: false       // Default status
    };
    this.tasks.push(task);
    return task;
  }

  // Toggle the completion status of a task
  toggleTask(id) {
    const task = this.tasks.find(t => t.id === id);
    if (task) {
      task.completed = !task.completed;
    }
  }

  // Delete a specific task by ID
  deleteTask(id) {
    this.tasks = this.tasks.filter(t => t.id !== id);
  }

  // Remove only completed tasks
  deleteCompletedTasks() {
    this.tasks = this.tasks.filter(t => !t.completed);
  }

  // Remove all tasks
  deleteAllTasks() {
    this.tasks = [];
  }

  // Get the list of tasks
  getTasks() {
    return this.tasks;
  }
}
