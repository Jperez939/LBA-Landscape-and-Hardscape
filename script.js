const sets = [
  {
    before:"https://images.unsplash.com/photo-1501785888041-af3ef285b470",
    after:"https://images.unsplash.com/photo-1501594907352-04cda38ebc29"
  },
  {
    before:"https://images.unsplash.com/photo-1492724441997-5dc865305da7",
    after:"https://images.unsplash.com/photo-1500530855697-b586d89ba3ee"
  },
  {
    before:"https://images.unsplash.com/photo-1500534314209-a25ddb2bd429",
    after:"https://images.unsplash.com/photo-1500530855697-b586d89ba3ee"
  },
  {
    before:"https://images.unsplash.com/photo-1501785888041-af3ef285b470",
    after:"https://images.unsplash.com/photo-1501594907352-04cda38ebc29"
  },
  {
    before:"https://images.unsplash.com/photo-1492724441997-5dc865305da7",
    after:"https://images.unsplash.com/photo-1500530855697-b586d89ba3ee"
  }
];

const beforeImg = document.getElementById("beforeImg");
const afterImg = document.getElementById("afterImg");
const handle = document.getElementById("baHandle");
const container = document.querySelector(".ba-container");
const buttons = document.querySelectorAll(".ba-btn");

let isDragging = false;

/* DESKTOP DRAG */
container.addEventListener("mousedown", () => isDragging = true);
window.addEventListener("mouseup", () => isDragging = false);

container.addEventListener("mousemove", (e) => {
  if (!isDragging) return;

  const rect = container.getBoundingClientRect();
  let x = e.clientX - rect.left;
  let percent = (x / rect.width) * 100;

  percent = Math.max(0, Math.min(100, percent));

  afterImg.style.clipPath = `inset(0 ${100 - percent}% 0 0)`;
  handle.style.left = percent + "%";
});

/* TOUCH SUPPORT */
container.addEventListener("touchmove", (e) => {
  const rect = container.getBoundingClientRect();
  let x = e.touches[0].clientX - rect.left;
  let percent = (x / rect.width) * 100;

  percent = Math.max(0, Math.min(100, percent));

  afterImg.style.clipPath = `inset(0 ${100 - percent}% 0 0)`;
  handle.style.left = percent + "%";
});

/* SWITCH SET */
function switchSet(i){
  beforeImg.src = sets[i].before;
  afterImg.src = sets[i].after;

  // reset position
  afterImg.style.clipPath = "inset(0 50% 0 0)";
  handle.style.left = "50%";

  buttons.forEach(b => b.classList.remove("active"));
  buttons[i].classList.add("active");
}

// FORM
const form = document.getElementById("form");

form.addEventListener("submit", async function(e){
  e.preventDefault();

  const data = new FormData(form);

  try {
    const res = await fetch(form.action, {
      method: "POST",
      body: data,
      headers: { 'Accept': 'application/json' }
    });

    if (res.ok) {
      form.reset();
      document.getElementById("success").style.display = "block";
    } else {
      alert("Form failed to send.");
    }

  } catch (error) {
    alert("Network error. Try again.");
  }
});