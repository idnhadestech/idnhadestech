// remove loader
window.addEventListener("load", () => {
  setTimeout(() => {
    document.getElementById("loader").style.opacity = "0";
    setTimeout(() => {
      document.getElementById("loader").style.display = "none";
    }, 800);
  }, 1200);
});

// load company
fetch("/api/company")
  .then(res => res.json())
  .then(data => {
    document.getElementById("company").innerHTML = `
      <h3>${data.name}</h3>
      <p>Founded: ${data.founded}</p>
      <p>Founder: ${data.founder}</p>
      <p>Location: ${data.location}</p>
    `;
  });

// scroll reveal
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("active");
    }
  });
});

document.querySelectorAll(".reveal").forEach(el => {
  observer.observe(el);
});

// subtle parallax hero
window.addEventListener("scroll", () => {
  const hero = document.querySelector(".hero");
  let offset = window.scrollY;
  hero.style.backgroundPositionY = offset * 0.5 + "px";
});
