// Array to hold reminder objects
let reminders = [];

// Function to load reminders from local storage
function loadReminders() {
    const storedReminders = localStorage.getItem('reminders');
    if (storedReminders) {
        reminders = JSON.parse(storedReminders);
        updateReminderList();
    }
}

// Function to save reminders to local storage
function saveReminders() {
    localStorage.setItem('reminders', JSON.stringify(reminders));
}

// Function to add a reminder
function addReminder() {
    const reminderText = document.getElementById('reminderInput').value;
    const reminderTime = document.getElementById('reminderTime').value;

    // Validate input
    if (!reminderText || !reminderTime) {
        alert('Please enter both a reminder and a time.');
        return;
    }

    // Add the reminder to the array
    reminders.push({ text: reminderText, time: reminderTime });

    // Save reminders to local storage
    saveReminders();

    // Clear the input fields
    document.getElementById('reminderInput').value = '';
    document.getElementById('reminderTime').value = '';

    // Update the reminder list
    updateReminderList();
}

// Function to create the edit button
function createEditButton(index) {
    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.className = 'edit';
    editButton.onclick = () => editReminder(index);
    return editButton;
}

// Function to create the delete button
function createDeleteButton(index) {
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.className = 'delete';
    deleteButton.onclick = () => deleteReminder(index);
    return deleteButton;
}

// Function to update the reminder list
function updateReminderList() {
    const reminderList = document.getElementById('reminderList');
    reminderList.innerHTML = '';

    reminders.forEach((reminder, index) => {
        const li = document.createElement('li');
        li.className = 'reminder-item';

        // Div for text content and date-time
        const textDiv = document.createElement('div');
        textDiv.className = 'reminder-details';
        textDiv.textContent = `${reminder.text} - ${new Date(reminder.time).toLocaleString()}`;

        // Div for edit and delete buttons
        const buttonContainer = document.createElement('div');
        buttonContainer.className = 'button-container';
        buttonContainer.appendChild(createEditButton(index));
        buttonContainer.appendChild(createDeleteButton(index));

        // Append all divs to the list item
        li.appendChild(textDiv);
        li.appendChild(buttonContainer);

        // Append the list item to the reminder list
        reminderList.appendChild(li);
    });
}

// Function to delete a reminder
function deleteReminder(index) {
    reminders.splice(index, 1); // Remove the reminder from the array
    saveReminders(); // Save updated reminders to local storage
    updateReminderList(); // Refresh the list display
}

// Function to edit a reminder
function editReminder(index) {
    const newReminderText = prompt('Edit your reminder:', reminders[index].text);
    if (newReminderText !== null) {
        reminders[index].text = newReminderText;
        saveReminders(); // Save updated reminders to local storage
        updateReminderList(); // Refresh the list display
    }
}

// Load reminders from local storage on page load
loadReminders();

// Attach event listener to the Set Reminder button
document.getElementById('setReminder').onclick = addReminder;
