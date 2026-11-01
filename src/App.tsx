import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { NewMovementModal } from './components/NewMovementModal';
import { NewProductModal } from './components/NewProductModal';
import { StockView } from './components/StockView';
import { IOSGuideModal } from './components/IOSGuideModal';
import { DeployGuideModal } from './components/DeployGuideModal';
import { Movement, MovementType, FilterType, Product, NavTab } from './types';
import { storage } from './services/storage';
import { Plus, Minus, Search, Download, Trash2, TrendingUp, TrendingDown, Scale, Package } from 'lucide-react';
import { useOnlineStatus } from './hooks/useOnlineStatus';

export default function App() {
  const isOnline = useOnlineStatus();
  const [activeTab, setActiveTab] = useState<NavTab>('movements');

  // Core data
  const [movements, setMovements] = useState<Movement[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [filterType, setFilterType] = useState<FilterType>('TODOS');
  const [searchQuery, setSearchQuery] = useState('');

  // Modals
  const [movementModalState, setMovementModalState] = useState<{ isOpen: boolean; type: MovementType }>({
    isOpen: false,
    type: 'VENTA',
  });
  const [showProductModal, setShowProductModal] = useState(false);
  const [showIosGuide, setShowIosGuide] = useState(false);
  const [showDeployGuide, setShowDeployGuide] = useState(false);

  // Load from localStorage
  const loadData = () => {
    setMovements(storage.getMovements());
    setProducts(storage.getProducts());
  };

  useEffect(() => {
    loadData();
  }, []);

  // Totals calculations
  const totalGanancia = movements
    .filter(m => m.type === 'VENTA')
    .reduce((sum, m) => sum + m.amount, 0);

  const totalPerdida = movements
    .filter(m => m.type === 'COMPRA')
    .reduce((sum, m) => sum + m.amount, 0);

  const balanceNeto = totalGanancia - totalPerdida;
  const countGanancias = movements.filter(m => m.type === 'VENTA').length;
  const countPerdidas = movements.filter(m => m.type === 'COMPRA').length;

  // Save movement (updates both movements and products stock in storage)
  const handleSaveMovement = (data: Omit<Movement, 'id'>) => {
    storage.addMovement(data);
    loadData();
  };

  // Delete movement
  const handleDeleteMovement = (id: string) => {
    if (confirm('¿Eliminar este registro?')) {
      const updated = storage.deleteMovement(id);
      setMovements(updated);
    }
  };

  // Stock operations
  const handleSaveProduct = (prodData: Omit<Product, 'id'>) => {
    storage.addProduct(prodData);
    loadData();
  };

  const handleUpdateStock = (productId: string, delta: number) => {
    const updated = storage.updateProductStock(productId, delta);
    setProducts(updated);
  };

  const handleDeleteProduct = (productId: string) => {
    const updated = storage.deleteProduct(productId);
    setProducts(updated);
  };

  // Export CSV
  const handleExport = () => {
    const csv = storage.exportToCsv();
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `ganancias_y_perdidas_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filtered movements
  const filteredMovements = movements.filter(m => {
    const matchesType =
      filterType === 'TODOS' ||
      (filterType === 'GANANCIAS' && m.type === 'VENTA') ||
      (filterType === 'PERDIDAS' && m.type === 'COMPRA');

    const matchesSearch =
      m.concept.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (m.productName && m.productName.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (m.paymentMethod && m.paymentMethod.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (m.category && m.category.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesType && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 flex flex-col font-sans selection:bg-black selection:text-white pb-24">
      {/* Header */}
      <Header
        onOpenIosGuide={() => setShowIosGuide(true)}
        onOpenDeployGuide={() => setShowDeployGuide(true)}
      />

      <main className="flex-1 w-full max-w-2xl mx-auto px-4 py-4 space-y-4">
        {/* VIEW 1: MOVEMENTS & BALANCE */}
        {activeTab === 'movements' && (
          <>
            {/* TOTAL DE GANANCIA & TOTAL DE PÉRDIDA CARDS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Card: TOTAL DE GANANCIA */}
              <div className="bg-white rounded-2xl border-2 border-zinc-900 p-4 sm:p-5 shadow-xs">
                <div className="flex items-center justify-between text-xs text-zinc-600 font-bold uppercase tracking-wider mb-1">
                  <span className="flex items-center gap-1.5">
                    <TrendingUp className="w-4 h-4 text-zinc-900" />
                    Total Ganancia
                  </span>
                  <span className="bg-black text-white px-2 py-0.5 rounded-full text-[10px]">
                    {countGanancias} {countGanancias === 1 ? 'venta' : 'ventas'}
                  </span>
                </div>
                <div className="text-3xl font-black font-mono-numbers text-zinc-900 tracking-tight my-1">
                  +${totalGanancia.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </div>
                <p className="text-[11px] text-zinc-500">
                  Total de dinero ingresado por ventas
                </p>
              </div>

              {/* Card: TOTAL DE PÉRDIDA */}
              <div className="bg-white rounded-2xl border border-zinc-300 p-4 sm:p-5 shadow-xs">
                <div className="flex items-center justify-between text-xs text-zinc-600 font-bold uppercase tracking-wider mb-1">
                  <span className="flex items-center gap-1.5">
                    <TrendingDown className="w-4 h-4 text-zinc-700" />
                    Total Pérdida
                  </span>
                  <span className="bg-zinc-100 text-zinc-800 border border-zinc-300 px-2 py-0.5 rounded-full text-[10px]">
                    {countPerdidas} {countPerdidas === 1 ? 'compra' : 'compras'}
                  </span>
                </div>
                <div className="text-3xl font-black font-mono-numbers text-zinc-800 tracking-tight my-1">
                  -${totalPerdida.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </div>
                <p className="text-[11px] text-zinc-500">
                  Total de dinero salido por compras y gastos
                </p>
              </div>
            </div>

            {/* BALANCE NETO / RESULTADO FINAL CARD */}
            <div className="bg-white rounded-2xl border border-zinc-200 p-4 shadow-xs flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-zinc-100 border border-zinc-200 text-zinc-900 flex items-center justify-center shrink-0">
                  <Scale className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] text-zinc-500 font-semibold uppercase tracking-wider block">
                    Resultado Final (Balance Neto)
                  </span>
                  <div className="text-xl sm:text-2xl font-extrabold font-mono-numbers text-zinc-900 leading-tight">
                    {balanceNeto >= 0 ? '+' : ''}${balanceNeto.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </div>
                </div>
              </div>

              <div className="text-right">
                <span
                  className={`text-xs font-bold px-3 py-1 rounded-full border inline-block ${
                    balanceNeto > 0
                      ? 'bg-zinc-900 text-white border-zinc-900'
                      : balanceNeto < 0
                      ? 'bg-zinc-100 text-zinc-800 border-zinc-300'
                      : 'bg-zinc-100 text-zinc-600 border-zinc-200'
                  }`}
                >
                  {balanceNeto > 0 ? 'Ganancia Neta' : balanceNeto < 0 ? 'Pérdida Neta' : 'En Cero'}
                </span>
              </div>
            </div>

            {/* TWO PRIMARY ACTION BUTTONS */}
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setMovementModalState({ isOpen: true, type: 'VENTA' })}
                className="py-3 px-4 rounded-xl bg-black hover:bg-zinc-800 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-sm transition active:scale-[0.98] cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>+ Registrar Ganancia</span>
              </button>

              <button
                onClick={() => setMovementModalState({ isOpen: true, type: 'COMPRA' })}
                className="py-3 px-4 rounded-xl bg-white hover:bg-zinc-100 text-zinc-900 border-2 border-zinc-900 font-bold text-sm flex items-center justify-center gap-2 transition active:scale-[0.98] cursor-pointer"
              >
                <Minus className="w-4 h-4" />
                <span>- Registrar Pérdida</span>
              </button>
            </div>

            {/* MOVEMENTS LIST SECTION */}
            <div className="bg-white rounded-2xl border border-zinc-200 p-4 shadow-xs space-y-3">
              {/* Controls row: Filter tabs & Search */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2 pb-2 border-b border-zinc-100">
                {/* Filter pills */}
                <div className="flex items-center gap-1 bg-zinc-100 p-1 rounded-xl">
                  {(['TODOS', 'GANANCIAS', 'PERDIDAS'] as const).map(f => (
                    <button
                      key={f}
                      onClick={() => setFilterType(f)}
                      className={`px-3 py-1 rounded-lg text-xs font-semibold transition cursor-pointer ${
                        filterType === f
                          ? 'bg-white text-zinc-900 shadow-xs'
                          : 'text-zinc-500 hover:text-zinc-900'
                      }`}
                    >
                      {f === 'TODOS' ? 'Todos' : f === 'GANANCIAS' ? 'Ganancias' : 'Pérdidas'}
                    </button>
                  ))}
                </div>

                {/* Search & Export */}
                <div className="flex items-center gap-2">
                  <div className="relative flex-1 sm:w-44">
                    <Search className="w-3.5 h-3.5 text-zinc-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Buscar..."
                      value={searchQuery}
                      onChange={e => setSearchQuery(e.target.value)}
                      className="w-full bg-zinc-50 border border-zinc-200 rounded-lg pl-8 pr-2.5 py-1 text-xs text-zinc-800 placeholder-zinc-400 focus:outline-none focus:ring-1 focus:ring-black"
                    />
                  </div>

                  {movements.length > 0 && (
                    <button
                      onClick={handleExport}
                      title="Descargar lista en Excel / CSV"
                      className="p-1.5 rounded-lg border border-zinc-200 hover:bg-zinc-100 text-zinc-600 transition cursor-pointer"
                    >
                      <Download className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>

              {/* List items */}
              <div className="divide-y divide-zinc-100">
                {filteredMovements.length === 0 ? (
                  <div className="py-12 text-center text-zinc-400 text-xs">
                    No hay movimientos registrados en esta categoría.
                  </div>
                ) : (
                  filteredMovements.map(item => {
                    const isGanancia = item.type === 'VENTA';
                    const formattedDate = new Date(item.date).toLocaleDateString('es-ES', {
                      day: 'numeric',
                      month: 'short',
                      hour: '2-digit',
                      minute: '2-digit'
                    });

                    return (
                      <div
                        key={item.id}
                        className="py-3 flex items-center justify-between gap-3 hover:bg-zinc-50/60 rounded-lg px-1 transition"
                      >
                        {/* Left: Indicator & info */}
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 font-bold text-sm ${
                              isGanancia
                                ? 'bg-zinc-900 text-white'
                                : 'bg-zinc-100 border border-zinc-300 text-zinc-800'
                            }`}
                          >
                            {isGanancia ? '+' : '-'}
                          </div>
                          <div>
                            <p className="font-semibold text-zinc-900 text-sm leading-tight">
                              {item.concept}
                            </p>
                            <div className="flex items-center gap-1.5 text-[11px] text-zinc-400 mt-0.5">
                              <span>{formattedDate}</span>
                              {item.quantity && item.quantity > 0 && (
                                <>
                                  <span>•</span>
                                  <span className="text-zinc-700 font-semibold bg-zinc-100 px-1 rounded">
                                    {item.quantity} {item.quantity === 1 ? 'unidad' : 'unidades'}
                                  </span>
                                </>
                              )}
                              {item.paymentMethod && (
                                <>
                                  <span>•</span>
                                  <span className="text-zinc-600 font-medium">{item.paymentMethod}</span>
                                </>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Right: Amount & Delete */}
                        <div className="flex items-center gap-3">
                          <div className="text-right">
                            <span
                              className={`font-mono-numbers text-sm sm:text-base font-bold ${
                                isGanancia ? 'text-zinc-900' : 'text-zinc-700'
                              }`}
                            >
                              {isGanancia ? '+' : '-'}${item.amount.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                            </span>
                            <span className="block text-[10px] text-zinc-400 uppercase tracking-wider font-semibold">
                              {isGanancia ? 'GANANCIA' : 'PÉRDIDA'}
                            </span>
                          </div>

                          <button
                            onClick={() => handleDeleteMovement(item.id)}
                            className="text-zinc-300 hover:text-zinc-700 p-1 rounded transition cursor-pointer"
                            title="Eliminar registro"
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
          </>
        )}

        {/* VIEW 2: STOCK CATALOG */}
        {activeTab === 'stock' && (
          <StockView
            products={products}
            onOpenNewProduct={() => setShowProductModal(true)}
            onUpdateStock={handleUpdateStock}
            onDeleteProduct={handleDeleteProduct}
          />
        )}
      </main>

      {/* FIXED BOTTOM NAVIGATION BAR */}
      <BottomNav
        activeTab={activeTab}
        onChangeTab={setActiveTab}
        productsCount={products.length}
      />

      {/* MODALS */}
      <NewMovementModal
        isOpen={movementModalState.isOpen}
        initialType={movementModalState.type}
        products={products}
        onClose={() => setMovementModalState(prev => ({ ...prev, isOpen: false }))}
        onSave={handleSaveMovement}
        onOpenCreateProduct={() => setShowProductModal(true)}
      />

      <NewProductModal
        isOpen={showProductModal}
        onClose={() => setShowProductModal(false)}
        onSave={handleSaveProduct}
      />

      <IOSGuideModal
        isOpen={showIosGuide}
        onClose={() => setShowIosGuide(false)}
      />

      <DeployGuideModal
        isOpen={showDeployGuide}
        onClose={() => setShowDeployGuide(false)}
      />
    </div>
  );
}
