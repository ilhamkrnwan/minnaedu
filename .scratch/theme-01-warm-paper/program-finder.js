const finder = document.querySelector(".program-finder");
const level = document.getElementById("hero-level");

finder?.addEventListener("submit", event => {
  const target = document.getElementById(level?.value || "program");
  if (!target) return;

  event.preventDefault();
  if (location.hash !== `#${target.id}`) location.hash = target.id;
  target.focus({ preventScroll: true });
  target.scrollIntoView();
});
