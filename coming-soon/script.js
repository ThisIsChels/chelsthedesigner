// Phone menu: opens and closes the full-screen overlay.

const menuButton = document.querySelector(".nav-bar .menu-button");
const overlay = document.getElementById("menu-overlay");
const closeButton = overlay.querySelector(".menu-overlay__close");

function openMenu() {
  overlay.hidden = false;
  menuButton.setAttribute("aria-expanded", "true");
  document.body.style.overflow = "hidden";   // stop the page scrolling behind the menu
  closeButton.focus();                       // move keyboard focus into the menu
}

function closeMenu() {
  overlay.hidden = true;
  menuButton.setAttribute("aria-expanded", "false");
  document.body.style.overflow = "";
  menuButton.focus();                        // hand focus back to where it came from
}

menuButton.addEventListener("click", openMenu);
closeButton.addEventListener("click", closeMenu);

// Escape closes the menu
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !overlay.hidden) {
    closeMenu();
  }
});

// Tapping a link in the menu closes it
overlay.addEventListener("click", (event) => {
  if (event.target.closest("a")) {
    closeMenu();
  }
});
