export const getHTML = (state, itemData) => {
  const availablePlaylists = state.playlists.map((playlist)=>{
    if (playlist.items.every((song)=> song.id !== itemData.id)) {
      return `
        <li class="context-menu-item"><button>${playlist.name}</button></li>`;
    } else {
      return '';
    }
  });
  return `  
 <div class="music-card__content">
          <img class="music-card__img" src="${itemData.img}" alt="">
          <div class="music-card__box">
            <h4 class="music-card__caption">${itemData.name}</h4>
            <p class="music-card__author">${itemData.channel}</p>  
          </div>
          <div class="result-item__time">2:31</div>
  </div>
  <button class="result-item__button">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M7 0C5.15042 0.0223147 3.38287 0.766977 2.07493 2.07493C0.766977 3.38287 0.0223147 5.15042 0 7C0.0223147 8.84958 0.766977 10.6171 2.07493 11.9251C3.38287 13.233 5.15042 13.9777 7 14C8.84958 13.9777 10.6171 13.233 11.9251 11.9251C13.233 10.6171 13.9777 8.84958 14 7C13.9777 5.15042 13.233 3.38287 11.9251 2.07493C10.6171 0.766977 8.84958 0.0223147 7 0ZM11 7.5H7.5V11H6.5V7.5H3V6.5H6.5V3H7.5V6.5H11V7.5Z"
              fill="white" />
          </svg>
  </button>
  <ul class="context-menu context-menu-${itemData.id}">
      ${ availablePlaylists.join('')}
   </ul>`;
};