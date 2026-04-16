// DATA
const sets=[
{before:"https://images.unsplash.com/photo-1501785888041-af3ef285b470",after:"https://images.unsplash.com/photo-1501594907352-04cda38ebc29"},
{before:"https://images.unsplash.com/photo-1492724441997-5dc865305da7",after:"https://images.unsplash.com/photo-1500530855697-b586d89ba3ee"},
{before:"https://images.unsplash.com/photo-1492724441997-5dc865305da7",after:"https://images.unsplash.com/photo-1501594907352-04cda38ebc29"},
{before:"https://images.unsplash.com/photo-1501785888041-af3ef285b470",after:"https://images.unsplash.com/photo-1501594907352-04cda38ebc29"},
{before:"https://images.unsplash.com/photo-1492724441997-5dc865305da7",after:"https://images.unsplash.com/photo-1500530855697-b586d89ba3ee"}
];

const slider=document.getElementById("baSlider");
const afterWrapper=document.getElementById("afterWrapper");
const line=document.getElementById("baLine");
const beforeImg=document.getElementById("beforeImg");
const afterImg=document.getElementById("afterImg");
const buttons=document.querySelectorAll(".ba-btn");

// SLIDER
slider.addEventListener("input",()=>{
  const val=slider.value;
  afterWrapper.style.width=val+"%";
  line.style.left=val+"%";
});

// SWITCH
function switchSet(i){
  beforeImg.src=sets[i].before;
  afterImg.src=sets[i].after;

  slider.value=50;
  afterWrapper.style.width="50%";
  line.style.left="50%";

  buttons.forEach(b=>b.classList.remove("active"));
  buttons[i].classList.add("active");
}

// FORM
document.getElementById("form").addEventListener("submit",async e=>{
  e.preventDefault();

  const res=await fetch("https://formspree.io/f/yourID",{
    method:"POST",
    body:new FormData(e.target),
    headers:{'Accept':'application/json'}
  });

  if(res.ok){
    e.target.style.display="none";
    document.getElementById("success").style.display="block";
  }
});