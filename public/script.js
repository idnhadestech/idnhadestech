async function loadCompany() {
  try {
    const res = await fetch("/api/company");
    const data = await res.json();

    document.getElementById("company").innerHTML = `
      <p><b>Name:</b> ${data.name}</p>
      <p><b>Founded:</b> ${data.founded}</p>
      <p><b>Founder:</b> ${data.founder}</p>
      <p><b>Location:</b> ${data.location}</p>
    `;
  } catch (err) {
    console.log(err);
  }
}

loadCompany();

async function testAPI() {
  const res = await fetch("/api/company");
  const data = await res.json();

  document.getElementById("api-result").textContent =
    JSON.stringify(data, null, 2);
}
