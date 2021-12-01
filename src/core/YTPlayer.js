class YTPlayer {
  constructor(id) {
    this.id = id;
    this.player;
  }
  init() {
    this.player = new YT.Player( this.id, {
      height: '390',
      width: '640',
      videoId: '',
      playerVars: {
        'playsinline': 1,
        "origin": "https://www.youtube.com"
      },
      events: {
        'onReady': this.onPlayerReady.bind(this),
        'onStateChange': this.onPlayerStateChange.bind(this)
      }
    });
    console.log(this.onPlayerReady);
  }
  play() {
    this.player.playVideo();
  }
  pause() {
    this.player.pauseVideo();
  }
  onPlayerStateChange(event) {
    switch (event.data) {
      case YT.PlayerState.PLAYING:
        this.onPlaying(event);
        break;
      case YT.PlayerState.ENDED:
        this.onEnded(event);
        break;
    }
  }
  on(event, callback) {
    this['on'+event] = callback;
  }

  set source(id) {
    this.player.loadVideoById(id);
  }
  get duration() {
    return this.player.getDuration();
  }
  get currentTime() {
    return this.player.getCurrentTime();
  }
}
export default YTPlayer;