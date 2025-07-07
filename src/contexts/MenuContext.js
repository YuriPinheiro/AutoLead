import { createContext, useState, useContext } from 'react';

// Cria o contexto com um valor padrão
const MenuContext = createContext({
  isExpanded: false,
  toggleMenu: () => {},
});

// Provider component
export const MenuProvider = ({ children }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleMenu = () => {
    setIsExpanded(prev => !prev);
  };

  return (
    <MenuContext.Provider value={{ isExpanded, toggleMenu }}>
      {children}
    </MenuContext.Provider>
  );
};

// Hook personalizado para usar o contexto
export const useMenu = () => {
  const context = useContext(MenuContext);
  if (!context) {
    throw new Error('useMenu must be used within a MenuProvider');
  }
  return context;
};