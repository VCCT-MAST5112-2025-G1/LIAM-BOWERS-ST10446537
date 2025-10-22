// contexts/MenuContext.tsx
import React, { createContext, useContext, useState } from 'react';
import { MenuItem } from '../types';

type MenuContextType = {
  menu: MenuItem[];
  addItem: (item: Omit<MenuItem, 'id'>) => void;
  removeItem: (id: string) => void;
  setMenu: React.Dispatch<React.SetStateAction<MenuItem[]>>;
};

const MenuContext = createContext<MenuContextType | undefined>(undefined);

export const useMenu = () => {
  const ctx = useContext(MenuContext);
  if (!ctx) throw new Error('useMenu must be used within MenuProvider');
  return ctx;
};

export const MenuProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [menu, setMenu] = useState<MenuItem[]>([]);

  const addItem = (item: Omit<MenuItem, 'id'>) => {
    const id = `${Date.now()}-${Math.floor(Math.random() * 10000)}`;
    const newItem: MenuItem = { id, ...item };
    setMenu(prev => [newItem, ...prev]);
  };

  const removeItem = (id: string) => setMenu(prev => prev.filter(i => i.id !== id));

  return (
    <MenuContext.Provider value={{ menu, addItem, removeItem, setMenu }}>
      {children}
    </MenuContext.Provider>
  );
};
