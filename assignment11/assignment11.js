let courses = [];
let takenCourses = new Set();

// Load courses.json
fetch('courses.json')
  .then(response => response.json())
  .then(data => {
    courses = data;
    renderCourses();
  })
  .catch(err => console.error('Error loading courses.json:', err));

// Render courses
function renderCourses() {
  const takenDiv = document.getElementById('takenCourses');
  const availableDiv = document.getElementById('availableCourses');
  takenDiv.innerHTML = '';
  availableDiv.innerHTML = '';

  courses.forEach(course => {
    // Courses Taken Checkbox
    const takenItem = document.createElement('div');
    takenItem.className = 'course-item';

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = `taken-${course.code}`;
    checkbox.checked = takenCourses.has(course.code);

    checkbox.addEventListener('change', () => {
      if (checkbox.checked) takenCourses.add(course.code);
      else takenCourses.delete(course.code);
      renderCourses();
    });

    const label = document.createElement('label');
    label.htmlFor = `taken-${course.code}`;
    label.textContent = `${course.code}: ${course.name}`;

    takenItem.appendChild(checkbox);
    takenItem.appendChild(label);

    if (course.note) {
      const note = document.createElement('div');
      note.className = 'note';
      note.textContent = course.note;
      takenItem.appendChild(note);
    }

    takenDiv.appendChild(takenItem);

    // Available Courses
    if (canTake(course)) {
      const availItem = document.createElement('div');
      availItem.className = 'course-item';
      availItem.textContent = `${course.code}: ${course.name}`;
      if (course.note) {
        const note = document.createElement('div');
        note.className = 'note';
        note.textContent = course.note;
        availItem.appendChild(note);
      }
      availableDiv.appendChild(availItem);
    }
  });
}

// Check if course can be taken
function canTake(course) {
  if (takenCourses.has(course.code)) return false;
  if (course.prerequisites.length === 0) return true;
  return course.prerequisites.some(pr => takenCourses.has(pr));
}
