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

async function checkLiveStatus() {
  try {
    const apiURL = "http://verbal.dothome.co.kr/live_status.php";
    
    const response = await fetch(apiURL);
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }
    
    const data = await response.json();
    const content = data.content || {};
    
    // 방송 상태가 'OPEN'이면 방송 중
    const isLive = content.status === "OPEN";
    
    const logoContainer = document.querySelector(".logoContainer");
    if (isLive) {
      logoContainer.classList.add("live");
    } else {
      logoContainer.classList.remove("live");
    }
  } catch (error) {
    console.error("라이브 상태 확인 에러:", error);
  }
}

// 페이지 로드 시 한 번 확인 후, 1분 간격으로 갱신
checkLiveStatus();
setInterval(checkLiveStatus, 60000);
