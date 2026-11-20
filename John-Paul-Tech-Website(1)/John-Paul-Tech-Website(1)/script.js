const body = document.body;
const themeToggle = document.getElementById("themeToggle");
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
const backToTop = document.getElementById("backToTop");
const year = document.getElementById("year");

if (year) year.textContent = new Date().getFullYear();

const savedTheme = localStorage.getItem("jpt-theme");
if (savedTheme === "dark") body.classList.add("dark");

function updateThemeIcon() {
  if (themeToggle) themeToggle.textContent = body.classList.contains("dark") ? "☀" : "☾";
}
updateThemeIcon();

themeToggle?.addEventListener("click", () => {
  body.classList.toggle("dark");
  localStorage.setItem("jpt-theme", body.classList.contains("dark") ? "dark" : "light");
  updateThemeIcon();
});

menuToggle?.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(open));
  menuToggle.textContent = open ? "×" : "☰";
});

document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks?.classList.remove("open");
    menuToggle?.setAttribute("aria-expanded", "false");
    if (menuToggle) menuToggle.textContent = "☰";
  });
});

window.addEventListener("scroll", () => {
  if (window.scrollY > 450) backToTop?.classList.add("show");
  else backToTop?.classList.remove("show");
});
backToTop?.addEventListener("click", () => window.scrollTo({top:0, behavior:"smooth"}));

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, {threshold:.12});
document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
document.querySelectorAll(".gallery-item").forEach(item => {
  item.addEventListener("click", () => {
    lightboxImage.src = item.dataset.image;
    lightbox.classList.add("open");
    lightbox.setAttribute("aria-hidden", "false");
  });
});
function closeLightbox() {
  lightbox?.classList.remove("open");
  lightbox?.setAttribute("aria-hidden", "true");
  if (lightboxImage) lightboxImage.src = "";
}
document.querySelector(".lightbox-close")?.addEventListener("click", closeLightbox);
lightbox?.addEventListener("click", e => { if (e.target === lightbox) closeLightbox(); });
document.addEventListener("keydown", e => { if (e.key === "Escape") closeLightbox(); });

const contactForm = document.getElementById("contactForm");
if (contactForm) {
  const params = new URLSearchParams(window.location.search);
  const serviceParam = params.get("service");
  if (serviceParam) {
    const serviceSelect = document.getElementById("service");
    if (serviceSelect) serviceSelect.value = serviceParam;
  }

  contactForm.addEventListener("submit", e => {
    e.preventDefault();
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const service = document.getElementById("service").value || "General Enquiry";
    const message = document.getElementById("message").value.trim();

    const text =
      `Hello John Paul Tech,%0A%0A` +
      `Name: ${encodeURIComponent(name)}%0A` +
      `Email: ${encodeURIComponent(email)}%0A` +
      `Phone: ${encodeURIComponent(phone)}%0A` +
      `Service: ${encodeURIComponent(service)}%0A` +
      `Project details: ${encodeURIComponent(message)}`;

    window.open(`https://wa.me/2349110317271?text=${text}`, "_blank", "noopener");
  });
}
