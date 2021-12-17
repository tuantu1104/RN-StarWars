import React, { useState } from "react";

export const Context = React.createContext();

export default function Provider({ children }) {
  const [likedCharacters, setLikedCharacters] = useState([]);

  const onLikeCharacter = (character) => {
    setLikedCharacters(prevState => [...prevState, character]);
  }

  const onUnlikeCharacter = (characterId) => {
    setLikedCharacters(prevState => prevState.filter(character => character.id !== characterId));
  }

  return (
    <Context.Provider 
      value={{
        likedCharacters,
        likeCharacter: onLikeCharacter,
        unlikeCharacter: onUnlikeCharacter
      }}
    >
      {children}
    </Context.Provider>
  )
}