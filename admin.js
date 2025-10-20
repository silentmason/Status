let services = [];
let incidents = [];

// Render forms
function renderForms() {
  const servicesDiv = document.getElementById("services-form");
  const incidentsDiv = document.getElementById("incidents-form");

  servicesDiv.innerHTML = "";
  incidentsDiv.innerHTML = "";

  services.forEach((s, i) => {
    servicesDiv.innerHTML += `
      <div class="card">
        <input type="text" value="${s.name}" 
               onchange="services[${i}].name=this.value" />
        <select onchange="services[${i}].status=this.value">
          <option ${s.status==="operational"?"selected":""}>operational</option>
          <option ${s.status==="degraded"?"selected":""}>degraded</option>
          <option ${s.status==="down"?"selected":""}>down</option>
        </select>
        <button onclick="removeService(${i})">Remove</button>
      </div>
    `;
  });

  incidents.forEach((inc, i) => {
    incidentsDiv.innerHTML += `
      <div class="card">
        <input type="text" value="${inc.title}" 
               onchange="incidents[${i}].title=this.value" />
        <select onchange="incidents[${i}].status=this.value">
          <option ${inc.status==="investigating"?"selected":""}>investigating</option>
          <option ${inc.status==="identified"?"selected":""}>identified</option>
          <option ${inc.status==="monitoring"?"selected":""}>monitoring</option>
          <option ${inc.status==="resolved"?"selected":""}>resolved</option>
        </select>
        <button onclick="removeIncident(${i})">Remove</button>
      </div>
    `;
  });
}

// Add/remove functions
function removeService(i) { services.splice(i,1); renderForms(); }
function removeIncident(i) { incidents.splice(i,1); renderForms(); }

document.getElementById("add-service").onclick = () => {
  services.push({ name: "New Service", status: "operational" });
  renderForms();
};

document.getElementById("add-incident").onclick = () => {
  incidents.push({ title: "New Incident", status: "investigating", updated: new Date().toISOString() });
  renderForms();
};

// Export JSON
document.getElementById("export-json").onclick = () => {
  const data = { services, incidents };
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "status.json";
  a.click();
  URL.revokeObjectURL(url);
};

// Initialize with empty arrays
renderForms();
