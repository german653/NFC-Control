import React from 'react';
import { WifiOff } from 'lucide-react';
import { useOnlineStatus } from '../hooks/useOnlineStatus';

interface HeaderProps {
  onOpenIosGuide?: () => void;
  onOpenDeployGuide?: () => void;
}

export const Header: React.FC<HeaderProps> = () => {
  const isOnline = useOnlineStatus();

  return (
    <header className="border-b border-zinc-200 bg-white sticky top-0 z-30 px-4 py-3">
      <div className="max-w-2xl mx-auto flex items-center justify-between gap-2">
        {/* Title & offline badge */}
        <div>
          <h1 className="text-base sm:text-lg font-bold text-zinc-900 tracking-tight">
            Compras & Ventas
          </h1>
          <div className="flex items-center gap-1.5 text-[11px] text-zinc-500">
            {!isOnline ? (
              <span className="flex items-center gap-1 text-zinc-900 font-semibold bg-zinc-100 px-1.5 py-0.5 rounded border border-zinc-300">
                <WifiOff className="w-3 h-3" /> Sin conexión (Offline)
              </span>
            ) : (
              <span>100% guardado en tu dispositivo</span>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
