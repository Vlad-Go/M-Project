import AppComponent from '../../../core/AppComponent';
import {getHTML} from './getHTML';

class PlaylistItem extends AppComponent {
  constructor({emmiter, store}, data) {
    super({
      name: `playlist-item-${data.id}`,
      emmiter,
      store,
      listeners: ['click']
    });
    this.data = data;
  }
  get getHTML() {
    return `
    <li class="music-card playlist-item ${this.name}" data-id="${this.data.id}">
           ${getHTML(this.getState, this.data)}
    </li>`;
  }
  init() {
    super.init();
  }
  update(state) {
    this.$root.innerHTML = getHTML(state, this.data);
  }

  onClick(e) {
    const $target = e.target;
    if ($target.closest('.playlist-item__button')) {
      this.emmit('playlistItem::chose', this.data);
    }
  }
}

export default PlaylistItem;