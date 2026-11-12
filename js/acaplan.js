// Select the HTML elements we need to interact with from acaplan.html
const taskForm = document.getElementById("taskForm");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const emptyMessage = document.getElementById("emptyMessage");

// Initialize an empty array to store all task objects
// Each task object will look like: { text: "Study HTML", completed: false }
let tasks = [];

// Listen for when the user submits the form (clicks "Add" or presses Enter)
taskForm.addEventListener("submit", function (event) {
    //Prevent the browser from refreshing the page on form submission
    event.preventDefault();

    // Get the text typed into the input box and remove extra spaces at the start/end
    const text = taskInput.value.trim();

    //Stop the function if the user tried to submit an empty task
    if (text === "") {
        return;
    }

    //Add the new task object to the end of the tasks array
    tasks.push({
        text: text,
        completed: false
    });

    // Clear the input field so the user can easily type another task
    taskInput.value = "";

    // Refresh the task list displayed on the screen
    renderTasks();
});

// Function to dynamically build and display the tasks on the webpage
function renderTasks() {
    //Clear out the existing list items so we don't duplicate tasks when re-rendering
    taskList.innerHTML = "";

    //If there are no tasks in the array, show the "No tasks yet" message and exit
    if (tasks.length === 0) {
        emptyMessage.style.display = "block";
        return;
    }

    // Hide the empty message since we have at least one task to show
    emptyMessage.style.display = "none";

    // Loop through each task in the tasks array along with its position (index)
    tasks.forEach(function (task, index) {
        //Create a new <li> element for the task
        const li = document.createElement("li");
        //Apply the "completed" class if task.completed is true (adds strikethrough styling)
        li.className = task.completed ? "task-item completed" : "task-item";

        //Create a <span> element to hold the task's text description
        const span = document.createElement("span");
        span.textContent = task.text;

        //Create a <div> container to group the "Done" and "Delete" buttons together
        const actions = document.createElement("div");
        actions.className = "task-actions";

        //Create the Complete / Undo button
        const doneBtn = document.createElement("button");
        doneBtn.textContent = task.completed ? "Undo" : "Done";
        doneBtn.className = "done-btn";
        //Attach a click event that toggles this specific task's status using its index
        doneBtn.addEventListener("click", function () {
            toggleTask(index);
        });

        //Create the Delete button
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.className = "delete-btn";
        // Attach a click event that removes this specific task using its index
        deleteBtn.addEventListener("click", function () {
            deleteTask(index);
        });

        // Put the buttons inside the actions container
        actions.appendChild(doneBtn);
        actions.appendChild(deleteBtn);

        // Put the task text and the actions container inside the <li> item
        li.appendChild(span);
        li.appendChild(actions);

        //Finally, add the finished <li> item into the <ul> list on the page
        taskList.appendChild(li);
    });
}

//Function to flip a task between completed (true) and incomplete (false)
function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    //Re-render the list so the button text and strikethrough style update immediately
    renderTasks();
}

//Function to permanently remove a task from the array
function deleteTask(index) {
    //splice(index, 1) removes 1 item starting at the given index position
    tasks.splice(index, 1);
    //Re-render the list so the deleted task disappears from the screen
    renderTasks();
}
