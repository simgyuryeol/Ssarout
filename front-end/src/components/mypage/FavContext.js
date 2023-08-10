import React, { createContext, useContext, useReducer } from 'react';

const FavContext = createContext();

const initialState = {
  favResults: [],
};

const favReducer = (state, action) => {
  switch (action.type) {
    case 'SET_FAV_RESULTS':
      return { ...state, favResults: action.payload };
    case 'TOGGLE_FAV':
      const updatedResults = state.favResults.map((item) =>
        item.songId === action.payload
          ? { ...item, isFav: !item.isFav }
          : item
      );
      return { ...state, favResults: updatedResults };
    default:
      return state;
  }
};

export const FavProvider = ({ children }) => {
  const [state, dispatch] = useReducer(favReducer, initialState);

  return (
    <FavContext.Provider value={{ state, dispatch }}>
      {children}
    </FavContext.Provider>
  );
};

export const useFav = () => {
  const context = useContext(FavContext);
  if (context === undefined) {
    throw new Error('useFav must be used within a FavProvider');
  }
  return context;
};
