import AppComponent from '../../core/AppComponent';
import {getHTML} from './getHTML';
import Plyr from 'plyr';
import {findEl, timeFormat} from '../../core/utils';

class Player extends AppComponent {
  constructor(emmiter, store) {
    super({
      name: 'player',
      emmiter,
      store,
      listeners: ['click']
    });
    this.playlist = null;
    this.prev = null;
    this.current = null;
    this.next = null;
    this.subscribe('playlistItem::chose', this.update.bind(this));
  }

  get getHTML() {
    return `
    <div class="player">
        ${getHTML()} 
    </div>
    <div class="plyr__video-embed" id="player">
      <iframe
        src="https://www.youtube.com/embed/bTqVqk7FSmY?origin=https://plyr.io&amp;iv_load_policy=3&amp;modestbranding=1&amp;playsinline=1&amp;showinfo=0&amp;rel=0&amp;enablejsapi=1"
        allowtransparency>
       </iframe>
    </div>  
`;
  }
  init() {
    super.init();
    this.player = new Plyr('#player');
    this.player.on('ready', ()=>{
      this.$fulltime.textContent = timeFormat(this.player.duration);
      this.player.togglePlay();
      this.$btn.innerHTML = `<svg width="17" height="20" viewBox="0 0 17 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3.1875 0C4.03288 0 4.84363 0.335825 5.4414 0.933597C6.03918 1.53137 6.375 2.34212 6.375 3.1875V15.9375C6.375 16.7829 
      6.03918 17.5936 5.4414 18.1914C4.84363 18.7892 4.03288 19.125 3.1875 19.125C2.34212 19.125 1.53137 18.7892 0.933597 18.1914C0.335825 17.5936 1.7815e-08 16.7829 0 15.9375V3.1875C0 2.34212 0.335825 1.53137 0.933597 0.933597C1.53137 0.335825 2.34212 0 3.1875 0V0ZM13.8125 0C14.6579 0 15.4686 0.335825 16.0664 0.933597C16.6642 1.53137 17 2.34212 17 3.1875V15.9375C17 16.7829 16.6642 17.5936 16.0664 18.1914C15.4686 18.7892 14.6579 19.125 13.8125 19.125C12.9671 19.125 12.1564 18.7892 11.5586 18.1914C10.9608 17.5936 10.625 16.7829 10.625 15.9375V3.1875C10.625 2.34212 10.9608 1.53137 11.5586 0.933597C12.1564 0.335825 12.9671 0 13.8125 0Z" fill="white"/>
      </svg>`;
    });
    this.player.on('pause', ()=>{
      this.$btn.innerHTML = `<svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3.49067 0.650327C3.13569 0.447558 2.73367 0.341611 2.32487 0.343094C1.91606 0.344577 1.51482 0.45344 1.16133 0.658779C0.807831 0.864118 0.514487 1.15873 0.310672 1.5131C0.106857 1.86748 -0.000276476 2.26919 5.35836e-07 2.67799V17.322C-0.000276476 17.7308 0.106857 18.1325 0.310672 18.4869C0.514487 18.8413 0.807831 19.1359 1.16133 19.3412C1.51482 19.5465 1.91606 19.6554 2.32487 19.6569C2.73367 19.6584 3.13569 19.5524 3.49067 19.3497L16.3053 12.0253C16.6622 11.8212 16.9588 11.5263 17.1651 11.1707C17.3714 10.815 17.48 10.4111 17.48 9.99999C17.48 9.58884 17.3714 9.18499 17.1651 8.82932C16.9588 8.47366 16.6622 8.17882 16.3053 7.97466L3.49067 0.650327Z" fill="white"/>
      </svg>`;
    });
    this.player.on('play', ()=>{
      this.$btn.innerHTML = `<svg width="17" height="20" viewBox="0 0 17 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3.1875 0C4.03288 0 4.84363 0.335825 5.4414 0.933597C6.03918 1.53137 6.375 2.34212 6.375 3.1875V15.9375C6.375 16.7829 6.03918 17.5936 5.4414 18.1914C4.84363 18.7892 4.03288 19.125 3.1875 19.125C2.34212 19.125 1.53137 18.7892 0.933597 18.1914C0.335825 17.5936 1.7815e-08 16.7829 0 15.9375V3.1875C0 2.34212 0.335825 1.53137 0.933597 0.933597C1.53137 0.335825 2.34212 0 3.1875 0V0ZM13.8125 0C14.6579 0 15.4686 0.335825 16.0664 0.933597C16.6642 1.53137 17 2.34212 17 3.1875V15.9375C17 16.7829 16.6642 17.5936 16.0664 18.1914C15.4686 18.7892 14.6579 19.125 13.8125 19.125C12.9671 19.125 12.1564 18.7892 11.5586 18.1914C10.9608 17.5936 10.625 16.7829 10.625 15.9375V3.1875C10.625 2.34212 10.9608 1.53137 11.5586 0.933597C12.1564 0.335825 12.9671 0 13.8125 0Z" fill="white"/>
      </svg>`;
    });
    this.player.on('timeupdate', this.onPlay.bind(this));
    this.player.on('ended', this.playNext.bind(this));
  }
  update(itemData) {
    this.$root.innerHTML = getHTML(itemData);

    this.playlist = this.getState.playlists.find((p)=> p.name === itemData.playlist);
    this.current = itemData;
    this.playlist.items.forEach((item, i, arr)=> {
      if (item.id === this.current.id) {
        if (i === 0) {
          this.prev = arr[arr.length-1];
        } else {
          this.prev = arr[i-1];
        }
        if (i === (arr.length-1)) {
          this.next = arr[0];
        } else {
          this.next = arr[i+1];
        }
      }
    });
    console.log(this.next);
    this.$timer = findEl('.player__current-time', this.$root);
    this.$btn = findEl('.player__button', this.$root);
    this.$fulltime = findEl('.player__full-time', this.$root);
    this.$progress = findEl('.player__passed', this.$root);


    this.player.source = {
      type: 'video',
      sources: [
        {
          src: itemData.id,
          provider: 'youtube'
        }
      ]
    };
  }
  onPlay(e) {
    const currentTime = (this.player.currentTime).toFixed(2);
    const fullTime = this.player.duration;

    this.$timer.textContent = timeFormat(this.player.currentTime);
    this.$progress.style.width = currentTime * 100 /fullTime+'%';
  }
  playNext() {
    this.update(this.next);
    this.emmit('player::next', this.current);
  }

  onClick(e) {
    const $target = e.target;
    if ($target.closest('.player__button') && this.current) {
      this.player.togglePlay();
    }
  }
}

export default Player;