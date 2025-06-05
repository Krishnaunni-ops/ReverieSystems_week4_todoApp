export class TodoView {
  constructor() {
    // Cache DOM elements for interaction
    this.taskInput = document.getElementById('taskInput');
    this.addBtn = document.getElementById('addBtn');
    this.taskList = document.getElementById('taskList');
    this.deleteCompletedBtn = document.getElementById('deleteCompletedBtn');
    this.deleteAllBtn = document.getElementById('deleteAllBtn');
  }

  // Bind handler for adding a task
  bindAddTask(handler) {
    const addTask = () => {
      if (this.taskInput.value.trim()) {
        handler(this.taskInput.value.trim());
        this.taskInput.value = '';
      }
    };

    this.addBtn.addEventListener('click', addTask);
    this.taskInput.addEventListener('keypress', e => {
      if (e.key === 'Enter') addTask();
    });
  }

  // Bind handler to toggle task completion
  bindCompleteTask(handler) {
    this.taskList.addEventListener('click', e => {
      if (e.target.classList.contains('complete-btn')) {
        const li = e.target.closest('li');
        if (!li) return;
        const id = Number(li.dataset.id);
        handler(id);
      }
    });
  }

  // Bind handler to delete individual task
  bindDeleteTask(handler) {
    this.taskList.addEventListener('click', e => {
      if (e.target.classList.contains('delete')) {
        const li = e.target.closest('li');
        if (!li) return;
        const id = Number(li.dataset.id);
        handler(id);
      }
    });
  }

  // Bind handler to delete completed tasks
  bindDeleteCompletedTasks(handler) {
    if (this.deleteCompletedBtn) {
      this.deleteCompletedBtn.addEventListener('click', handler);
    }
  }

  // Bind handler to delete all tasks
  bindDeleteAllTasks(handler) {
    if (this.deleteAllBtn) {
      this.deleteAllBtn.addEventListener('click', handler);
    }
  }

  // Render task list
  render(tasks) {
    if (!this.taskList) return;
    this.taskList.innerHTML = '';

    tasks.forEach(task => {
      const li = document.createElement('li');
      li.dataset.id = task.id;
      li.style.display = 'flex';
      li.style.justifyContent = 'space-between';
      li.style.alignItems = 'center';

      // Task text
      const textSpan = document.createElement('span');
      textSpan.textContent = task.text;
      if (task.completed) {
        textSpan.classList.add('completed'); // Add strike-through if completed
      }

      // "Complete"/"Undo" button
      const completeBtn = document.createElement('button');
      completeBtn.textContent = task.completed ? 'Undo' : 'Complete';
      completeBtn.classList.add('complete-btn');
      completeBtn.style.marginRight = '10px';

      // Delete button
      const deleteBtn = document.createElement('span');
      deleteBtn.textContent = '❌';
      deleteBtn.classList.add('delete');
      deleteBtn.style.cursor = 'pointer';

      // Right side controls (complete + delete)
      const rightDiv = document.createElement('div');
      rightDiv.style.display = 'flex';
      rightDiv.style.alignItems = 'center';
      rightDiv.appendChild(completeBtn);
      rightDiv.appendChild(deleteBtn);

      // Append task and controls to list item
      li.appendChild(textSpan);
      li.appendChild(rightDiv);

      // Add list item to the DOM
      this.taskList.appendChild(li);
    });
  }
}
