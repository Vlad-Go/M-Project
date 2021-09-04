import {ADD_TO_PLAYLIST, CREATE_PLAYLIST} from './types';

export const addToPlaylist = (data) => {
  return {
    type: ADD_TO_PLAYLIST,
    data
  };
};
export const createPlaylist = (data) =>{
  return {
    type: CREATE_PLAYLIST,
    data
  };
};