/* theme-boot ≤1KB: apply ds-theme before paint (inline in <head>). */
(() => {
  try {
    const t = localStorage.getItem("ds-theme");
    const r = document.documentElement;
    if (t === "light" || t === "dark") r.setAttribute("data-theme", t);
    else r.removeAttribute("data-theme");
  } catch (_) {}
})();
