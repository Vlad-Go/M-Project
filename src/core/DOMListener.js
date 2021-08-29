import {getMethodName} from './utils';

class DOMListener {
  constructor(listeners) {
    this.listeners = listeners || [];
  }
  initDOMListeners() {
    this.listeners.forEach((eventType)=>{
      const callback = getMethodName(eventType);
      this.$root.addEventListener(eventType, this[callback].bind(this));
    });
  }
  removeDOMListeners() {
    this.listeners.forEach((eventType)=>{
      const callback = getMethodName(eventType);
      this.$root.removeEventListener(eventType, this[callback].bind(this));
    });
  }
}

export default DOMListener;