import {TEST} from './types';

export const reducer = (state, {type, data}) =>{
  switch (type) {
    case TEST:
      return {...state, playlists: data};
    default:
      return state;
  }
};