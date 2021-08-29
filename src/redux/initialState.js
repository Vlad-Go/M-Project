const initialState = (uid, email) => {
  return {
    uid,
    email,
    playlists: []
  };
};

export default initialState;