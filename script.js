const menuButton = document.querySelector(".menu-button");
const nav = document.querySelector(".site-nav");
const themeButtons = document.querySelectorAll("[data-theme-toggle]");
const yearTargets = document.querySelectorAll("[data-current-year]");
const githubForm = document.querySelector("[data-github-form]");
const githubMessage = document.querySelector("[data-github-message]");

if (menuButton && nav) {
  menuButton.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    menuButton.setAttribute("aria-expanded", String(isOpen));
  });

  nav.addEventListener("click", (event) => {
    if (event.target instanceof HTMLAnchorElement) {
      nav.classList.remove("is-open");
      menuButton.setAttribute("aria-expanded", "false");
    }
  });
}

if (localStorage.getItem("theme") === "alternate") {
  document.body.classList.add("alt-theme");
}

themeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const isAlternate = document.body.classList.toggle("alt-theme");
    localStorage.setItem("theme", isAlternate ? "alternate" : "default");
  });
});

yearTargets.forEach((target) => {
  target.textContent = String(new Date().getFullYear());
});

if (githubForm && githubMessage) {
  githubForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(githubForm);
    const username = String(formData.get("github-username") || "")
      .trim()
      .replace(/^@/, "");

    if (!username) {
      githubMessage.textContent = "Enter a GitHub username first.";
      return;
    }

    if (username.toLowerCase() === "achxn28") {
      githubMessage.textContent =
        "That is Andrew's GitHub username. This portfolio is connected to that account.";
      return;
    }

    githubMessage.textContent = `${username} is not Andrew's listed GitHub username. Try achxn28.`;
  });
}
