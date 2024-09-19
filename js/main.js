import { links } from "./links.js";

const linkContainer = document.getElementById("links");

function addLink(name, link, image, sameTab = false) {
  const targetAttribute = sameTab ? '' : ' target="_blank"';
  return `
    <a href="${link}" class="link"${targetAttribute}>
      <img src="${image}" alt="${name}" />
      <span>${name}</span>
    </a>
  `;
}

let allLinks = "";

links.forEach(({ name, link, image, sameTab }) => {
  allLinks += addLink(name, link, image, sameTab);
});

linkContainer.innerHTML = allLinks;
