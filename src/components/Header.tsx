import React from 'react';
import { Smartphone, Cloud, Download, WifiOff } from 'lucide-react';
import { useOnlineStatus } from '../hooks/useOnlineStatus';
import { usePWAInstall } from '../hooks/usePWAInstall';

interface HeaderProps {
  onOpenIosGuide: () => void;
  onOpenDeployGuide: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenIosGuide, onOpenDeployGuide }) => {
  const isOnline = useOnlineStatus();
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();

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

        {/* Action buttons */}
        <div className="flex items-center gap-1.5">
          {!isInstalled && (
            <>
              {isInstallable ? (
                <button
                  onClick={install}
                  className="flex items-center gap-1.5 bg-black hover:bg-zinc-800 text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Instalar</span>
                </button>
              ) : isIOS ? (
                <button
                  onClick={onOpenIosGuide}
                  className="flex items-center gap-1.5 bg-zinc-900 hover:bg-black text-white text-xs font-medium px-2.5 py-1.5 rounded-lg transition"
                >
                  <Smartphone className="w-3.5 h-3.5" />
                  <span>Instalar en iPhone</span>
                </button>
              ) : (
                <button
                  onClick={onOpenIosGuide}
                  className="flex items-center gap-1.5 border border-zinc-300 hover:bg-zinc-100 text-zinc-800 text-xs font-medium px-2.5 py-1.5 rounded-lg transition"
                >
                  <Smartphone className="w-3.5 h-3.5" />
                  <span>Descargar App</span>
                </button>
              )}
            </>
          )}

          <button
            onClick={onOpenDeployGuide}
            className="flex items-center gap-1 text-xs border border-zinc-300 hover:bg-zinc-100 text-zinc-700 px-2.5 py-1.5 rounded-lg transition"
            title="Cómo subirla gratis"
          >
            <Cloud className="w-3.5 h-3.5 text-zinc-600" />
            <span className="hidden sm:inline">Cómo subirla</span>
          </button>
        </div>
      </div>
    </header>
  );
};
