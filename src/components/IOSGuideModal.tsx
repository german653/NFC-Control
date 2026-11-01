import React from 'react';
import { Share, PlusSquare, Smartphone, X, Check } from 'lucide-react';

interface IOSGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const IOSGuideModal: React.FC<IOSGuideModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-100">
      <div className="relative w-full max-w-sm rounded-2xl bg-white border border-zinc-300 p-5 shadow-2xl text-zinc-900">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-zinc-400 hover:text-zinc-800 hover:bg-zinc-100 transition"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2.5 mb-4">
          <div className="w-9 h-9 rounded-xl bg-black text-white flex items-center justify-center">
            <Smartphone className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-base text-zinc-900">Instalar en tu iPhone</h3>
            <p className="text-xs text-zinc-500">Funciona como app y sin internet</p>
          </div>
        </div>

        <div className="space-y-3 text-xs mb-5">
          <div className="flex items-start gap-3 p-3 rounded-xl bg-zinc-50 border border-zinc-200">
            <span className="w-6 h-6 rounded-full bg-zinc-900 text-white font-bold flex items-center justify-center shrink-0 text-xs">
              1
            </span>
            <div>
              <p className="font-semibold text-zinc-900 flex items-center gap-1">
                Toca el botón Compartir <Share className="w-3.5 h-3.5 inline text-black" />
              </p>
              <p className="text-zinc-500 mt-0.5">
                En la barra inferior del navegador <strong>Safari</strong> en tu iPhone, pulsa el cuadrito con la flecha hacia arriba.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 rounded-xl bg-zinc-50 border border-zinc-200">
            <span className="w-6 h-6 rounded-full bg-zinc-900 text-white font-bold flex items-center justify-center shrink-0 text-xs">
              2
            </span>
            <div>
              <p className="font-semibold text-zinc-900 flex items-center gap-1">
                Toca "Agregar a pantalla de inicio" <PlusSquare className="w-3.5 h-3.5 inline text-black" />
              </p>
              <p className="text-zinc-500 mt-0.5">
                Baja un poco en el menú de opciones y selecciona <strong>"Agregar a pantalla de inicio"</strong>.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 rounded-xl bg-zinc-50 border border-zinc-200">
            <span className="w-6 h-6 rounded-full bg-zinc-900 text-white font-bold flex items-center justify-center shrink-0 text-xs">
              3
            </span>
            <div>
              <p className="font-semibold text-zinc-900">Pulsa "Agregar"</p>
              <p className="text-zinc-500 mt-0.5">
                En la esquina superior derecha toca <strong>"Agregar"</strong> para confirmar.
              </p>
            </div>
          </div>
        </div>

        <div className="p-3 rounded-xl bg-zinc-100 text-xs space-y-1 mb-4 text-zinc-700">
          <p className="font-semibold text-zinc-900 flex items-center gap-1">
            <Check className="w-4 h-4 text-zinc-900" />
            ¿Por qué instalarla?
          </p>
          <p className="text-zinc-600">
            Se abrirá a pantalla completa sin la barra de Safari y podrás usarla <strong>incluso en Modo Avión o sin señal</strong>.
          </p>
        </div>

        <button
          onClick={onClose}
          className="w-full py-2.5 rounded-xl bg-black hover:bg-zinc-800 text-white font-bold text-xs uppercase tracking-wide transition"
        >
          Entendido
        </button>
      </div>
    </div>
  );
};
