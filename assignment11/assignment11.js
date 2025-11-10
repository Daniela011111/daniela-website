// Sample JSON data for courses
const courses = [
  { code: "COP2001", name: "Programming Fundamentals", prerequisites: [], note: "Introductory course." },
  { code: "COP2800", name: "Data Structures", prerequisites: [["COP2001"]], note: "You must take COP2001 first." },
  { code: "COP3000", name: "Advanced Programming", prerequisites: [["COP2001", "COP2800"]], note: "Either COP2001 or COP2800 is required." }
];

const takenDiv = document.getElementById("takenCourses");
const availableDiv = document.getElementById("availableCourses");

// Dynamically create checkboxes for each course
function createCourseCheckbox(course) {
  const div = document.createElement("div");
  div.className = "course";
  
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.id = course.code;
  checkbox.value = course.code;

  const label = document.createElement("label");
  label.htmlFor = course.code;
  label.textContent = `${course.code}: ${course.name}`;

  div.appendChild(checkbox);
  div.appendChild(label);
  takenDiv.appendChild(div);

  checkbox.addEventListener("change", updateAvailableCourses);
}

// Check if user has taken at least one course in an OR group
function hasTaken(courseCodes, takenCourses) {
  return courseCodes.some(code => takenCourses.includes(code));
}

// Update available courses dynamically
function updateAvailableCourses() {
  const takenCourses = Array.from(takenDiv.querySelectorAll("input:checked")).map(cb => cb.value);
  availableDiv.innerHTML = "";

  courses.forEach(course => {
    if (takenCourses.includes(course.code)) return; // Skip already taken

    const canTake = course.prerequisites.every(prereqGroup => hasTaken(prereqGroup, takenCourses));

    const div = document.createElement("div");
    div.className = `course ${canTake ? 'available' : 'unavailable'}`;
    div.textContent = `${course.code}: ${course.name} ${course.note ? `(${course.note})` : ''}`;

    availableDiv.appendChild(div);
  });
}

// Initialize checkboxes
courses.forEach(createCourseCheckbox);

// Initial display
updateAvailableCourses();
