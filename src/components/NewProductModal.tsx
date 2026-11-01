import React, { useState } from 'react';
import { Product } from '../types';
import { X, PackagePlus } from 'lucide-react';

interface NewProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (product: Omit<Product, 'id'>) => void;
}

export const NewProductModal: React.FC<NewProductModalProps> = ({
  isOpen,
  onClose,
  onSave
}) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [cost, setCost] = useState('');
  const [stock, setStock] = useState('10');
  const [category, setCategory] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const priceNum = parseFloat(price) || 0;
    const costNum = parseFloat(cost) || 0;
    const stockNum = parseInt(stock, 10) || 0;

    onSave({
      name: name.trim(),
      price: priceNum,
      cost: costNum,
      stock: Math.max(0, stockNum),
      category: category.trim() || 'General'
    });

    // Reset
    setName('');
    setPrice('');
    setCost('');
    setStock('10');
    setCategory('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-100">
      <div className="relative w-full max-w-sm rounded-2xl bg-white border border-zinc-300 p-5 shadow-2xl text-zinc-900">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-zinc-400 hover:text-zinc-800 hover:bg-zinc-100 transition"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-xl bg-black text-white flex items-center justify-center">
            <PackagePlus className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-bold text-base text-zinc-900">Nuevo Producto</h3>
            <p className="text-xs text-zinc-500">Agrega un artículo a tu catálogo de stock</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3 text-xs">
          <div>
            <label className="block font-medium text-zinc-700 mb-1">
              Nombre del Producto *
            </label>
            <input
              type="text"
              required
              autoFocus
              placeholder="Ej. Remera oversize, Café 250g..."
              value={name}
              onChange={e => setName(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-zinc-300 bg-white text-zinc-900 text-sm focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block font-medium text-zinc-700 mb-1">
                Precio de Venta ($)
              </label>
              <input
                type="number"
                step="any"
                inputMode="decimal"
                required
                placeholder="0.00"
                value={price}
                onChange={e => setPrice(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-zinc-300 bg-white text-zinc-900 font-mono-numbers text-sm focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>

            <div>
              <label className="block font-medium text-zinc-700 mb-1">
                Costo de Compra ($)
              </label>
              <input
                type="number"
                step="any"
                inputMode="decimal"
                placeholder="0.00"
                value={cost}
                onChange={e => setCost(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-zinc-300 bg-white text-zinc-900 font-mono-numbers text-sm focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block font-medium text-zinc-700 mb-1">
                Stock Inicial (Unidades)
              </label>
              <input
                type="number"
                required
                min="0"
                placeholder="10"
                value={stock}
                onChange={e => setStock(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-zinc-300 bg-white text-zinc-900 font-mono-numbers text-sm focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>

            <div>
              <label className="block font-medium text-zinc-700 mb-1">
                Categoría (Opcional)
              </label>
              <input
                type="text"
                placeholder="Ej. Ropa, Almacén..."
                value={category}
                onChange={e => setCategory(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-zinc-300 bg-white text-zinc-900 text-sm focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>
          </div>

          <div className="pt-2 flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="w-1/3 py-2.5 rounded-xl border border-zinc-300 text-zinc-700 font-medium text-xs hover:bg-zinc-100 transition"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="w-2/3 py-2.5 rounded-xl bg-black hover:bg-zinc-800 text-white font-bold text-xs uppercase tracking-wide transition shadow-sm cursor-pointer"
            >
              Guardar en Catálogo
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
