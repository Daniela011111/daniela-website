// Fetch courses from JSON file
fetch("courses.json")
  .then(response => response.json())
  .then(courses => {
    const takenContainer = document.getElementById("takenCourses");
    const availableContainer = document.getElementById("availableCourses");

    // Create checkboxes for each course
    courses.forEach(course => {
      const div = document.createElement("div");
      div.classList.add("course-item");

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.id = course.code;
      checkbox.value = course.code;

      const label = document.createElement("label");
      label.htmlFor = course.code;
      label.textContent = `${course.code} - ${course.name}`;

      const note = document.createElement("div");
      note.classList.add("note");
      note.textContent = course.note;

      div.appendChild(checkbox);
      div.appendChild(label);
      div.appendChild(note);
      takenContainer.appendChild(div);

      // Event listener
      checkbox.addEventListener("change", updateAvailableCourses);
    });

    // Check if prerequisites are met
    function prereqsMet(course) {
      if (!course.prerequisites.length) return true;
      return course.prerequisites.some(prereq => {
        const cb = document.getElementById(prereq);
        return cb && cb.checked;
      });
    }

    // Update available courses dynamically
    function updateAvailableCourses() {
      availableContainer.innerHTML = "";
      courses.forEach(course => {
        if (!document.getElementById(course.code).checked && prereqsMet(course)) {
          const div = document.createElement("div");
          div.classList.add("course-item");
          div.textContent = `${course.code} - ${course.name}`;

          const note = document.createElement("div");
          note.classList.add("note");
          note.textContent = course.note;

          div.appendChild(note);
          availableContainer.appendChild(div);
        }
      });
    }

    // Initial display
    updateAvailableCourses();
  })
  .catch(err => console.error("Error loading courses:", err));
