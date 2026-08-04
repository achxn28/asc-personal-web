const menuButton = document.querySelector(".menu-button");
const nav = document.querySelector(".site-nav");
const themeButtons = document.querySelectorAll("[data-theme-toggle]");
const yearTargets = document.querySelectorAll("[data-current-year]");
const lunchForm = document.querySelector("[data-lunch-form]");
const lunchButton = document.querySelector("[data-submit-order]");
const translationOutput = document.querySelector("[data-translation-output]");
const gifOutput = document.querySelector("[data-gif-output]");

const yodaApiBase = "https://api.funtranslations.com/translate/yoda";
const funTranslationsApiSecret = "";
const giphyApiBase = "https://api.giphy.com/v1/gifs/random";
const giphyApiKey = "YOUR_GIPHY_API_KEY";

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

function moveButtonAway() {
  if (!lunchButton) {
    return;
  }

  const buttonRect = lunchButton.getBoundingClientRect();
  const padding = 12;
  const maxX = Math.max(padding, window.innerWidth - buttonRect.width - padding);
  const maxY = Math.max(padding, window.innerHeight - buttonRect.height - padding);
  const randomX = Math.floor(Math.random() * (maxX - padding + 1)) + padding;
  const randomY = Math.floor(Math.random() * (maxY - padding + 1)) + padding;

  lunchButton.classList.add("is-running");
  lunchButton.style.left = `${randomX}px`;
  lunchButton.style.top = `${randomY}px`;
}

async function fetchYodaTranslation(orderText) {
  const url = `${yodaApiBase}?text=${encodeURIComponent(orderText)}`;
  const headers = funTranslationsApiSecret
    ? { "X-Funtranslations-Api-Secret": funTranslationsApiSecret }
    : {};
  const response = await fetch(url, { headers });

  if (!response.ok) {
    throw new Error("Yoda translation request failed.");
  }

  const data = await response.json();
  return data.contents?.translated || "Translate that order, Yoda could not.";
}

async function fetchRandomGif() {
  const url = `${giphyApiBase}?api_key=${giphyApiKey}&tag=lunch&rating=g`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Giphy request failed.");
  }

  const data = await response.json();
  const imageUrl =
    data.data?.images?.downsized_medium?.url || data.data?.image_url;

  if (!imageUrl) {
    throw new Error("Giphy did not return an image.");
  }

  return imageUrl;
}

async function submitLunchOrder(event) {
  event.preventDefault();

  if (!lunchForm || !translationOutput || !gifOutput || !lunchButton) {
    return;
  }

  const formData = new FormData(lunchForm);
  const orderText = String(formData.get("lunch-order") || "").trim();

  if (!orderText) {
    translationOutput.textContent = "Enter a lunch order before submitting.";
    gifOutput.replaceChildren();
    return;
  }

  lunchButton.disabled = true;
  translationOutput.textContent = "Translating your lunch order...";
  gifOutput.textContent = "Loading GIF...";

  try {
    const [translatedText, gifUrl] = await Promise.all([
      fetchYodaTranslation(orderText),
      fetchRandomGif(),
    ]);
    const gifImage = document.createElement("img");

    gifImage.src = gifUrl;
    gifImage.alt = `Random lunch GIF for: ${orderText}`;
    translationOutput.textContent = translatedText;
    gifOutput.replaceChildren(gifImage);
  } catch (error) {
    translationOutput.textContent =
      "Unable to load API results. Check the API keys and try again.";
    gifOutput.textContent = "GIF unavailable.";
  } finally {
    lunchButton.disabled = false;
  }
}

if (lunchButton) {
  lunchButton.addEventListener("mouseover", moveButtonAway);
  lunchButton.addEventListener("click", submitLunchOrder);
}

if (lunchForm) {
  lunchForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (event.submitter === lunchButton) {
      return;
    }

    submitLunchOrder(event);
  });
}
