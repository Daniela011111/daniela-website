let taken = [];
let courses = [];

// Load data from external JSON file
fetch('advisorData.json')
  .then(response => response.json())
  .then(data => {
    courses = data.courses;
    renderCourses();
  })
  .catch(error => console.error('Error loading advisor data:', error));

function canTake(course) {
  if (!course.prerequisites.length) return true;
  return course.prerequisites.every(req => {
    if (Array.isArray(req)) return req.some(opt => taken.includes(opt));
    return taken.includes(req);
  });
}

function renderCourses() {
  const container = document.getElementById("course-list");
  container.innerHTML = "";

  courses.forEach(course => {
    const div = document.createElement("div");
    div.classList.add("course-card");

    const title = document.createElement("h3");
    title.textContent = `${course.code}: ${course.name}`;
    div.appendChild(title);

    const note = document.createElement("p");
    note.textContent = course.notes;
    div.appendChild(note);

    const btn = document.createElement("button");
    btn.textContent = taken.includes(course.code)
      ? "Mark as Not Taken"
      : "Mark as Taken";

    btn.onclick = () => toggleCourse(course.code);
    div.appendChild(btn);

    if (taken.includes(course.code)) {
      div.classList.add("taken");
    } else if (canTake(course)) {
      div.classList.add("available");
    } else {
      div.classList.add("unavailable");
    }

    container.appendChild(div);
  });
}

function toggleCourse(code) {
  if (taken.includes(code)) {
    taken = taken.filter(c => c !== code);
  } else {
    taken.push(code);
  }
  renderCourses();
}
