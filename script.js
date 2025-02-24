// Selectors
const studentForm = document.getElementById('student-form');
const recordsList = document.getElementById('records-list');

// Load records from local storage on page load
document.addEventListener('DOMContentLoaded', () => {
  const records = JSON.parse(localStorage.getItem('studentRecords')) || [];
  records.forEach(record => addRecordToDOM(record));
});

// Add new student record
studentForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const studentName = document.getElementById('student-name').value.trim();
  const studentId = document.getElementById('student-id').value.trim();
  const email = document.getElementById('email').value.trim();
  const contactNo = document.getElementById('contact-no').value.trim();

  // Validation
  if (!studentName || !studentId || !email || !contactNo) {
    alert('Please fill all fields.');
    return;
  }

  if (!/^[A-Za-z\s]+$/.test(studentName)) {
    alert('Student name should contain only letters.');
    return;
  }

  if (!/^\d+$/.test(studentId)) {
    alert('Student ID should contain only numbers.');
    return;
  }

  if (!/^\d+$/.test(contactNo)) {
    alert('Contact number should contain only numbers.');
    return;
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    alert('Please enter a valid email address.');
    return;
  }

  // Create record object
  const record = {
    studentName,
    studentId,
    email,
    contactNo,
  };

  // Add to local storage
  const records = JSON.parse(localStorage.getItem('studentRecords')) || [];
  records.push(record);
  localStorage.setItem('studentRecords', JSON.stringify(records));

  // Add to DOM
  addRecordToDOM(record);

  // Clear form
  studentForm.reset();
});

// Add record to DOM
function addRecordToDOM(record) {
  const recordElement = document.createElement('div');
  recordElement.classList.add('student-record');
  recordElement.innerHTML = `
    <div>
      <p><strong>Name:</strong> ${record.studentName}</p>
      <p><strong>ID:</strong> ${record.studentId}</p>
      <p><strong>Email:</strong> ${record.email}</p>
      <p><strong>Contact:</strong> ${record.contactNo}</p>
    </div>
    <button onclick="deleteRecord('${record.studentId}')">Delete</button>
  `;
  recordsList.appendChild(recordElement);
}

// Delete record
function deleteRecord(studentId) {
  let records = JSON.parse(localStorage.getItem('studentRecords'));
  records = records.filter(record => record.studentId !== studentId);
  localStorage.setItem('studentRecords', JSON.stringify(records));
  location.reload(); // Refresh to update the DOM
}