import AppComponent from '../../core/AppComponent';
import {getHTML} from './getHTML';
import {searchHandler} from './searchHandler';

class SearchForm extends AppComponent {
  constructor(emmiter, store) {
    super({
      name: 'search-form',
      emmiter,
      store,
      listeners: ['submit']
    });
  }

  get getHTML() {
    return ` 
    <form class="search-form">
        ${getHTML()}
     </form>`;
  }
  init() {
    super.init();
  }
  update(state) {
    this.$root.innerHTML = getHTML();
  }
  onSubmit(e) {
    e.preventDefault();
    const button = e.srcElement[1];
    const form = e.srcElement[0];
    button.disabled = true;
    searchHandler(form.value)
        .then((data)=>{
          const items = data.items.map((item)=>{
            return {
              id: item.id.videoId,
              name: item.snippet.title,
              channel: item.snippet.channelTitle,
              img: item.snippet.thumbnails.default.url
            };
          });

          this.emmit('search::result', 'ResultItem', items);
          button.disabled = false;
          form.value = '';
        });
  }
}

export default SearchForm;

