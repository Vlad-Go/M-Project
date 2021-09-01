export const getMethodName = (eventType) =>{
  return `on${eventType.slice(0, 1).toUpperCase()}${eventType.slice(1)}`;
};

// ".", "#", "$", "[", or "]"

export const findEl = (selector, where = document) => {
  return where.querySelector(selector);
};

export const popup = (modal, modalSelector) => {
  const overlay = '<div class="overlay"></div>';
  if (typeof modal === 'string') {
    document.body.insertAdjacentHTML('beforeend', overlay + modal);
  } else {
    document.body.insertAdjacentHTML('beforeend', overlay );
    modal.classList.add('active');
  }
  const close = () =>{
    document.onclick = null;
    if (typeof modal === 'string') findEl(modalSelector).remove();
    else modal.classList.remove('active');
    findEl('.overlay').remove();
  };
  document.onclick = (e) => {
    if (e.target.className === 'overlay') close();
  };
  return new Promise((resolve, reject) => resolve(close));
};