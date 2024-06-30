// types.ts
export interface Ingredient {
  ingredientName: string;
  unit: string;
  qty: string | number;
  expirationDate?: string;
  stockId?: string;
}

export interface Order {
  orderId: string;
  recipeName: string;
  mealType: string;
  total: string;
}

export interface OrderColumn {
  label: string;
  path: keyof Order;
}

export interface IngredientColumn {
  label: string;
  path: keyof Ingredient;
}

export interface Column<T> {
  label: string;
  path: keyof T;
}