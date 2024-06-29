window.onload = function() {
    const scoreCard = JSON.parse(localStorage.getItem('scoreCard'));
    if (!scoreCard) {
        alert('No data found!');
        window.location.href = 'index.html';
    }
    
    document.getElementById('studentName').textContent = scoreCard.fullName;
    document.getElementById('studentRoll').textContent = scoreCard.rollNumber;
    
    const tableBody = document.querySelector('#scoreTable tbody');
    let totalSubjects = scoreCard.subjects.length;
    let failedSubjects = 0;
    
    scoreCard.subjects.forEach(subject => {
        const row = document.createElement('tr');
        const percentage = (subject.marks / subject.outof) * 100;
        let grade = '';
        
        if (percentage < 40) {
            grade = 'Fail';
            row.classList.add('failed');
            failedSubjects++;
        } else if (percentage < 60) {
            grade = 'Pass';
        } else if (percentage < 75) {
            grade = 'First Class';
        } else {
            grade = 'Distinction';
        }
        
        row.innerHTML = `
            <td>${subject.index}</td>
            <td>${subject.name}</td>
            <td>${subject.outof}</td>
            <td>${subject.marks}</td>
            <td>${percentage.toFixed(2)}%</td>
            <td>${grade}</td>
        `;
        tableBody.appendChild(row);
    });
    
    const remarks = document.getElementById('remarks');
    if (failedSubjects > 0) {
        remarks.textContent = `Failed in ${failedSubjects} subject(s)`;
    } else if (totalSubjects === scoreCard.subjects.filter(subject => (subject.marks / subject.outof) * 100 >= 75).length) {
        remarks.textContent = 'Passed with Distinction';
    } else {
        remarks.textContent = 'Passed';
    }
};
