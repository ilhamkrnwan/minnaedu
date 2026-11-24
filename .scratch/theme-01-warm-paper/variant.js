(() => {
  const variant = new URLSearchParams(location.search).get("gaya");
  if (variant === "lembar-belajar" || variant === "panggung-cerita") {
    document.documentElement.dataset.variant = variant;
  }
})();
