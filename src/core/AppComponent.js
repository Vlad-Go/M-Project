import DOMListener from './DOMListener';

class AppComponent extends DOMListener {
  constructor({name, emmiter, store, listeners}) {
    super(listeners);
    this.name = name;
    this.emmiter = emmiter;
    this.store = store;
  }
  get getHTML() {
    return '';
  }
  init() {
    this.$root = document.querySelector(`.${this.name}`);
    this.initDOMListeners();
  }
  destroy() {
    this.removeDOMListeners();
  }
  subscribe(event, callback) {
    this.emmiter.subscribe(event, callback);
  }
  unsubscribe(event) {
    this.emmiter.unsubscribe(event);
  }
  emmit(event, ...args) {
    this.emmiter.emmit(event, args);
  }
  dispatch(action) {
    this.store.dispatch(action);
  }
  observe(event, update) {
    this.store.observe(event, update);
  }

  get getState() {
    return this.store.getState;
  }
}
export default AppComponent;