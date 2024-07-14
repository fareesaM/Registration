const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav-links');

burger.addEventListener('click', () => {
    nav.classList.toggle('nav-active');
    burger.classList.toggle('toggle');
});

document.getElementById('addButton').addEventListener('click', function() {
    const fname = document.getElementById('fname').value.trim();
    const lname = document.getElementById('lname').value.trim();
    const number = document.getElementById('number').value.trim();
    const contact = document.getElementById('contact').value.trim();
    const address = document.getElementById('address').value.trim();

    if (fname !== "" && lname !== "" && number !== "" && contact !== "" && address !== "") {
        addRow(fname, lname, number, contact, address);
        saveToLocalStorage();
        resetForm();
    } else {
        alert("Please fill all the fields.");
    }
});

// add data to the table
function addRow(fname, lname, number, contact, address, fromStorage = false) {
    const table = document.getElementById('dataTable').getElementsByTagName('tbody')[0];
    const newRow = table.insertRow();

    const cell1 = newRow.insertCell(0);
    const cell2 = newRow.insertCell(1);
    const cell3 = newRow.insertCell(2);
    const cell4 = newRow.insertCell(3);
    const cell5 = newRow.insertCell(4);
    const cell6 = newRow.insertCell(5);

    cell1.innerText = fname;
    cell2.innerText = lname;
    cell3.innerText = number;
    cell4.innerText = contact;
    cell5.innerText = address;
    cell6.innerHTML = '<button id="edit" onclick="editRow(this)">Edit</button> <button id="delete" onclick="deleteRow(this)">Delete</button>';

    if (!fromStorage) {
        saveToLocalStorage();
    }
}

function editRow(btn) {
    const row = btn.parentNode.parentNode;
    document.getElementById('fname').value = row.cells[0].innerText;
    document.getElementById('lname').value = row.cells[1].innerText;
    document.getElementById('number').value = row.cells[2].innerText;
    document.getElementById('contact').value = row.cells[3].innerText;
    document.getElementById('address').value = row.cells[4].innerText;

    deleteRow(btn);
}

function deleteRow(btn) {
    const row = btn.parentNode.parentNode;
    row.parentNode.removeChild(row);
    saveToLocalStorage();
}

// reset form

function resetForm() {
    document.getElementById('fname').value = "";
    document.getElementById('lname').value = "";
    document.getElementById('number').value = "";
    document.getElementById('contact').value = "";
    document.getElementById('address').value = "";
}


document.getElementById('resetTableButton').addEventListener('click', function() {
    const tableBody = document.getElementById('dataTable').getElementsByTagName('tbody')[0];
    tableBody.innerHTML = "";
    saveToLocalStorage();
});


// i have added it to local storage just for testing while building the table
function saveToLocalStorage() {
    const table = document.getElementById('dataTable').getElementsByTagName('tbody')[0];
    const rows = Array.from(table.rows);
    const data = rows.map(row => ({
        fname: row.cells[0].innerText,
        lname: row.cells[1].innerText,
        number: row.cells[2].innerText,
        contact: row.cells[3].innerText,
        address: row.cells[4].innerText
    }));
    localStorage.setItem('studentData', JSON.stringify(data));
}

function loadFromLocalStorage() {
    const data = JSON.parse(localStorage.getItem('studentData')) || [];
    data.forEach(student => addRow(student.fname, student.lname, student.number, student.contact, student.address, true));
}

window.onload = loadFromLocalStorage;
