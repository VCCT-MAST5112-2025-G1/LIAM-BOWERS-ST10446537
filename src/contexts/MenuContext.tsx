// src/contexts/MenuContext.tsx
import React, { createContext, useContext, useState } from 'react';
import { MenuItem } from '../types';

type MenuContextType = {
  menu: MenuItem[];
  addItem: (item: Omit<MenuItem, 'id'>) => void;
  removeItem: (id: string) => void;
};

const MenuContext = createContext<MenuContextType | undefined>(undefined);

export const useMenu = () => {
  const ctx = useContext(MenuContext);
  if (!ctx) throw new Error('useMenu must be used within MenuProvider');
  return ctx;
};

const initialMenu: MenuItem[] = [
  { 
    id: '1', 
    name: 'Bruschetta', 
    course: 'Starters', 
    price: 50,
    description: 'Toasted bread with tomatoes and basil'
  },
  { 
    id: '2', 
    name: 'Grilled Chicken', 
    course: 'Mains', 
    price: 120,
    description: 'Succulent grilled chicken breast'
  },
  { 
    id: '3', 
    name: 'Tiramisu', 
    course: 'Desserts', 
    price: 60,
    description: 'Classic Italian dessert'
  },
];

export const MenuProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [menu, setMenu] = useState<MenuItem[]>(initialMenu);

  const addItem = (item: Omit<MenuItem, 'id'>) => {
    const id = `${Date.now()}-${Math.floor(Math.random() * 10000)}`;
    const newItem: MenuItem = { id, ...item };
    setMenu(prev => [newItem, ...prev]);
  };

  const removeItem = (id: string) => {
    setMenu(prev => prev.filter(i => i.id !== id));
  };

  return (
    <MenuContext.Provider value={{ menu, addItem, removeItem }}>
      {children}
    </MenuContext.Provider>
  );
};