import AppComponent from '../core/AppComponent';
import {test} from '../redux/actions';
import {TEST} from '../redux/types';

class TestComponent extends AppComponent {
  constructor(emmiter, store) {
    super({
      name: 'test',
      emmiter,
      store,
      listeners: ['click']
    });
  }

  get getHTML() {
    return '<div class="test">Test</div>';
  }
  update(state) {
    console.log(this.$root);
    this.$root.innerHTML = state.playlists[0];
  }
  init() {
    super.init();
    this.observe(TEST, this.update.bind(this));
  }
  onClick(e) {
    this.dispatch(test(['new Playlist']));
  }
}

export default TestComponent;