export const getMethodName = (eventType) =>{
  return `on${eventType.slice(0, 1).toUpperCase()}${eventType.slice(1)}`;
};

// ".", "#", "$", "[", or "]"

export const findEl = (selector, where = document) => {
  return where.querySelector(selector);
};

export const popup = (modal, modalSelector) => {
  const overlay = '<div class="overlay"></div>';
  document.body.insertAdjacentHTML('beforeend', overlay + modal);

  const close = () =>{
    document.onclick = null;
    findEl(modalSelector).remove();
    findEl('.overlay').remove();
  };
  document.onclick = (e) => {
    if (e.target.className === 'overlay') close();
  };
  return new Promise((resolve, reject) => resolve(close));
};
export const timeFormat = (s) =>{
  const min = String(s/60).split('.')[0];
  const sec = String((s%60).toFixed()).padStart(2, '0');
  return `${min}:${sec}`;
};