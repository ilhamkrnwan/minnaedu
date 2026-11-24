(() => {
  if (!("IntersectionObserver" in window)) return;

  const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const scenes = new Map(
    Array.from(document.querySelectorAll("[data-parallax]"), scene => [
      scene,
      Array.from(scene.querySelectorAll("[data-depth]"), layer => ({
        layer,
        depth: Number(layer.dataset.depth),
      })),
    ]),
  );
  const visible = new Set();
  let frame = 0;

  function update() {
    frame = 0;
    const height = window.innerHeight;
    const strength = window.innerWidth <= 680 ? 0.46 : 1;

    // Read all scene positions before updating layer transforms.
    const positions = Array.from(visible, scene => {
      const bounds = scene.getBoundingClientRect();
      const progress = (height / 2 - bounds.top - bounds.height / 2) / (height + bounds.height);
      return [scene, Math.max(-0.5, Math.min(0.5, progress)) * strength];
    });

    for (const [scene, progress] of positions) {
      for (const { layer, depth } of scenes.get(scene)) {
        layer.style.setProperty("--parallax-y", `${(progress * depth).toFixed(2)}px`);
      }
    }
  }

  function schedule() {
    if (!frame && visible.size) frame = window.requestAnimationFrame(update);
  }

  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (entry.isIntersecting) visible.add(entry.target);
      else visible.delete(entry.target);
    }
    schedule();
  }, { rootMargin: "72px 0px" });

  function syncMotion() {
    if (motion.matches) {
      observer.disconnect();
      visible.clear();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      window.cancelAnimationFrame(frame);
      frame = 0;
      for (const layers of scenes.values()) {
        for (const { layer } of layers) layer.style.removeProperty("--parallax-y");
      }
      return;
    }

    for (const scene of scenes.keys()) observer.observe(scene);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });
  }

  motion.addEventListener("change", syncMotion);
  syncMotion();
})();
