import Processor from './Processor';
import {reducer} from '../redux/reducer';

class Store {
  constructor() {
    this.processor = new Processor();
    this.observers = [];
  }
  async init() {
    await this.processor.init();
    return this;
  }
  dispatch(action) {
    const newState = reducer(this.getState, action);
    this.observers.forEach((observer)=>{
      if (observer.event === action.type) observer.update(newState);
    });
    this.processor.write(newState);
  }
  observe(event, update) {
    this.observers.push({event, update});
  }
  get getState() {
    return this.processor.read();
  }
}

export default Store;