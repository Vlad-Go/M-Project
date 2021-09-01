import AppComponent from '../../core/AppComponent';
import {getHTML} from './getHTML';


class MusicCards extends AppComponent {
  constructor(emmiter, store) {
    super({
      name: 'music-cards',
      emmiter,
      store,
      listeners: []
    });
    this.subscribe('search::result', this.update.bind(this));
    this.subscribe('playlist::chose', this.update.bind(this));
  }

  get getHTML() {
    const result = getHTML();
    this.cardsInits = result.inits;
    return `
     <ul class="music-cards">
        ${result.html}
     </ul>`;
  }
  init() {
    super.init();
    this.cardsInits.forEach(({init})=> init());
  }
  update(cardType, state) {
    console.log(state);
    this.cardsInits.forEach(({destroy})=> destroy());
    const result = getHTML(cardType,
        {emmiter: this.emmiter,
          store: this.store},
        state
    );
    this.$root.innerHTML = result.html;
    this.cardsInits = result.inits;
    this.cardsInits.forEach(({init})=> init());
  }
}

export default MusicCards;