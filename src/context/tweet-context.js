import React, { createContext, useContext } from 'react';
import { useToken } from '../hooks/useToken';
import { useUser } from '../hooks/useUser';

const TwitterContext = createContext();

// Context sağlayıcı (provider) bileşeni oluştur
export function TwitterContextProvider({ children }) {
  const [token, setToken] = useToken(-1);
  const [user, setUser] = useUser({
    userId: 0,
    fullName: '',
    userName: '',
    followers: 0,
    registerDate: new Date(),
    birthDate: new Date()
  });

  const contextValue = {
    user,
    setUser: (userInfo) => setUser(userInfo),
    token,
    setToken: (newToken) => setToken(newToken)
  };

  return (
    <TwitterContext.Provider value={contextValue}>
      {children}
    </TwitterContext.Provider>
  );
}

// Yardımcı bir özel hook oluştur
export function useTwitterContext() {
  const context = useContext(TwitterContext);
  if (!context) {
    throw new Error('useMyContext must be used within a TwitterContextProvider');
  }
  return context;
}