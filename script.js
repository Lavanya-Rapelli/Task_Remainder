// Selectors
const reminderInput = document.getElementById('reminderInput');
const reminderTime = document.getElementById('reminderTime');
const setReminderButton = document.getElementById('setReminder');
const reminderList = document.getElementById('reminderList');

let reminders = [];

// Function to update the reminder list display
function updateReminderList() {
    reminderList.innerHTML = '';
    reminders.forEach((reminder, index) => {
        const li = document.createElement('li');
        li.textContent = `${reminder.text} - ${new Date(reminder.time).toLocaleString()}`;
        li.appendChild(createEditButton(index));
        li.appendChild(createDeleteButton(index));
        reminderList.appendChild(li);
    });
}

// Function to create edit button
function createEditButton(index) {
    const editButton = document.createElement('span');
    editButton.textContent = 'Edit';
    editButton.className = 'edit';
    editButton.onclick = () => editReminder(index);
    return editButton;
}

// Function to create delete button
function createDeleteButton(index) {
    const deleteButton = document.createElement('span');
    deleteButton.textContent = 'Delete';
    deleteButton.className = 'delete';
    deleteButton.onclick = () => deleteReminder(index);
    return deleteButton;
}

// Function to set a new reminder
setReminderButton.addEventListener('click', () => {
    const text = reminderInput.value.trim();
    const time = new Date(reminderTime.value).getTime();

    if (text && time > Date.now()) {
        const reminder = { text, time };
        reminders.push(reminder);
        scheduleReminder(reminder);
        updateReminderList();
        reminderInput.value = '';
        reminderTime.value = '';
    } else {
        alert("Please enter a valid reminder and time in the future.");
    }
});

// Function to schedule the reminder
function scheduleReminder(reminder) {
    const timeoutId = setTimeout(() => {
        alert(`Reminder: ${reminder.text}`);
        deleteReminder(reminders.indexOf(reminder)); // Remove reminder after it triggers
    }, reminder.time - Date.now());
    
    reminder.timeoutId = timeoutId; // Store timeoutId for later reference
}

// Function to edit a reminder
function editReminder(index) {
    const reminder = reminders[index];
    reminderInput.value = reminder.text;
    reminderTime.value = new Date(reminder.time).toISOString().slice(0, 16);
    deleteReminder(index); // Remove the reminder for editing
}

// Function to delete a reminder
function deleteReminder(index) {
    clearTimeout(reminders[index].timeoutId); // Cancel the reminder
    reminders.splice(index, 1); // Remove from the reminders array
    updateReminderList(); // Refresh the display
}
