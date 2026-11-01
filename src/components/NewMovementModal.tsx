import React, { useState, useEffect } from 'react';
import { Movement, MovementType, Product } from '../types';
import { X, Plus, Minus, Package, PlusCircle } from 'lucide-react';

interface NewMovementModalProps {
  isOpen: boolean;
  initialType: MovementType;
  products: Product[];
  onClose: () => void;
  onSave: (data: Omit<Movement, 'id'>) => void;
  onOpenCreateProduct?: () => void;
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
  const [selectionMode, setSelectionMode] = useState<'catalog' | 'manual'>('catalog');
  
  // Selected product from catalog
  const [selectedProductId, setSelectedProductId] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const [unitPrice, setUnitPrice] = useState<string>('');

  // Manual concept & total
  const [concept, setConcept] = useState('');
  const [amount, setAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'Efectivo' | 'Transferencia' | 'Tarjeta' | 'Otro'>('Efectivo');

  // Reset or initialize on open
  useEffect(() => {
    if (isOpen) {
      setType(initialType);
      setQuantity(1);
      setPaymentMethod('Efectivo');

      if (products.length > 0) {
        setSelectionMode('catalog');
        const first = products[0];
        setSelectedProductId(first.id);
        const priceToUse = initialType === 'VENTA' ? first.price : (first.cost || first.price);
        setUnitPrice(priceToUse.toString());
        setAmount(priceToUse.toString());
        setConcept(initialType === 'VENTA' ? `Venta: ${first.name}` : `Compra de stock: ${first.name}`);
      } else {
        setSelectionMode('manual');
        setSelectedProductId('');
        setUnitPrice('');
        setAmount('');
        setConcept('');
      }
    }
  }, [isOpen, initialType, products]);

  // When selected product changes or type changes
  const handleProductSelect = (prodId: string) => {
    setSelectedProductId(prodId);
    const prod = products.find(p => p.id === prodId);
    if (prod) {
      const priceToUse = type === 'VENTA' ? prod.price : (prod.cost || prod.price);
      setUnitPrice(priceToUse.toString());
      setAmount((priceToUse * quantity).toString());
      setConcept(type === 'VENTA' ? `Venta: ${prod.name}` : `Compra de stock: ${prod.name}`);
    }
  };

  const handleTypeChange = (newType: MovementType) => {
    setType(newType);
    if (selectionMode === 'catalog' && selectedProductId) {
      const prod = products.find(p => p.id === selectedProductId);
      if (prod) {
        const priceToUse = newType === 'VENTA' ? prod.price : (prod.cost || prod.price);
        setUnitPrice(priceToUse.toString());
        setAmount((priceToUse * quantity).toString());
        setConcept(newType === 'VENTA' ? `Venta: ${prod.name}` : `Compra de stock: ${prod.name}`);
      }
    }
  };

  const handleQuantityChange = (newQty: number) => {
    const validQty = Math.max(1, newQty);
    setQuantity(validQty);
    const unitP = parseFloat(unitPrice) || 0;
    setAmount((unitP * validQty).toString());
  };

  const handleUnitPriceChange = (val: string) => {
    setUnitPrice(val);
    const parsed = parseFloat(val) || 0;
    setAmount((parsed * quantity).toString());
  };

  if (!isOpen) return null;

  const selectedProd = products.find(p => p.id === selectedProductId);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalAmount = parseFloat(amount);
    if (isNaN(finalAmount) || finalAmount <= 0) return;

    if (selectionMode === 'catalog' && selectedProd) {
      onSave({
        type,
        concept: concept.trim() || `${type === 'VENTA' ? 'Venta' : 'Compra'}: ${selectedProd.name}`,
        productId: selectedProd.id,
        productName: selectedProd.name,
        quantity,
        amount: finalAmount,
        date: new Date().toISOString(),
        paymentMethod,
        category: selectedProd.category || (type === 'VENTA' ? 'Venta' : 'Compra'),
      });
    } else {
      if (!concept.trim()) return;
      onSave({
        type,
        concept: concept.trim(),
        amount: finalAmount,
        date: new Date().toISOString(),
        paymentMethod,
        category: type === 'VENTA' ? 'Ingreso General' : 'Gasto General',
      });
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-100 overflow-y-auto">
      <div className="relative w-full max-w-sm rounded-2xl bg-white border border-zinc-300 p-5 shadow-2xl text-zinc-900 my-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-zinc-400 hover:text-zinc-800 hover:bg-zinc-100 transition"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-lg font-bold text-zinc-900 mb-3">
          {type === 'VENTA' ? 'Registrar Ganancia (Venta)' : 'Registrar Pérdida (Compra)'}
        </h2>

        {/* Type toggle */}
        <div className="grid grid-cols-2 gap-2 p-1 bg-zinc-100 rounded-xl mb-3">
          <button
            type="button"
            onClick={() => handleTypeChange('VENTA')}
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
            onClick={() => handleTypeChange('COMPRA')}
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
              onClick={() => {
                setSelectionMode('catalog');
                if (products.length > 0 && !selectedProductId) {
                  handleProductSelect(products[0].id);
                }
              }}
              className={`px-2.5 py-1 rounded-lg font-medium transition cursor-pointer ${
                selectionMode === 'catalog'
                  ? 'bg-zinc-900 text-white font-semibold'
                  : 'text-zinc-500 hover:bg-zinc-100'
              }`}
            >
              Desde Catálogo
            </button>
            <button
              type="button"
              onClick={() => setSelectionMode('manual')}
              className={`px-2.5 py-1 rounded-lg font-medium transition cursor-pointer ${
                selectionMode === 'manual'
                  ? 'bg-zinc-900 text-white font-semibold'
                  : 'text-zinc-500 hover:bg-zinc-100'
              }`}
            >
              Gasto/Ingreso Libre
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
              <span>Nuevo item</span>
            </button>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-3 text-xs">
          {/* MODE A: From Catalog */}
          {selectionMode === 'catalog' ? (
            <>
              {products.length === 0 ? (
                <div className="p-3 bg-zinc-50 border border-dashed border-zinc-300 rounded-xl text-center space-y-1.5">
                  <p className="text-zinc-500">No tienes productos en tu catálogo aún.</p>
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      onOpenCreateProduct && onOpenCreateProduct();
                    }}
                    className="text-black font-bold underline"
                  >
                    Crear producto ahora
                  </button>
                </div>
              ) : (
                <>
                  {/* Product selector */}
                  <div>
                    <label className="block font-medium text-zinc-700 mb-1">
                      Seleccionar Producto de Stock *
                    </label>
                    <select
                      value={selectedProductId}
                      onChange={e => handleProductSelect(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-zinc-300 bg-white text-zinc-900 text-sm focus:outline-none focus:ring-2 focus:ring-black"
                    >
                      {products.map(p => (
                        <option key={p.id} value={p.id}>
                          {p.name} (Stock: {p.stock} u. | ${p.price})
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Stock impact badge */}
                  {selectedProd && (
                    <div className="p-2 rounded-lg bg-zinc-50 border border-zinc-200 flex items-center justify-between text-[11px]">
                      <span className="text-zinc-500">
                        Stock actual: <strong className="text-zinc-900">{selectedProd.stock} u.</strong>
                      </span>
                      <span className="font-semibold text-zinc-900">
                        {type === 'VENTA'
                          ? `Quedarán: ${Math.max(0, selectedProd.stock - quantity)} u.`
                          : `Pasará a: ${selectedProd.stock + quantity} u.`}
                      </span>
                    </div>
                  )}

                  {/* Quantity and unit price */}
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block font-medium text-zinc-700 mb-1">
                        Cantidad (Unidades)
                      </label>
                      <div className="flex items-center border border-zinc-300 rounded-xl bg-white overflow-hidden">
                        <button
                          type="button"
                          onClick={() => handleQuantityChange(quantity - 1)}
                          className="px-2.5 py-2 text-zinc-600 hover:bg-zinc-100"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <input
                          type="number"
                          min="1"
                          required
                          value={quantity}
                          onChange={e => handleQuantityChange(parseInt(e.target.value, 10) || 1)}
                          className="w-full text-center font-bold font-mono-numbers text-sm focus:outline-none"
                        />
                        <button
                          type="button"
                          onClick={() => handleQuantityChange(quantity + 1)}
                          className="px-2.5 py-2 text-zinc-600 hover:bg-zinc-100"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block font-medium text-zinc-700 mb-1">
                        Precio Unitario ($)
                      </label>
                      <input
                        type="number"
                        step="any"
                        value={unitPrice}
                        onChange={e => handleUnitPriceChange(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-zinc-300 bg-white font-mono-numbers text-sm font-semibold text-zinc-900 focus:outline-none focus:ring-2 focus:ring-black"
                      />
                    </div>
                  </div>
                </>
              )}
            </>
          ) : (
            /* MODE B: Free / Manual Entry */
            <div>
              <label className="block font-medium text-zinc-700 mb-1">
                Concepto / Detalle *
              </label>
              <input
                type="text"
                required
                placeholder={type === 'VENTA' ? 'Ej. Venta servicio, producto no catalogado...' : 'Ej. Alquiler, luz, viáticos, comida...'}
                value={concept}
                onChange={e => setConcept(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-zinc-300 bg-white text-zinc-900 text-sm focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>
          )}

          {/* Total amount */}
          <div>
            <label className="block font-medium text-zinc-700 mb-1">
              Monto Total ($)
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 font-bold text-lg">
                $
              </span>
              <input
                type="number"
                step="any"
                inputMode="decimal"
                required
                placeholder="0.00"
                value={amount}
                onChange={e => setAmount(e.target.value)}
                className="w-full pl-8 pr-3 py-2.5 rounded-xl border border-zinc-300 bg-white text-xl font-bold font-mono-numbers text-zinc-900 focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>
          </div>

          {/* Payment method */}
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
                  className={`py-1.5 text-xs font-medium rounded-lg border transition ${
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

          {/* Buttons */}
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
