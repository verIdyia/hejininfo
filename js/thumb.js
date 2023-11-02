let currentIndex = 0; // To keep track of the last loaded video index

document.addEventListener('DOMContentLoaded', (event) => {
  loadUntilScrollAppears(); // Load initial thumbnails
  setupModal();
  window.addEventListener('scroll', handleScroll); // Add scroll event listener
});

// Load thumbnails until the scrollbar appears
function loadUntilScrollAppears() {
  if (window.innerHeight >= document.body.offsetHeight) {
    loadThumbnails();
    setTimeout(loadUntilScrollAppears, 500); // Check again after a delay
  }
}

function handleScroll() {
  const container = document.getElementById('thumbnail-container');

  // 스크롤이 페이지 하단에 가까워지거나 썸네일이 화면 하단에 가까워지면 썸네일 로드
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 300 ||
    window.innerHeight + window.scrollY >= container.offsetHeight) {
    setTimeout(loadThumbnails, 500);
  }
}


function loadThumbnails() {
  // Display loading text
  const loadingDiv = document.createElement('div');
  loadingDiv.className = 'loading';
  loadingDiv.textContent = 'Loading...';
  document.getElementById('thumbnail-container').appendChild(loadingDiv);

  fetch('./data/IDs.txt')
    .then(response => response.text())
    .then(text => {
      const videoIDs = text.trim().split('\n').slice(currentIndex, currentIndex + 10); // Load next 10 thumbnails
      currentIndex += videoIDs.length; // Update the current index

      const container = document.getElementById('thumbnail-container');
      videoIDs.forEach(videoID => {
        const thumbnailWrapper = document.createElement('div');
        thumbnailWrapper.className = 'thumbnail-wrapper';
        thumbnailWrapper.innerHTML = `
          <img class="thumbnail" src="https://img.youtube.com/vi/${videoID}/hqdefault.jpg" alt="Video Thumbnail" data-fullres="https://img.youtube.com/vi/${videoID}/maxresdefault.jpg">
        `;
        container.appendChild(thumbnailWrapper);
      });
      // Remove loading text
      document.getElementById('thumbnail-container').removeChild(loadingDiv);

      // Add click event to thumbnails
      document.querySelectorAll('.thumbnail').forEach(thumbnail => {
        thumbnail.addEventListener('click', function() {
          showModal(this.dataset.fullres);
        });
      });
    })
    .catch(error => {
      console.error('Error loading the video IDs:', error);
    });
}

function setupModal() {
  // Get the modal
  var modal = document.getElementById('modal');

  // Get the <span> element that closes the modal
  var span = document.getElementsByClassName('close')[0];

  // When the user clicks on <span> (x), close the modal
  span.onclick = function() {
    modal.style.display = 'none';
  }

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = 'none';
    }
  }
}

function showModal(imageSrc) {
  // Get the image and insert it inside the modal
  var modalImg = document.getElementById('modal-image');
  var modal = document.getElementById('modal');

  modal.style.display = 'block';
  modalImg.src = imageSrc;
}
