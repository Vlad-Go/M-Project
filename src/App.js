import Emmiter from './core/Emmiter';
import Store from './core/Store';

class App {
  constructor(root, components) {
    this.$root = document.querySelector(root);
    this.components = components;
  }
  async init() {
    document.body.style.height = window.innerHeight +'px';

    const emmiter = new Emmiter();
    const store = await new Store().init();

    this.components = this.components.map((Component)=>{
      const component = new Component(emmiter, store);
      this.$root.insertAdjacentHTML('beforeend', component.getHTML);
      component.init();
      return component;
    });
  }
  destroy() {
    this.$root.innerHTML = '';
    this.components.map((Component) =>{
      Component.destroy();
    });
  }
}
export default App;