let subjects = JSON.parse(localStorage.getItem("subjects")) || [];

const form = document.getElementById("form");
const list = document.getElementById("list");
const finalGpa = document.getElementById("finalGpa");

function gradeAndGpa(percent) {

    if (percent >= 85) return { grade: "A", gpa: 4.0 };
    if (percent >= 80) return { grade: "A-", gpa: 3.7 };
    if (percent >= 75) return { grade: "B+", gpa: 3.3 };
    if (percent >= 70) return { grade: "B", gpa: 3.0 };
    if (percent >= 65) return { grade: "C+", gpa: 2.7 };
    if (percent >= 60) return { grade: "C", gpa: 2.3 };
    if (percent >= 50) return { grade: "D", gpa: 2.0 };

    return { grade: "F", gpa: 0.0 };
}

function render() {

    list.innerHTML = "";

    subjects.forEach((s, index) => {

        const tr = document.createElement("tr");

        tr.innerHTML = `
            <td>${s.subject}</td>
            <td>${s.marks}</td>
            <td>${s.total}</td>
            <td>${s.percent.toFixed(2)}</td>
            <td>${s.grade}</td>
            <td>${s.gpa.toFixed(2)}</td>
            <td><button onclick="removeItem(${index})">Delete</button></td>
        `;

        list.appendChild(tr);
    });

    calculateOverall();
    localStorage.setItem("subjects", JSON.stringify(subjects));
}

function calculateOverall(){

    if(subjects.length === 0){
        finalGpa.textContent = "Overall GPA: 0.00";
        return;
    }

    let total = 0;

    subjects.forEach(s => total += s.gpa);

    let gpa = total / subjects.length;

    finalGpa.textContent = "Overall GPA: " + gpa.toFixed(2);
}

form.addEventListener("submit", function(e){

    e.preventDefault();

    const subject = document.getElementById("subject").value.trim();
    const marks = Number(document.getElementById("marks").value);
    const total = Number(document.getElementById("total").value);

    if(marks < 0 || total <= 0 || marks > total){
        alert("Invalid marks");
        return;
    }

    const percent = (marks / total) * 100;

    const result = gradeAndGpa(percent);

    subjects.push({
        subject,
        marks,
        total,
        percent,
        grade: result.grade,
        gpa: result.gpa
    });

    form.reset();
    render();
});

function removeItem(i){
    subjects.splice(i,1);
    render();
}

render();
