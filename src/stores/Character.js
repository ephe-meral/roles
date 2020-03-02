import React from 'react';
import { createStore, useStore } from 'react-hookstore';
import shortid from 'shortid';

const LOCALSTORAGE_ID = 'chars';

// Structure of a character:
const EMPTY_CHARACTER = {
  fullName: 'Unnamed Character',
  shortCode: 'UC',
  color: '#000000',
  profilePic: '' // data URI
};

// Don't access this directly
// Handles storage via LocalStorage as a side effect
const _characterStore = createStore(
  '_characterStore',
  JSON.parse(window.localStorage.getItem(LOCALSTORAGE_ID) || '{}'),
  (state, newState) => {
    window.localStorage.setItem(LOCALSTORAGE_ID, JSON.stringify(newState));
    return newState;
  }
);

// Ex.: `const [characters, setCharacters] = useLogStore(props.logId)`
const useCharacterStore = () => useStore(_characterStore);

// Ex.: `setCharacters(Characters.addCharacter(characters, 'Jane Doe', 'JD', '#aa0000', 'data:image/png;base64,iVBORw0/*...*/'))`
class Characters {
  static createOrUpdateCharacter = (
    characters,
    { fullName, shortCode, color, profilePic },
    id = shortid.generate()
  ) => ({
    ...characters,
    [id]: { fullName, shortCode, color, profilePic }
  });

  static removeCharacter = (characters, id) => {
    const res = { ...characters };
    delete res[id];
    return res;
  };
}

export { Characters, useCharacterStore };
