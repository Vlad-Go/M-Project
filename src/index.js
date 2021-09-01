
import './scss/style.scss';
import App from './App';
import SearchForm from './components/SearchForm/SearchForm';
import MusicCards from './components/MusicCards/MusicCards';
import Player from './components/Player/Player';
import Playlists from './components/Playlists/Playlists';


new App('#app', [SearchForm, MusicCards, Player, Playlists]).init();