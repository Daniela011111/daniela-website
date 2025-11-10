// ----- JSON data for your program -----
const programData = {
  courses: [
    {
      code: "COP1000",
      name: "Introduction to Programming",
      prereqs: [],
      note: "Start here if you’re new to programming."
    },
    {
      code: "COP2001",
      name: "Intermediate Programming",
      prereqs: ["COP1000"],
      note: "Builds on COP1000; focuses on problem solving and OOP basics."
    },
    {
      code: "COP2800",
      name: "Java Programming",
      prereqs: ["COP1000"],
      note: "Java path — can substitute for COP2001."
    },
    {
      code: "CIS2910",
      name: "IT Capstone Project",
      prereqs: [["COP2001", "COP2800"]],
      note: "You must complete either COP2001 OR COP2800 before this course."
    }
  ]
};

// ----- Dynamic UI -----
const courseList = document.getElementById("course-list");
let takenCourses = new Set();

function renderCourses() {
  courseList.innerHTML = ""; // Clear before re-render

  programData.courses.forEach(course => {
    const div = document.createElement("div");
    div.classList.add("course-item");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = course.code;
    checkbox.checked = takenCourses.has(course.code);

    const label = document.createElement("label");
    label.setAttribute("for", course.code);
    label.textContent = `${course.code} – ${course.name}`;

    const note = document.createElement("p");
    note.classList.add("note");
    note.textContent = course.note;

    if (!canTake(course)) {
      checkbox.disabled = true;
      div.classList.add("disabled");
    }

    checkbox.addEventListener("change", e => {
      if (e.target.checked) {
        takenCourses.add(course.code);
      } else {
        takenCourses.delete(course.code);
      }
      renderCourses(); // re-render to update available courses
    });

    div.appendChild(checkbox);
    div.appendChild(label);
    div.appendChild(note);
    courseList.appendChild(div);
  });
}

function canTake(course) {
  if (!course.prereqs || course.prereqs.length === 0) return true;

  return course.prereqs.every(req => {
    if (Array.isArray(req)) {
      return req.some(r => takenCourses.has(r)); // OR condition
    }
    return takenCourses.has(req);
  });
}

renderCourses(); // Initial page load
