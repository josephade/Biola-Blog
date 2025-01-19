import { getUser } from "../utils/supabase";

const navLinks = document.querySelectorAll("[data-navLink]");

navLinks.forEach((link) => {
  if (link.getAttribute("href") === window.location.pathname) {
    link.setAttribute("aria-current", "page");
  }
})

window.addEventListener("DOMContentLoaded", async () => {
  const data = await getUser();

  const settings = document.getElementById("settings-link");
  const signup = document.getElementById("signup-link");
  console.log(data);
  console.log(settings);
  console.log(signup);

  if (data) {
    signup.classList.add("hidden");
    settings.classList.remove("hidden");
  }
});