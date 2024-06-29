document.getElementById('studentForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const fullName = document.getElementById('fullName').value;
    const rollNumber = document.getElementById('rollNumber').value;
    
    const subjects = [];
    document.querySelectorAll('.subject-row').forEach((row, index) => {
        const subjectName = row.querySelector('.subject-name').value;
        const subjectOutof = row.querySelector('.subject-outof').value;
        const subjectMarks = row.querySelector('.subject-marks').value;
        subjects.push({
            name: subjectName,
            outof: subjectOutof,
            marks: subjectMarks,
            index: index + 1
        });
    });
    
    const scoreCard = {
        fullName: fullName,
        rollNumber: rollNumber,
        subjects: subjects
    };
    
    localStorage.setItem('scoreCard', JSON.stringify(scoreCard));
    window.location.href = 'scorecard.html';
});

function addSubject() {
    const subjectsContainer = document.getElementById('subjectsContainer');
    const newSubjectRow = document.createElement('div');
    newSubjectRow.className = 'subject-row';
    newSubjectRow.innerHTML = `
        <label>Subject:</label>
        <input type="text" class="subject-name" required pattern="[A-Za-z\s]+" title="Only alphabets allowed">
        <label>Out of:</label>
        <select class="subject-outof" required onchange="updateMaxMarks(this)">
            <option value="50">50</option>
            <option value="100">100</option>
        </select>
        <label>Obtained Marks:</label>
        <input type="number" class="subject-marks" required min="0" max="50">
        <button type="button" class="remove-subject" onclick="removeSubject(this)">Remove Subject</button>
    `;
    subjectsContainer.appendChild(newSubjectRow);
}

function removeSubject(button) {
    const subjectRow = button.parentElement;
    subjectRow.remove();
}

function updateMaxMarks(selectElement) {
    // Navigate to the corresponding obtained marks input field
    const marksLabel = selectElement.nextElementSibling; // Obtained Marks label
    const marksInput = marksLabel.nextElementSibling; // Obtained Marks input field
    
    // Get the maximum marks value from the select element
    const maxMarks = selectElement.value;
    
    // Set the max attribute of the obtained marks input field to the selected value
    marksInput.max = maxMarks;
    
    // Reset the obtained marks input field value
    marksInput.value = ''; 
}


document.addEventListener('input', function(event) {
    if (event.target.classList.contains('subject-marks')) {
        const outOf = event.target.previousElementSibling.value;
        if (event.target.value > outOf) {
            event.target.setCustomValidity(`Marks cannot be greater than ${outOf}`);
        } else {
            event.target.setCustomValidity('');
        }
    }
});
