(() => {
  const player = document.querySelector('[data-youtube-id]');
  if (!player) return;

  const videoId = player.dataset.youtubeId;
  const params = new URLSearchParams({
    rel: '0',
    playsinline: '1',
    origin: window.location.origin
  });

  player.src = `https://www.youtube.com/embed/${videoId}?${params.toString()}`;
})();
