// imports
import { links } from "./links.js";
//constants

const linkContainer = document.getElementById("links");

//functions

function addLink(name, link, image, sameTab = false) {
  const targetAttribute = sameTab ? '' : ' target="_blank"';
  return `
  <a href="${link}" class="link"${targetAttribute}>
    <img src="${image}" alt="${name}"/>
    <span>${name}</span>
  </a>
  `;
}

// logic

let allLinks = "";

links.forEach((ele) => {
  let link = ele.link;
  let name = ele.name;
  let image = ele.image;
  let sameTab = ele.sameTab || false;

  allLinks += addLink(name, link, image, sameTab);
});

linkContainer.innerHTML = allLinks;


linkContainer.innerHTML = allLinks;
