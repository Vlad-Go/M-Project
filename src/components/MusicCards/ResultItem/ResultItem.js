import AppComponent from '../../../core/AppComponent';
import {addToPlaylist, createPlaylist} from '../../../redux/actions';
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
    const availablePlaylists = this.getState.playlists.map((playlist)=>{
      if (playlist.items.every((song)=> song.id !== this.data.id)) {
        return `
        <li class="context-menu-item"><button>${playlist.name}</button></li>`;
      } else {
        return '';
      }
    });
    const getPosition = () => {
      const cords = this.$root.getBoundingClientRect();
      return `top:${cords.top+20}px; right:${cords.left+20}px`;
    };

    const resolve = popup(`
      <ul class="active context-menu context-menu-${this.data.id}" style="${getPosition()}">
             ${ availablePlaylists.join('')}
      </ul>`, `.context-menu-${this.data.id}`);

    const $contextMenu = findEl(`.context-menu-${this.data.id}`);

    const addItem = (e) =>{
      e.preventDefault();
      const $target = e.target;
      this.dispatch(addToPlaylist({
        playlistName: $target.textContent,
        item: {...this.data, playlist: $target.textContent}
      }));
      resolve.then((close)=> close());
      $contextMenu.removeEventListener('click', addItem.bind(this));
    };
    $contextMenu.addEventListener('click', addItem.bind(this));
  }
  onClick(e) {
    const $target = e.target;
    if ($target.closest('.result-item__button')) {
       this.openContextMenu();
    } else if ($target.closest('.context-menu-item')) {
    }
  }
  destroy() {
    super.destroy();
  }
}

export default ResultItem;