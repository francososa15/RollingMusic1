
import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

const users = [
  { email: 'usuario@gmail.com', password: '123', role: 'user' },
  { email: 'admin@gmail.com', password: '123', role: 'admin' }
];

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('currentUser'));
    if (storedUser) {
      setCurrentUser(storedUser);
    }
  }, []);

  const login = (email, password) => {
    const found = users.find(u => u.email === email && u.password === password);
    if (found) {
      setCurrentUser(found);
      localStorage.setItem('currentUser', JSON.stringify(found));
    }
    return found;
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
