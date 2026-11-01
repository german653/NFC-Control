export type MovementType = 'VENTA' | 'COMPRA';

export interface Product {
  id: string;
  name: string;
  price: number; // Precio de venta
  cost: number;  // Costo de compra
  stock: number; // Unidades disponibles
  category?: string;
}

export interface Movement {
  id: string;
  type: MovementType;
  concept: string;
  amount: number;
  date: string; // ISO string
  productId?: string;
  productName?: string;
  quantity?: number;
  category?: string;
  paymentMethod?: 'Efectivo' | 'Transferencia' | 'Tarjeta' | 'Otro';
  notes?: string;
}

export type FilterType = 'TODOS' | 'GANANCIAS' | 'PERDIDAS';
export type NavTab = 'movements' | 'stock';
