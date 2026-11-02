import React, { useState, useEffect } from 'react';
import { Movement, MovementType, MovementItem, Product } from '../types';
import { X, Plus, Minus, Trash2, PlusCircle, ShoppingBag, Truck } from 'lucide-react';

interface NewMovementModalProps {
  isOpen: boolean;
  initialType: MovementType;
  products: Product[];
  onClose: () => void;
  onSave: (data: Omit<Movement, 'id'>) => void;
  onOpenCreateProduct?: () => void;
}

interface SaleLineItem {
  id: string; // unique key in form
  productId: string;
  name: string;
  quantity: number;
  unitPrice: number;
}

interface PurchaseLineItem {
  id: string;
  productId: string;
  name: string;
  quantity: number;
}

export const NewMovementModal: React.FC<NewMovementModalProps> = ({
  isOpen,
  initialType,
  products,
  onClose,
  onSave,
  onOpenCreateProduct
}) => {
  const [type, setType] = useState<MovementType>(initialType);
  const [mode, setMode] = useState<'catalog' | 'manual'>('catalog');

  // VENTA: Multiple items list
  const [saleItems, setSaleItems] = useState<SaleLineItem[]>([]);

  // COMPRA: Multiple items list (NO UNIT PRICES SHOWN)
  const [purchaseItems, setPurchaseItems] = useState<PurchaseLineItem[]>([]);

  // Manual concept & total
  const [manualConcept, setManualConcept] = useState('');
  const [totalAmount, setTotalAmount] = useState<string>('');
  const [paymentMethod, setPaymentMethod] = useState<'Efectivo' | 'Transferencia' | 'Tarjeta' | 'Otro'>('Efectivo');

  // Initialize modal state on open
  useEffect(() => {
    if (isOpen) {
      setType(initialType);
      setPaymentMethod('Efectivo');
      setManualConcept('');

      if (products.length > 0) {
        setMode('catalog');
        const first = products[0];

        // Init sale item with first product
        const initialSale: SaleLineItem = {
          id: `line-${Date.now()}-1`,
          productId: first.id,
          name: first.name,
          quantity: 1,
          unitPrice: first.price
        };
        setSaleItems([initialSale]);
        if (initialType === 'VENTA') {
          setTotalAmount(first.price.toString());
        }

        // Init purchase item with first product (no unit price)
        const initialPurchase: PurchaseLineItem = {
          id: `pline-${Date.now()}-1`,
          productId: first.id,
          name: first.name,
          quantity: 10
        };
        setPurchaseItems([initialPurchase]);
        if (initialType === 'COMPRA') {
          setTotalAmount('');
        }
      } else {
        setMode('manual');
        setSaleItems([]);
        setPurchaseItems([]);
        setTotalAmount('');
      }
    }
  }, [isOpen, initialType, products]);

  // Recalculate VENTA total when saleItems change
  const recalculateSaleTotal = (items: SaleLineItem[]) => {
    const sum = items.reduce((acc, it) => acc + it.quantity * it.unitPrice, 0);
    setTotalAmount(sum > 0 ? sum.toString() : '');
  };

  // VENTA Handlers
  const handleAddSaleItem = () => {
    if (products.length === 0) return;
    const first = products[0];
    const newItem: SaleLineItem = {
      id: `line-${Date.now()}-${Math.random().toString(36).substring(2, 5)}`,
      productId: first.id,
      name: first.name,
      quantity: 1,
      unitPrice: first.price
    };
    const updated = [...saleItems, newItem];
    setSaleItems(updated);
    recalculateSaleTotal(updated);
  };

  const handleUpdateSaleItem = (id: string, updates: Partial<SaleLineItem>) => {
    const updated = saleItems.map(item => {
      if (item.id === id) {
        const prod = updates.productId ? products.find(p => p.id === updates.productId) : null;
        return {
          ...item,
          ...updates,
          name: prod ? prod.name : (updates.name ?? item.name),
          unitPrice: prod ? prod.price : (updates.unitPrice ?? item.unitPrice)
        };
      }
      return item;
    });
    setSaleItems(updated);
    recalculateSaleTotal(updated);
  };

  const handleRemoveSaleItem = (id: string) => {
    if (saleItems.length <= 1) return;
    const updated = saleItems.filter(item => item.id !== id);
    setSaleItems(updated);
    recalculateSaleTotal(updated);
  };

  // COMPRA Handlers (No unit prices)
  const handleAddPurchaseItem = () => {
    if (products.length === 0) return;
    const first = products[0];
    const newItem: PurchaseLineItem = {
      id: `pline-${Date.now()}-${Math.random().toString(36).substring(2, 5)}`,
      productId: first.id,
      name: first.name,
      quantity: 5
    };
    setPurchaseItems([...purchaseItems, newItem]);
  };

  const handleUpdatePurchaseItem = (id: string, updates: Partial<PurchaseLineItem>) => {
    const updated = purchaseItems.map(item => {
      if (item.id === id) {
        const prod = updates.productId ? products.find(p => p.id === updates.productId) : null;
        return {
          ...item,
          ...updates,
          name: prod ? prod.name : (updates.name ?? item.name)
        };
      }
      return item;
    });
    setPurchaseItems(updated);
  };

  const handleRemovePurchaseItem = (id: string) => {
    if (purchaseItems.length <= 1) return;
    setPurchaseItems(purchaseItems.filter(item => item.id !== id));
  };

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalAmount = parseFloat(totalAmount);
    if (isNaN(finalAmount) || finalAmount <= 0) {
      alert('Por favor ingresa un monto válido.');
      return;
    }

    if (type === 'VENTA') {
      if (mode === 'catalog' && saleItems.length > 0) {
        // Multi-item sale
        const itemsToSave: MovementItem[] = saleItems.map(it => ({
          productId: it.productId,
          productName: it.name,
          quantity: it.quantity,
          unitPrice: it.unitPrice
        }));

        const conceptSummary = saleItems
          .map(it => `${it.quantity}x ${it.name}`)
          .join(', ');

        onSave({
          type: 'VENTA',
          concept: `Venta: ${conceptSummary}`,
          amount: finalAmount,
          items: itemsToSave,
          productId: saleItems[0].productId,
          productName: saleItems[0].name,
          quantity: saleItems.reduce((acc, i) => acc + i.quantity, 0),
          date: new Date().toISOString(),
          paymentMethod,
          category: 'Venta de productos'
        });
      } else {
        // Manual sale
        if (!manualConcept.trim()) return;
        onSave({
          type: 'VENTA',
          concept: manualConcept.trim(),
          amount: finalAmount,
          date: new Date().toISOString(),
          paymentMethod,
          category: 'Ingreso General'
        });
      }
    } else {
      // COMPRA (Pérdida)
      if (mode === 'catalog' && purchaseItems.length > 0) {
        // Multi-item restock without unit prices
        const itemsToSave: MovementItem[] = purchaseItems.map(it => ({
          productId: it.productId,
          productName: it.name,
          quantity: it.quantity
        }));

        const conceptSummary = purchaseItems
          .map(it => `${it.quantity}x ${it.name}`)
          .join(', ');

        onSave({
          type: 'COMPRA',
          concept: `Compra de stock: ${conceptSummary}`,
          amount: finalAmount,
          items: itemsToSave,
          productId: purchaseItems[0].productId,
          productName: purchaseItems[0].name,
          quantity: purchaseItems.reduce((acc, i) => acc + i.quantity, 0),
          date: new Date().toISOString(),
          paymentMethod,
          category: 'Mercadería'
        });
      } else {
        // Manual purchase / expense
        if (!manualConcept.trim()) return;
        onSave({
          type: 'COMPRA',
          concept: manualConcept.trim(),
          amount: finalAmount,
          date: new Date().toISOString(),
          paymentMethod,
          category: 'Gasto General'
        });
      }
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-100 overflow-y-auto">
      <div className="relative w-full max-w-md rounded-2xl bg-white border border-zinc-300 p-4 sm:p-5 shadow-2xl text-zinc-900 my-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-zinc-400 hover:text-zinc-800 hover:bg-zinc-100 transition"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-lg font-bold text-zinc-900 mb-3">
          {type === 'VENTA' ? 'Registrar Ganancia (Venta)' : 'Registrar Pérdida (Compra)'}
        </h2>

        {/* Type toggle: Venta vs Compra */}
        <div className="grid grid-cols-2 gap-2 p-1 bg-zinc-100 rounded-xl mb-3">
          <button
            type="button"
            onClick={() => {
              setType('VENTA');
              recalculateSaleTotal(saleItems);
            }}
            className={`py-2 text-xs font-bold rounded-lg flex items-center justify-center gap-1.5 transition cursor-pointer ${
              type === 'VENTA'
                ? 'bg-black text-white shadow-sm'
                : 'text-zinc-600 hover:text-zinc-900'
            }`}
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Ganancia (Venta)</span>
          </button>
          <button
            type="button"
            onClick={() => {
              setType('COMPRA');
              setTotalAmount('');
            }}
            className={`py-2 text-xs font-bold rounded-lg flex items-center justify-center gap-1.5 transition cursor-pointer ${
              type === 'COMPRA'
                ? 'bg-black text-white shadow-sm'
                : 'text-zinc-600 hover:text-zinc-900'
            }`}
          >
            <Minus className="w-3.5 h-3.5" />
            <span>Pérdida (Compra)</span>
          </button>
        </div>

        {/* Source Toggle: Catálogo vs Manual */}
        <div className="flex items-center justify-between text-xs mb-3 pb-2 border-b border-zinc-100">
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => setMode('catalog')}
              className={`px-2.5 py-1 rounded-lg font-medium transition cursor-pointer ${
                mode === 'catalog'
                  ? 'bg-zinc-900 text-white font-semibold'
                  : 'text-zinc-500 hover:bg-zinc-100'
              }`}
            >
              {type === 'VENTA' ? 'Artículos de Stock' : 'Reponer Stock'}
            </button>
            <button
              type="button"
              onClick={() => setMode('manual')}
              className={`px-2.5 py-1 rounded-lg font-medium transition cursor-pointer ${
                mode === 'manual'
                  ? 'bg-zinc-900 text-white font-semibold'
                  : 'text-zinc-500 hover:bg-zinc-100'
              }`}
            >
              Gasto / Ingreso Libre
            </button>
          </div>

          {onOpenCreateProduct && (
            <button
              type="button"
              onClick={() => {
                onClose();
                onOpenCreateProduct();
              }}
              className="text-[11px] text-zinc-800 hover:underline font-semibold flex items-center gap-0.5"
            >
              <PlusCircle className="w-3 h-3" />
              <span>Nuevo artículo</span>
            </button>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
          {/* ========================================================= */}
          {/* VENTA (GANANCIA) - MULTI-ITEM SUPPORT                     */}
          {/* ========================================================= */}
          {type === 'VENTA' && (
            <>
              {mode === 'catalog' ? (
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between text-zinc-600 font-semibold text-[11px]">
                    <span className="flex items-center gap-1">
                      <ShoppingBag className="w-3.5 h-3.5 text-black" />
                      Artículos vendidos en esta venta ({saleItems.length})
                    </span>
                    <span>Subtotal</span>
                  </div>

                  {/* List of items being sold */}
                  <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                    {saleItems.map((item, idx) => {
                      const prod = products.find(p => p.id === item.productId);
                      const currentStock = prod ? prod.stock : 0;
                      const subtotal = item.quantity * item.unitPrice;

                      return (
                        <div
                          key={item.id}
                          className="p-2.5 rounded-xl border border-zinc-200 bg-zinc-50 space-y-2"
                        >
                          <div className="flex items-center justify-between gap-2">
                            {/* Product Selector */}
                            <select
                              value={item.productId}
                              onChange={e => handleUpdateSaleItem(item.id, { productId: e.target.value })}
                              className="w-full bg-white border border-zinc-300 rounded-lg px-2 py-1 text-xs font-medium text-zinc-900 focus:outline-none"
                            >
                              {products.map(p => (
                                <option key={p.id} value={p.id}>
                                  {p.name} (Stock: {p.stock} u. | ${p.price.toLocaleString('es-ES')})
                                </option>
                              ))}
                            </select>

                            {/* Remove button if more than 1 item */}
                            {saleItems.length > 1 && (
                              <button
                                type="button"
                                onClick={() => handleRemoveSaleItem(item.id)}
                                className="text-zinc-400 hover:text-red-500 p-1"
                                title="Quitar este artículo de la venta"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            )}
                          </div>

                          <div className="flex items-center justify-between">
                            {/* Quantity stepper */}
                            <div className="flex items-center gap-1.5">
                              <span className="text-[11px] text-zinc-500">Cantidad:</span>
                              <div className="flex items-center border border-zinc-300 rounded-lg bg-white overflow-hidden">
                                <button
                                  type="button"
                                  onClick={() => handleUpdateSaleItem(item.id, { quantity: Math.max(1, item.quantity - 1) })}
                                  className="px-2 py-1 text-zinc-600 hover:bg-zinc-100"
                                >
                                  <Minus className="w-3 h-3" />
                                </button>
                                <input
                                  type="number"
                                  min="1"
                                  value={item.quantity}
                                  onChange={e => handleUpdateSaleItem(item.id, { quantity: Math.max(1, parseInt(e.target.value, 10) || 1) })}
                                  className="w-12 text-center font-bold text-xs font-mono-numbers focus:outline-none"
                                />
                                <button
                                  type="button"
                                  onClick={() => handleUpdateSaleItem(item.id, { quantity: item.quantity + 1 })}
                                  className="px-2 py-1 text-zinc-600 hover:bg-zinc-100"
                                >
                                  <Plus className="w-3 h-3" />
                                </button>
                              </div>
                            </div>

                            {/* Subtotal */}
                            <div className="text-right">
                              <span className="font-bold text-xs font-mono-numbers text-zinc-900">
                                ${subtotal.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                              </span>
                              <span className="block text-[9px] text-zinc-400">
                                ({item.quantity} x ${item.unitPrice})
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Button to add another item to this sale */}
                  <button
                    type="button"
                    onClick={handleAddSaleItem}
                    className="w-full py-1.5 px-3 rounded-lg border border-dashed border-zinc-300 hover:border-black text-zinc-700 hover:text-black font-semibold text-xs flex items-center justify-center gap-1.5 transition"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>+ Agregar otro artículo a esta venta</span>
                  </button>
                </div>
              ) : (
                /* Manual Venta */
                <div>
                  <label className="block font-medium text-zinc-700 mb-1">
                    Concepto de la venta *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ej. Venta especial, servicio, varios..."
                    value={manualConcept}
                    onChange={e => setManualConcept(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-zinc-300 bg-white text-zinc-900 text-sm focus:outline-none focus:ring-2 focus:ring-black"
                  />
                </div>
              )}
            </>
          )}

          {/* ========================================================= */}
          {/* COMPRA (PÉRDIDA) - NO UNIT PRICES / DIRECT TOTAL          */}
          {/* ========================================================= */}
          {type === 'COMPRA' && (
            <>
              {mode === 'catalog' ? (
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between text-zinc-600 font-semibold text-[11px]">
                    <span className="flex items-center gap-1">
                      <Truck className="w-3.5 h-3.5 text-black" />
                      ¿Qué mercadería compraste para sumar a stock?
                    </span>
                  </div>

                  {/* List of items bought - ZERO UNIT PRICES SHOWN */}
                  <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                    {purchaseItems.map(item => (
                      <div
                        key={item.id}
                        className="p-2.5 rounded-xl border border-zinc-200 bg-zinc-50 space-y-2"
                      >
                        <div className="flex items-center justify-between gap-2">
                          <select
                            value={item.productId}
                            onChange={e => handleUpdatePurchaseItem(item.id, { productId: e.target.value })}
                            className="w-full bg-white border border-zinc-300 rounded-lg px-2 py-1 text-xs font-medium text-zinc-900 focus:outline-none"
                          >
                            {products.map(p => (
                              <option key={p.id} value={p.id}>
                                {p.name} (Stock actual: {p.stock} u.)
                              </option>
                            ))}
                          </select>

                          {purchaseItems.length > 1 && (
                            <button
                              type="button"
                              onClick={() => handleRemovePurchaseItem(item.id)}
                              className="text-zinc-400 hover:text-red-500 p-1"
                              title="Quitar de la lista"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>

                        <div className="flex items-center justify-between">
                          <span className="text-[11px] text-zinc-600 font-medium">
                            Unidades que compraste (para sumar al stock):
                          </span>
                          <div className="flex items-center border border-zinc-300 rounded-lg bg-white overflow-hidden">
                            <button
                              type="button"
                              onClick={() => handleUpdatePurchaseItem(item.id, { quantity: Math.max(1, item.quantity - 1) })}
                              className="px-2 py-1 text-zinc-600 hover:bg-zinc-100"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <input
                              type="number"
                              min="1"
                              value={item.quantity}
                              onChange={e => handleUpdatePurchaseItem(item.id, { quantity: Math.max(1, parseInt(e.target.value, 10) || 1) })}
                              className="w-12 text-center font-bold text-xs font-mono-numbers focus:outline-none"
                            />
                            <button
                              type="button"
                              onClick={() => handleUpdatePurchaseItem(item.id, { quantity: item.quantity + 1 })}
                              className="px-2 py-1 text-zinc-600 hover:bg-zinc-100"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Add another product to the purchase */}
                  <button
                    type="button"
                    onClick={handleAddPurchaseItem}
                    className="w-full py-1.5 px-3 rounded-lg border border-dashed border-zinc-300 hover:border-black text-zinc-700 hover:text-black font-semibold text-xs flex items-center justify-center gap-1.5 transition"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>+ Agregar otro artículo comprado</span>
                  </button>
                </div>
              ) : (
                /* Manual Purchase / Gasto general */
                <div>
                  <label className="block font-medium text-zinc-700 mb-1">
                    ¿En qué gastaste? *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ej. Alquiler, luz, comida, flete, insumos..."
                    value={manualConcept}
                    onChange={e => setManualConcept(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-zinc-300 bg-white text-zinc-900 text-sm focus:outline-none focus:ring-2 focus:ring-black"
                  />
                </div>
              )}
            </>
          )}

          {/* ========================================================= */}
          {/* MONTO TOTAL PAGADO / COBRADO ($)                          */}
          {/* ========================================================= */}
          <div className="pt-1">
            <label className="block font-bold text-zinc-900 mb-1">
              {type === 'VENTA' ? 'Monto Total Cobrado ($)' : '¿Cuánto pagaste en total por la compra? ($)'}
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400 font-bold text-xl">
                $
              </span>
              <input
                type="number"
                step="any"
                inputMode="decimal"
                required
                placeholder="0.00"
                value={totalAmount}
                onChange={e => setTotalAmount(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 rounded-xl border-2 border-zinc-900 bg-white text-xl font-black font-mono-numbers text-zinc-900 focus:outline-none"
              />
            </div>
            {type === 'VENTA' && mode === 'catalog' && (
              <span className="text-[10px] text-zinc-400 block mt-1">
                Calculado automáticamente de los artículos agregados arriba (puedes ajustarlo si cobraste diferente).
              </span>
            )}
          </div>

          {/* Forma de pago */}
          <div>
            <label className="block font-medium text-zinc-600 mb-1">
              Forma de pago
            </label>
            <div className="grid grid-cols-3 gap-1.5">
              {(['Efectivo', 'Transferencia', 'Tarjeta'] as const).map(method => (
                <button
                  type="button"
                  key={method}
                  onClick={() => setPaymentMethod(method)}
                  className={`py-1.5 text-xs font-medium rounded-lg border transition cursor-pointer ${
                    paymentMethod === method
                      ? 'border-black bg-zinc-900 text-white font-semibold'
                      : 'border-zinc-200 text-zinc-600 hover:bg-zinc-50'
                  }`}
                >
                  {method}
                </button>
              ))}
            </div>
          </div>

          {/* Action buttons */}
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
              Guardar {type === 'VENTA' ? 'Ganancia' : 'Pérdida'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
