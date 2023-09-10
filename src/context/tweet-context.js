import React, { createContext, useState } from 'react';

const TweetContext = createContext();

function TweetContextProvider({ children }) {
  const [token, setToken] = useState('');

  const value = {
    token,
    setToken: (newToken) => setToken(newToken)
  };

  return <TweetContext.Provider value={value}>{children}</TweetContext.Provider>;
}

export { TweetContext, TweetContextProvider };