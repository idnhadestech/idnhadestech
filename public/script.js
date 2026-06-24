async function loadCompany() {
  const res = await fetch("/api/company");
  const data = await res.json();

  document.getElementById("company").innerHTML = `
    <h3>${data.name}</h3>
    <p>Founded: ${data.founded}</p>
    <p>Founder: ${data.founder}</p>
    <p>Location: ${data.location}</p>
  `;
}

async function testAPI() {
  const res = await fetch("/api/company");
  const data = await res.json();

  document.getElementById("api-result").textContent =
    JSON.stringify(data, null, 2);
}

loadCompany();
