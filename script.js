// Timestamp buttons: jump a video to a moment and start playback on request.
// Videos never autoplay; playback only starts when the viewer presses a button.
document.querySelectorAll('.jump').forEach(function (btn) {
  btn.addEventListener('click', function () {
    var video = document.getElementById(btn.dataset.video);
    if (!video) return;
    var t = parseFloat(btn.dataset.time) || 0;
    var seek = function () {
      video.currentTime = t;
      video.play().catch(function () {});
      video.focus();
    };
    if (video.readyState >= 1) {
      seek();
    } else {
      video.addEventListener('loadedmetadata', seek, { once: true });
      video.load();
    }
  });
});

// Pause any other video when one starts, so two never play at once.
var videos = document.querySelectorAll('video');
videos.forEach(function (v) {
  v.addEventListener('play', function () {
    videos.forEach(function (o) { if (o !== v) o.pause(); });
  });
});
