import React, { useState } from 'react';
import { Product } from '../types';
import { Plus, Minus, Search, Package, AlertCircle, Trash2, Tag } from 'lucide-react';

interface StockViewProps {
  products: Product[];
  onOpenNewProduct: () => void;
  onUpdateStock: (productId: string, delta: number) => void;
  onDeleteProduct: (productId: string) => void;
}

export const StockView: React.FC<StockViewProps> = ({
  products,
  onOpenNewProduct,
  onUpdateStock,
  onDeleteProduct
}) => {
  const [search, setSearch] = useState('');

  const totalUnidades = products.reduce((acc, p) => acc + p.stock, 0);
  const valorInventarioVenta = products.reduce((acc, p) => acc + p.stock * p.price, 0);
  const valorInventarioCosto = products.reduce((acc, p) => acc + p.stock * p.cost, 0);
  const lowStockCount = products.filter(p => p.stock <= 5).length;

  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    (p.category && p.category.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="space-y-4">
      {/* Top Stock Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
        <div className="bg-white rounded-2xl border border-zinc-200 p-3.5 shadow-xs">
          <span className="text-[11px] font-medium text-zinc-500 uppercase block mb-0.5">
            Total en Stock
          </span>
          <div className="text-2xl font-black font-mono-numbers text-zinc-900">
            {totalUnidades} <span className="text-xs font-normal text-zinc-500">u.</span>
          </div>
          <span className="text-[10px] text-zinc-400">
            {products.length} productos registrados
          </span>
        </div>

        <div className="bg-white rounded-2xl border border-zinc-200 p-3.5 shadow-xs">
          <span className="text-[11px] font-medium text-zinc-500 uppercase block mb-0.5">
            Valor Total de Stock
          </span>
          <div className="text-2xl font-black font-mono-numbers text-zinc-900">
            ${valorInventarioVenta.toLocaleString('es-ES', { maximumFractionDigits: 0 })}
          </div>
          <span className="text-[10px] text-zinc-400">
            A precio de venta
          </span>
        </div>

        <div className="col-span-2 sm:col-span-1 bg-white rounded-2xl border border-zinc-200 p-3.5 shadow-xs flex items-center justify-between sm:block">
          <div>
            <span className="text-[11px] font-medium text-zinc-500 uppercase block mb-0.5">
              Stock Bajo (≤ 5 u.)
            </span>
            <div className={`text-2xl font-black font-mono-numbers ${lowStockCount > 0 ? 'text-zinc-900' : 'text-zinc-400'}`}>
              {lowStockCount} <span className="text-xs font-normal text-zinc-500">artículos</span>
            </div>
          </div>
          {lowStockCount > 0 && (
            <span className="text-[10px] bg-zinc-100 border border-zinc-300 text-zinc-800 font-bold px-2 py-0.5 rounded-full mt-1 inline-block">
              Requiere compra
            </span>
          )}
        </div>
      </div>

      {/* Action and search bar */}
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="w-3.5 h-3.5 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Buscar en catálogo..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full bg-white border border-zinc-300 rounded-xl pl-9 pr-3 py-2 text-xs text-zinc-800 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        <button
          onClick={onOpenNewProduct}
          className="bg-black hover:bg-zinc-800 text-white font-bold text-xs px-3.5 py-2 rounded-xl flex items-center gap-1.5 shadow-sm transition active:scale-[0.98] shrink-0 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>+ Nuevo Producto</span>
        </button>
      </div>

      {/* Products list */}
      <div className="bg-white rounded-2xl border border-zinc-200 p-4 shadow-xs space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-zinc-100 text-xs font-semibold text-zinc-500">
          <span>ARTÍCULO ({filtered.length})</span>
          <span>CANTIDAD & PRECIO</span>
        </div>

        <div className="divide-y divide-zinc-100">
          {filtered.length === 0 ? (
            <div className="py-12 text-center text-zinc-400 text-xs space-y-2">
              <Package className="w-8 h-8 mx-auto text-zinc-300" />
              <p>No se encontraron productos en el catálogo.</p>
              <button
                onClick={onOpenNewProduct}
                className="text-black underline font-semibold text-xs inline-block"
              >
                + Agregar tu primer producto
              </button>
            </div>
          ) : (
            filtered.map(prod => {
              const isLow = prod.stock <= 5 && prod.stock > 0;
              const isOut = prod.stock === 0;

              return (
                <div
                  key={prod.id}
                  className="py-3 flex items-center justify-between gap-3 hover:bg-zinc-50/60 rounded-xl px-1.5 transition"
                >
                  {/* Left: Name, category, prices */}
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-zinc-900 text-sm truncate">
                        {prod.name}
                      </h4>
                      {prod.category && (
                        <span className="text-[10px] bg-zinc-100 border border-zinc-200 text-zinc-600 px-1.5 py-0.2 rounded-md font-medium shrink-0">
                          {prod.category}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2 text-xs text-zinc-500 mt-1 font-mono-numbers">
                      <span>Precio: <strong className="text-zinc-900">${prod.price.toLocaleString('es-ES')}</strong></span>
                    </div>
                  </div>

                  {/* Right: Stock Counter & Stepper Buttons */}
                  <div className="flex items-center gap-2 shrink-0">
                    <div className="text-right mr-1">
                      <span
                        className={`font-mono-numbers font-bold text-sm block ${
                          isOut
                            ? 'text-zinc-400 line-through'
                            : isLow
                            ? 'text-zinc-900 font-extrabold'
                            : 'text-zinc-900'
                        }`}
                      >
                        {prod.stock} u.
                      </span>
                      <span
                        className={`text-[9px] font-bold uppercase tracking-wider block ${
                          isOut
                            ? 'text-zinc-500'
                            : isLow
                            ? 'text-zinc-700'
                            : 'text-zinc-400'
                        }`}
                      >
                        {isOut ? 'Agotado' : isLow ? 'Stock Bajo' : 'Disponible'}
                      </span>
                    </div>

                    {/* Quick +/- Steppers */}
                    <div className="flex items-center bg-zinc-100 rounded-xl border border-zinc-200 p-0.5">
                      <button
                        onClick={() => onUpdateStock(prod.id, -1)}
                        disabled={prod.stock <= 0}
                        className="p-1.5 rounded-lg text-zinc-600 hover:text-black hover:bg-white transition disabled:opacity-30 disabled:hover:bg-transparent"
                        title="Restar 1 unidad"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => onUpdateStock(prod.id, 1)}
                        className="p-1.5 rounded-lg text-zinc-600 hover:text-black hover:bg-white transition"
                        title="Sumar 1 unidad"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <button
                      onClick={() => {
                        if (confirm(`¿Eliminar "${prod.name}" del catálogo?`)) {
                          onDeleteProduct(prod.id);
                        }
                      }}
                      className="p-1 text-zinc-300 hover:text-zinc-700 rounded transition ml-1"
                      title="Eliminar producto"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
