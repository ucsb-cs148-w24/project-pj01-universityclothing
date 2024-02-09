import React, { createContext, useState, useContext } from 'react';

const ItemsContext = createContext();

export const useItems = () => useContext(ItemsContext);

export const ItemsProvider = ({ children }) => {
  const [items, setItems] = useState([]);

  const handleNewPost = (newPost) => {
    setItems((currentItems) => [...currentItems, newPost]);
  };

  return (
    <ItemsContext.Provider value={{ items, handleNewPost }}>
      {children}
    </ItemsContext.Provider>
  );
};
