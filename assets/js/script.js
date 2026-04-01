'use strict';

// Sidebar toggle (mobile)
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");
if (sidebarBtn) sidebarBtn.addEventListener("click", () => sidebar.classList.toggle("active"));

// Modal
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");
const toggleModal = () => { modalContainer.classList.toggle("active"); overlay.classList.toggle("active"); };
if (modalCloseBtn) modalCloseBtn.addEventListener("click", toggleModal);
if (overlay) overlay.addEventListener("click", toggleModal);

// Filter (portfolio)
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtns = document.querySelectorAll("[data-filter-btn]");
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = (val) => {
  filterItems.forEach(item => {
    const match = val === "all" || item.dataset.category === val;
    item.classList.toggle("active", match);
  });
};

if (select) select.addEventListener("click", () => select.classList.toggle("active"));
selectItems.forEach(item => {
  item.addEventListener("click", () => {
    const val = item.innerText.toLowerCase();
    selectValue.innerText = item.innerText;
    select.classList.remove("active");
    filterFunc(val);
  });
});

let lastBtn = filterBtns[0];
filterBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    const val = btn.innerText.toLowerCase();
    if (selectValue) selectValue.innerText = btn.innerText;
    filterFunc(val);
    lastBtn?.classList.remove("active");
    btn.classList.add("active");
    lastBtn = btn;
  });
});

// Contact form validation
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");
formInputs.forEach(input => {
  input.addEventListener("input", () => {
    formBtn.disabled = !form.checkValidity();
  });
});

// Image carousel
const carousels = [
  { cls: "mySlides_vh", idx: 0 },
  { cls: "mySlides_pm", idx: 0 },
];
function runCarousels() {
  carousels.forEach(c => {
    const slides = document.querySelectorAll(`.${c.cls}`);
    if (!slides.length) return;
    slides.forEach(s => s.style.display = "none");
    c.idx = (c.idx + 1) % slides.length;
    slides[c.idx].style.display = "block";
  });
}
setInterval(runCarousels, 3000);

// Skill bar animation on view
const fills = document.querySelectorAll(".skill-progress-fill");
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const target = e.target.style.width;
      e.target.style.width = "0";
      requestAnimationFrame(() => { e.target.style.width = target; });
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.4 });
fills.forEach(f => observer.observe(f));

// Page navigation
const navLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");
navLinks.forEach((link, i) => {
  link.addEventListener("click", () => {
    const target = link.innerHTML.trim().toLowerCase();
    pages.forEach(page => {
      const active = page.dataset.page === target;
      page.classList.toggle("active", active);
    });
    navLinks.forEach(l => l.classList.remove("active"));
    link.classList.add("active");
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});
