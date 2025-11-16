fetch("cms-data.json")
    .then(response => response.json())
    .then(data => {
        const tbody = document.querySelector("#cmsTable tbody");

        data.forEach(cms => {
            const row = document.createElement("tr");

            row.innerHTML = `
                <td>${cms.name}</td>
                <td>${cms.support}</td>
                <td>${cms.technology}</td>
                <td>${cms.capabilities}</td>
                <td>${cms.limitations}</td>
                <td><a href="${cms.example}" target="_blank">${cms.example}</a></td>
            `;

            tbody.appendChild(row);
        });
    })
    .catch(error => console.error("Error loading JSON:", error));
