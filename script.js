async function loadStatus() {
  try {
    const res = await fetch("status.json");
    const data = await res.json();

    const servicesDiv = document.getElementById("services");
    const incidentsDiv = document.getElementById("incidents");

    // Render services
    servicesDiv.innerHTML = "";
    data.services.forEach(service => {
      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `
        <span>${service.name}</span>
        <span class="status ${service.status}">${service.status}</span>
      `;
      servicesDiv.appendChild(card);
    });

    // Render incidents
    incidentsDiv.innerHTML = "";
    if (data.incidents.length === 0) {
      incidentsDiv.innerHTML = "<p>No active incidents 🎉</p>";
    } else {
      data.incidents.forEach(incident => {
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
          <span>${incident.title}</span>
          <span class="status ${incident.status}">${incident.status}</span>
        `;
        incidentsDiv.appendChild(card);
      });
    }
  } catch (err) {
    console.error("Error loading status:", err);
  }
}

loadStatus();
