export const getHTML = (playlists) =>{
  playlists = playlists.map((playlist)=>{
    return ` 
    <li class="playlist__item">
       <h4  class="playlist__item-caption">${playlist.name}</h4>
    </li>`;
  });
  return `
        <div class="playlist__top">
          <h2 class="playlist__title">Playlists</h2>
          <button class="playlist__arrow"></button>
        </div>
        <ul class="playlist__list">
            ${playlists.join('')}
          <button class="playlist__item--add"></button>
        </ul>
`;
};