function toggleMenu() {
  document.getElementById("nav").classList.toggle("active");
}

// FADE-IN
const fades = document.querySelectorAll('.fade');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add('show');
    }
  });
});
fades.forEach(fade => observer.observe(fade));

// FORM SUBMIT
const form = document.getElementById("contact-form");
const successMessage = document.getElementById("success-message");

form.addEventListener("submit", async function(e) {
  e.preventDefault();

  const data = new FormData(form);

  const response = await fetch("https://formspree.io/f/yourID", {
    method: "POST",
    body: data,
    headers: {
      'Accept': 'application/json'
    }
  });

  if (response.ok) {
    form.style.display = "none";
    successMessage.style.display = "block";
    setTimeout(() => {
      successMessage.classList.add("show");
    }, 100);
  } else {
    alert("Something went wrong. Please try again.");
  }
});