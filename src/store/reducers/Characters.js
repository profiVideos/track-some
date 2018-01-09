import charactersDataList from '../data/characters.json';

const characterReducer = (state = charactersDataList, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default characterReducer;
