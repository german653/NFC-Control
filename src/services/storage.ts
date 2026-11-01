import { Movement, Product } from '../types';

const STORAGE_KEY_MOVEMENTS = 'mis_compras_ventas_v2';
const STORAGE_KEY_PRODUCTS = 'mis_productos_stock_v2';

const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    name: 'Remera básica',
    price: 15000,
    cost: 6500,
    stock: 24,
    category: 'Indumentaria'
  },
  {
    id: 'prod-2',
    name: 'Gorra clásica',
    price: 9500,
    cost: 3800,
    stock: 12,
    category: 'Accesorios'
  },
  {
    id: 'prod-3',
    name: 'Zapatillas urbanas',
    price: 48000,
    cost: 22000,
    stock: 6,
    category: 'Calzado'
  },
  {
    id: 'prod-4',
    name: 'Buzo con capucha',
    price: 32000,
    cost: 14000,
    stock: 9,
    category: 'Indumentaria'
  }
];

const INITIAL_MOVEMENTS: Movement[] = [
  {
    id: 'mov-1',
    type: 'VENTA',
    concept: 'Venta de Remera básica',
    productId: 'prod-1',
    productName: 'Remera básica',
    quantity: 1,
    amount: 15000,
    date: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    paymentMethod: 'Efectivo',
    category: 'Indumentaria'
  },
  {
    id: 'mov-2',
    type: 'COMPRA',
    concept: 'Compra de stock (Buzo con capucha)',
    productId: 'prod-4',
    productName: 'Buzo con capucha',
    quantity: 5,
    amount: 70000,
    date: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    paymentMethod: 'Transferencia',
    category: 'Mercadería'
  }
];

export const storage = {
  // PRODUCTS / STOCK CRUD
  getProducts(): Product[] {
    try {
      const data = localStorage.getItem(STORAGE_KEY_PRODUCTS);
      if (data) {
        return JSON.parse(data);
      }
    } catch (e) {
      console.warn('Error reading products', e);
    }
    localStorage.setItem(STORAGE_KEY_PRODUCTS, JSON.stringify(INITIAL_PRODUCTS));
    return INITIAL_PRODUCTS;
  },

  saveProducts(products: Product[]): void {
    try {
      localStorage.setItem(STORAGE_KEY_PRODUCTS, JSON.stringify(products));
    } catch (e) {
      console.error('Error saving products', e);
    }
  },

  addProduct(item: Omit<Product, 'id'>): Product {
    const id = `prod-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
    const newProd: Product = { ...item, id };
    const current = this.getProducts();
    const updated = [newProd, ...current];
    this.saveProducts(updated);
    return newProd;
  },

  updateProductStock(productId: string, delta: number): Product[] {
    const products = this.getProducts();
    const updated = products.map(p => {
      if (p.id === productId) {
        return { ...p, stock: Math.max(0, p.stock + delta) };
      }
      return p;
    });
    this.saveProducts(updated);
    return updated;
  },

  updateProduct(updatedProduct: Product): Product[] {
    const products = this.getProducts();
    const updated = products.map(p => (p.id === updatedProduct.id ? updatedProduct : p));
    this.saveProducts(updated);
    return updated;
  },

  deleteProduct(productId: string): Product[] {
    const products = this.getProducts();
    const updated = products.filter(p => p.id !== productId);
    this.saveProducts(updated);
    return updated;
  },

  // MOVEMENTS CRUD
  getMovements(): Movement[] {
    try {
      const data = localStorage.getItem(STORAGE_KEY_MOVEMENTS);
      if (data) {
        return JSON.parse(data);
      }
    } catch (e) {
      console.warn('Error reading movements', e);
    }
    localStorage.setItem(STORAGE_KEY_MOVEMENTS, JSON.stringify(INITIAL_MOVEMENTS));
    return INITIAL_MOVEMENTS;
  },

  saveMovements(items: Movement[]): void {
    try {
      localStorage.setItem(STORAGE_KEY_MOVEMENTS, JSON.stringify(items));
    } catch (e) {
      console.error('Error saving movements', e);
    }
  },

  addMovement(item: Omit<Movement, 'id'>): Movement {
    const id = `mov-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
    const newMovement: Movement = { ...item, id };
    const current = this.getMovements();
    const updated = [newMovement, ...current];
    this.saveMovements(updated);

    // If movement is linked to a product and quantity, update stock!
    if (newMovement.productId && newMovement.quantity && newMovement.quantity > 0) {
      const delta = newMovement.type === 'VENTA' ? -newMovement.quantity : newMovement.quantity;
      this.updateProductStock(newMovement.productId, delta);
    }

    return newMovement;
  },

  deleteMovement(id: string): Movement[] {
    const current = this.getMovements();
    const updated = current.filter(m => m.id !== id);
    this.saveMovements(updated);
    return updated;
  },

  exportToCsv(): string {
    const items = this.getMovements();
    const headers = ['Tipo', 'Concepto', 'Producto', 'Cantidad', 'Monto', 'Fecha', 'Método'];
    const rows = items.map(m => [
      m.type,
      `"${m.concept.replace(/"/g, '""')}"`,
      `"${(m.productName || '').replace(/"/g, '""')}"`,
      m.quantity || 1,
      m.amount,
      new Date(m.date).toLocaleString('es-ES'),
      m.paymentMethod || 'No especificado'
    ]);
    return [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
  }
};
