export const searchHandler = (value) => {
  const API_KEY = 'AIzaSyC-JXJtNzaLbGtm7M-9ftbXt6ah6Cqt12U';
  const maxResult = value.split(',')[1] || 5;
  return fetch(`https://youtube.googleapis.com/youtube/v3/search?&key=${API_KEY}&part=snippet&maxResults=${maxResult}&q="${value}'`)
      .then((res) => res.json())
      .then((data) => data);
};