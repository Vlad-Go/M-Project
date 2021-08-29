export const getMethodName = (eventType) =>{
  return `on${eventType.slice(0, 1).toUpperCase()}${eventType.slice(1)}`;
};

export const userId = (email) =>{
  return `${email.split('.').join('')}`;
};
// ".", "#", "$", "[", or "]"