import React from 'react';
import { ArrowLeftRight, Package, QrCode } from 'lucide-react';
import { NavTab } from '../types';

interface BottomNavProps {
  activeTab: NavTab;
  onChangeTab: (tab: NavTab) => void;
  productsCount: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  onChangeTab,
  productsCount
}) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-zinc-200 px-2 sm:px-4 pt-1.5 pb-2.5 shadow-[0_-4px_12px_rgba(0,0,0,0.04)]" style={{ paddingBottom: 'max(env(safe-area-inset-bottom, 0px), 10px)' }}>
      <div className="max-w-md mx-auto grid grid-cols-3 gap-1.5 sm:gap-2">
        {/* Tab 1: Movimientos */}
        <button
          onClick={() => onChangeTab('movements')}
          className={`flex flex-col items-center justify-center py-1.5 px-2 rounded-xl transition cursor-pointer ${
            activeTab === 'movements'
              ? 'bg-black text-white font-bold shadow-xs'
              : 'text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100'
          }`}
        >
          <ArrowLeftRight className="w-4 h-4 mb-0.5" />
          <span className="text-[11px] tracking-tight">Movimientos</span>
        </button>

        {/* Tab 2: Catálogo de Stock */}
        <button
          onClick={() => onChangeTab('stock')}
          className={`flex flex-col items-center justify-center py-1.5 px-2 rounded-xl transition cursor-pointer relative ${
            activeTab === 'stock'
              ? 'bg-black text-white font-bold shadow-xs'
              : 'text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100'
          }`}
        >
          <Package className="w-4 h-4 mb-0.5" />
          <span className="text-[11px] tracking-tight flex items-center gap-1">
            Stock
            <span
              className={`text-[9px] px-1.5 py-0.2 rounded-full font-mono ${
                activeTab === 'stock'
                  ? 'bg-zinc-800 text-zinc-200'
                  : 'bg-zinc-200 text-zinc-700'
              }`}
            >
              {productsCount}
            </span>
          </span>
        </button>

        {/* Tab 3: Generador QR */}
        <button
          onClick={() => onChangeTab('qr')}
          className={`flex flex-col items-center justify-center py-1.5 px-2 rounded-xl transition cursor-pointer ${
            activeTab === 'qr'
              ? 'bg-black text-white font-bold shadow-xs'
              : 'text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100'
          }`}
        >
          <QrCode className="w-4 h-4 mb-0.5" />
          <span className="text-[11px] tracking-tight">Generar QR</span>
        </button>
      </div>
    </nav>
  );
};
