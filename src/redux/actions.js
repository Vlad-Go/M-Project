import {TEST} from './types';

export const test = (data) => {
  return {
    type: TEST,
    data
  };
};