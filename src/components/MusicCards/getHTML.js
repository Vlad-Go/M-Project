import ResultItem from './ResultItem/ResultItem';
import PlaylistItem from './PlaylistItem/PlaylistItem';

export const getHTML = (cardType, cardOptions, data = []) =>{
  let html = '';
  const inits = [];
  let Card;

  if (!cardType) {
    html = '<p class="message">Choose playlist or find something</p>';
  }
  switch (cardType) {
    case 'ResultItem':
      Card = ResultItem;
      break;
    case 'PlaylistItem':
      Card = PlaylistItem;
      break;
  }

  data.forEach((data)=>{
    const card = new Card(cardOptions, data);
    html += card.getHTML;
    inits.push({
      init: card.init.bind(card),
      destroy: card.destroy.bind(card)
    });
  });
  return {html, inits};
};