
import './scss/style.scss';
import App from './App';
import SearchForm from './components/SearchForm/SearchForm';
import MusicCards from './components/MusicCards/MusicCards';
import Player from './components/Player/Player';
import Playlists from './components/Playlists/Playlists';


let tag = document.createElement('script');
tag.src = 'http://www.youtube.com/player_api';
let firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);


window.onYouTubeIframeAPIReady = onYouTubeIframeAPIReady;
function onYouTubeIframeAPIReady() {
  new App('#app', [SearchForm, MusicCards, Player, Playlists]).init();
  console.log(1);
}

//
// const myWorker = new Worker('./worker.js');
//
// myWorker.onmessage = function(e) {
//   document.querySelector('.player__button').click();
//   document.querySelector('.player__button').click();
//   document.querySelector('.debug').innerHTML= 'clicked';
//   console.log('Message received from worker');
// };
// myWorker.postMessage(10000);