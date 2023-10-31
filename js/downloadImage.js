document.getElementById('download-btn').addEventListener('click', function() {
  var youtubeUrl = document.getElementById('youtube-url').value;
  var videoId;

  // URL에서 비디오 ID 추출
  if (youtubeUrl.includes('youtube.com')) {
    // 표준 YouTube 링크 처리
    videoId = youtubeUrl.split('v=')[1];
  } else if (youtubeUrl.includes('youtu.be')) {
    // 짧은 YouTube 공유 링크 처리
    videoId = youtubeUrl.split('youtu.be/')[1];
  }

  // 비디오 ID에서 '&' 또는 '?' 이후의 부분 제거
  var extraParamsPosition = videoId.search(/[\?&]/);
  if (extraParamsPosition !== -1) {
    videoId = videoId.substring(0, extraParamsPosition);
  }

  // 고해상도 이미지 URL 생성
  var highestQualityImageUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

  // 새 탭에서 이미지 열기
  window.open(highestQualityImageUrl, '_blank');
});
