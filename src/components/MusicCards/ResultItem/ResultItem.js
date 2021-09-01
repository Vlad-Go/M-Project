import AppComponent from '../../../core/AppComponent';
import {addToPlaylist} from '../../../redux/actions';
import {ADD_TO_PLAYLIST, CREATE_PLAYLIST} from '../../../redux/types';
import {findEl, popup} from '../../../core/utils';
import {getHTML} from './getHTML';

class ResultItem extends AppComponent {
  constructor({emmiter, store}, data) {
    super({
      name: `result-item-${data.id}`,
      emmiter,
      store,
      listeners: ['click']
    });
    this.data = data;
    this.observe(CREATE_PLAYLIST, this.update.bind(this));
    this.observe(ADD_TO_PLAYLIST, this.update.bind(this));
  }
  get getHTML() {
    return `
    <li class="music-card result-item ${this.name}" data-id="${this.data.id}">
        ${getHTML(this.getState, this.data)}
    </li>`;
  }
  init() {
    super.init();
  }
  update(state) {
    this.$root.innerHTML = getHTML(state, this.data);
  }
  openContextMenu() {
    const $contextMenu = findEl(`.context-menu-${this.data.id}`, this.$root);
    return popup($contextMenu, `.context-menu-${this.data.id}`);
  }
  onClick(e) {
    const $target = e.target;
    if ($target.closest('.result-item__button')) {
      this.closeContextMenu = this.openContextMenu();
    } else if ($target.closest('.context-menu-item')) {
      this.dispatch(addToPlaylist({
        playlistName: $target.textContent,
        item: this.data
      }));
      this.closeContextMenu.then((close) => close());
    }
  }
}

export default ResultItem;