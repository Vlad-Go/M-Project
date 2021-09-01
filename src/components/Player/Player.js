import AppComponent from '../../core/AppComponent';
import {getHTML} from './getHTML';

import Plyr from 'plyr';

class Player extends AppComponent {
  constructor(emmiter, store) {
    super({
      name: 'player',
      emmiter,
      store,
      listeners: ['click']
    });
    this.current = null;
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
    this.player.on('timeupdate', (e)=>{
      console.log(e.timeStamp/60000);
    });
  }
  update(itemData) {
    console.log(itemData);
    this.$root.innerHTML = getHTML(itemData);
    this.current = itemData;
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
  onClick(e) {
    const $target = e.target;
    if ($target.closest('.player__button') && this.current) {
      this.player.togglePlay();
      console.log(this.player.source);
    }
  }
}

export default Player;