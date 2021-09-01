import {ADD_TO_PLAYLIST, CREATE_PLAYLIST} from './types';

export const reducer = (state, {type, data}) =>{
  let newPlaylist;
  let oldPlaylists;
  switch (type) {
    case ADD_TO_PLAYLIST:
      const {playlistName, item} = data;
      const playlist = state.playlists.filter((playlist)=> playlist.name === playlistName)[0];
      console.log(playlist);
      playlist.items.push(item);
      return {...state};
    case CREATE_PLAYLIST:
      oldPlaylists = state.playlists;
      newPlaylist = {name: data.name, items: []};
      return {...state, playlists: [...oldPlaylists, newPlaylist]};
    default:
      return state;
  }
};