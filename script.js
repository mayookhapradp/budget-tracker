document.addEventListener('DOMContentLoaded', function () {
    // Fetch budget entries from the server and populate the table
    // You would typically make an API call to the backend here

    // Example entry:
    const exampleEntry = {
        date: '2024-03-02',
        description: 'Example Expense',
        amount: 100.50
    };

    addBudgetEntryToTable(exampleEntry);
});

function addBudgetEntry() {
    // Retrieve data from the form
    const date = document.getElementById('date').value;
    const description = document.getElementById('description').value;
    const amount = parseFloat(document.getElementById('amount').value);

    // Validate data
    if (!date || !description || isNaN(amount)) {
        alert('Please fill in all fields with valid data.');
        return;
    }

    const budgetEntry = { date, description, amount };

    // You would typically make an API call to the backend to save the entry
    // Here, we're just adding it to the table for demonstration purposes
    addBudgetEntryToTable(budgetEntry);

    // Clear the form
    document.getElementById('budgetForm').reset();
}

function addBudgetEntryToTable(entry) {
    const tableBody = document.querySelector('#budgetTable tbody');
    const row = tableBody.insertRow();

    const dateCell = row.insertCell(0);
    const descriptionCell = row.insertCell(1);
    const amountCell = row.insertCell(2);

    dateCell.textContent = entry.date;
    descriptionCell.textContent = entry.description;
    amountCell.textContent = entry.amount.toFixed(2);
}
