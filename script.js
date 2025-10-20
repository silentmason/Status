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

      // Build service block with optional icon
      const serviceBlock = `
        <div class="service-info">
          ${service.icon ? `<img src="${service.icon}" alt="${service.name}" class="service-icon">` : ""}
          <span>${service.name}</span>
        </div>
        <span class="status ${service.status}">${service.status}</span>
      `;

      card.innerHTML = serviceBlock;
      servicesDiv.appendChild(card);
    });

    // Render incidents
    incidentsDiv.innerHTML = "";
    if (!data.incidents || data.incidents.length === 0) {
      incidentsDiv.innerHTML = "<p>No active incidents 🎉</p>";
    } else {
      data.incidents.forEach(incident => {
  const card = document.createElement("div");
  card.className = "card";
  card.innerHTML = `
    <div class="incident-info">
      <span>${incident.title}</span>
      <span class="status ${incident.status}">${incident.status}</span>
    </div>
    ${incident.screenshot ? `<img src="${incident.screenshot}" alt="${incident.title}" class="incident-img">` : ""}
  `;
  incidentsDiv.appendChild(card);
});
    }
  } catch (err) {
    console.error("Error loading status:", err);
  }
}

loadStatus();
