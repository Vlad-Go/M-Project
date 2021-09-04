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
    this.subscribe('playlistItem::chose', this.changeActive.bind(this));
    this.subscribe('player::next', this.changeActive.bind(this));
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
  changeActive(update) {
    if (update.id !== this.data.id) {
      this.$root.classList.remove('current');
    } else {
      this.$root.classList.add('current');
    }
  }

  onClick(e) {
    const $target = e.target;
    this.emmit('playlistItem::chose', this.data);

    // if ($target.closest('.playlist-item__button')) {
    //
    // }
  }
}

export default PlaylistItem;