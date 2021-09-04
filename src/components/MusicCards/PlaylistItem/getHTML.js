export const getHTML = (state, itemData) => {
  return `   <div class="music-card__content">
    <img class="music-card__img" src="${itemData.img}" alt="">
    <div class="music-card__box">
      <h4 class="music-card__caption">${itemData.name}</h4>
      <p class="music-card__author">${itemData.channel}</p>
    </div>
  </div>`;
};