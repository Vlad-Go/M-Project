import {initializeApp} from 'firebase/app';
import {getDatabase, ref, onValue, set} from 'firebase/database';

import initialState from '../redux/initialState';
import Auth from './Auth';

class Processor {
  constructor() {
    this.key = 'm-project';
    this.database;
    this.userId;
  }

  async init() {
    const config = {
      apiKey: 'AIzaSyC-JXJtNzaLbGtm7M-9ftbXt6ah6Cqt12U',
      authDomain: 'm-project-323906.firebaseapp.com',
      databaseURL: 'https://m-project-323906-default-rtdb.europe-west1.firebasedatabase.app/'
    };
    initializeApp(config);
    this.database = getDatabase();

    if (!localStorage.getItem(this.key)) {
      this.auth = new Auth();
      await this.auth.init();
      this.userId = this.auth.uid;
      this.write(initialState(this.userId, this.auth.email));
    //  TODO signIn
    }
    this.userId = this.read().uid;
  }
  write(state) {
    set(ref(this.database, `users/${this.userId}`), state);
    localStorage.setItem(this.key, JSON.stringify(state));
  }
  read() {
    return JSON.parse(localStorage.getItem(this.key));
    // const state = ref(this.database, `users/${this.userId}`);
    // onValue(state, (snapshot) => {
    //   const data = snapshot.val();
    //   console.log( data);
    //   return data;
    // });
  }
}

export default Processor;