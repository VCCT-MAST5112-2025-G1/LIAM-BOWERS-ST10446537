export interface MenuItem {
  id: number;
  name: string;
  course: 'starter' | 'main' | 'dessert';
  price: number;
}

export let menuItems: MenuItem[] = [
  { id: 1, name: 'Bruschetta', course: 'starter', price: 50 },
  { id: 2, name: 'Grilled Chicken', course: 'main', price: 120 },
  { id: 3, name: 'Tiramisu', course: 'dessert', price: 60 },
];

export const addMenuItem = (item: MenuItem): void => {
  menuItems.push(item);
};

export const removeMenuItem = (id: number): void => {
  menuItems = menuItems.filter((item) => item.id !== id);
};
