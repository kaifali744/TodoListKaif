// Get references to the necessary elements
const inputText = document.getElementById("input-text");
const addBtn = document.getElementById("add-btn");
const todoList = document.getElementById("todo-list");
const totalTasks = document.getElementById("total-tasks");

// Array to store the tasks
let tasks = [];

// Function to render the tasks in the list
function renderTasks() {
  let taskItems = "";

  // Loop through the tasks array and generate HTML for each task
  tasks.forEach((task, index) => {
    taskItems += `<li>
                    <input type="checkbox" id="task-${index}" ${task.completed ? "checked" : ""}>
                    <label for="task-${index}" class="${task.completed ? "checked" : ""}">${task.text}</label>
                    <button class="delete-btn" data-index="${index}">Delete</button>
                  </li>`;
  });

  // Update the todo list HTML with the generated task items
  todoList.innerHTML = taskItems;

  // Update the total tasks count
  totalTasks.textContent = tasks.length;
}

// Add event listener to the add button
addBtn.addEventListener("click", () => {
  // Check if the input text is not empty
  if (inputText.value.trim() !== "") {
    // Add a new task to the tasks array with the input text and default completed status
    tasks.push({ text: inputText.value, completed: false });

    // Clear the input text
    inputText.value = "";

    // Render the updated tasks
    renderTasks();
  }
});

// Add event listener to the todo list for handling checkbox and delete button clicks
todoList.addEventListener("click", (event) => {
  // Check if the clicked element is a checkbox
  if (event.target.tagName === "INPUT") {
    // Get the task index from the checkbox id
    const taskIndex = parseInt(event.target.id.split("-")[1]);

    // Toggle the completed status of the task
    tasks[taskIndex].completed = event.target.checked;

    // Render the updated tasks
    renderTasks();
  }
  // Check if the clicked element has the delete button class
  else if (event.target.classList.contains("delete-btn")) {
    // Get the task index from the data attribute
    const taskIndex = parseInt(event.target.dataset.index);

    // Remove the task from the tasks array
    tasks.splice(taskIndex, 1);

    // Render the updated tasks
    renderTasks();
  }
});

// Initial rendering of the tasks
renderTasks();
