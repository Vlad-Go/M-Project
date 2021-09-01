import AppComponent from '../../core/AppComponent';
import {getHTML} from './getHTML';
import {ADD_TO_PLAYLIST, CREATE_PLAYLIST} from '../../redux/types';
import {createPlaylist} from '../../redux/actions';
import {findEl, popup} from '../../core/utils';


class Playlists extends AppComponent {
  constructor(emmiter, store) {
    super({
      name: 'playlist',
      emmiter,
      store,
      listeners: ['click']
    });
    this.isOpen = false;
    this.observe(ADD_TO_PLAYLIST, this.update.bind(this));
    this.observe(CREATE_PLAYLIST, this.update.bind(this));
  }

  get getHTML() {
    return `
    <div class="playlist">
        ${getHTML(this.getState.playlists)}
    </div>`;
  }
  init() {
    super.init();
  }
  update(state) {
    this.$root.innerHTML = getHTML(state.playlists);
  }

  addPlaylist() {
    const resolve = popup(`
   <form class="playlist__form" action="POST">
           <input class="playlist__input" placeholder="Enter name" type="text">
           <button class="playlist__input-button"></button>
    </form>`, '.playlist__form');
    const button = findEl('.playlist__input-button');

    this.getPlaylistName = (e) =>{
      e.preventDefault();
      const value = findEl('.playlist__input').value;
      this.dispatch(createPlaylist({name: value}));
      resolve.then((close)=> close());

      button.removeEventListener('click', this.getPlaylistName.bind(this));
    };
    button.addEventListener('click', this.getPlaylistName.bind(this));
  }

  togglePlaylists($target) {
    const $appRoot = findEl('#app');
    $target.classList.toggle('active');
    if (this.isOpen) {
      this.isOpen = !this.isOpen;
      $appRoot.style.transform = `translateY(0)`;
    } else {
      this.isOpen = !this.isOpen;
      $appRoot.style.transform = `translateY(-${this.$root.clientHeight}px)`;
    }
  }
  openPlaylist(name) {
    const playlist = this.getState.playlists.filter((p)=> p.name === name)[0];
    this.emmit('playlist::chose', 'PlaylistItem', playlist.items);
  }

  onClick(e) {
    const $target = e.target;
    if ($target.classList.contains('playlist__arrow')) {
      this.togglePlaylists($target);
    }
    if ($target.classList.contains('playlist__item--add')) {
      this.addPlaylist();
    }
    if ($target.classList.contains('playlist__item')) {
      this.openPlaylist($target.textContent.trim());
    }
  }
}

export default Playlists;