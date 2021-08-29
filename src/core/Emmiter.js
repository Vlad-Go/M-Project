class Emmiter {
  constructor() {
    this.subscribers = [];
  }
  subscribe(event, callback) {
    this.subscribers.push({event, callback});
    console.log(this.subscribers);
  }
  unsubscribe(event) {
    this.subscribers = this.subscribers.filter((sub)=> sub.event !== event);
  }
  emmit(event, args) {
    const subscribed = this.subscribers.filter((sub)=> sub.event === event);
    subscribed.forEach((subscriber)=> subscriber.callback(...args));
  }
}
export default Emmiter;