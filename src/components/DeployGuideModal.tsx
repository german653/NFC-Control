import React, { useState } from 'react';
import { Cloud, Copy, Check, X, ExternalLink } from 'lucide-react';

interface DeployGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DeployGuideModal: React.FC<DeployGuideModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const copyCommand = () => {
    navigator.clipboard.writeText('npm run build && npx vercel --prod');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-100 overflow-y-auto">
      <div className="relative w-full max-w-lg rounded-2xl bg-white border border-zinc-300 p-5 sm:p-6 shadow-2xl text-zinc-900">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-zinc-400 hover:text-zinc-800 hover:bg-zinc-100 transition"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2.5 mb-4">
          <div className="w-9 h-9 rounded-xl bg-black text-white flex items-center justify-center">
            <Cloud className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-base text-zinc-900">La mejor plataforma para subirla</h3>
            <p className="text-xs text-zinc-500">100% Gratis y con HTTPS para tu iPhone</p>
          </div>
        </div>

        <div className="space-y-4 text-xs">
          {/* Recommendation */}
          <div className="p-3.5 rounded-xl border border-zinc-300 bg-zinc-50 space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="font-bold text-sm text-zinc-900">1. Plataforma recomendada: Vercel</span>
              <span className="text-[10px] font-bold bg-black text-white px-2 py-0.5 rounded">
                GRATIS
              </span>
            </div>
            <p className="text-zinc-600 leading-relaxed">
              <strong>Vercel</strong> es la plataforma más sencilla y confiable para subir esta web. Te da un enlace seguro con <strong>HTTPS</strong> (obligatorio para que el iPhone permita instalar la app y funcione sin conexión).
            </p>
          </div>

          {/* Steps */}
          <div className="space-y-2.5">
            <h4 className="font-bold text-zinc-900 text-xs">Pasos para subirla:</h4>
            
            <div className="p-2.5 rounded-lg border border-zinc-200 bg-white space-y-1">
              <p className="font-semibold text-zinc-900">Paso 1: Sube el código a GitHub</p>
              <p className="text-zinc-500">Crea un repositorio en github.com y sube los archivos de este proyecto.</p>
            </div>

            <div className="p-2.5 rounded-lg border border-zinc-200 bg-white space-y-1">
              <p className="font-semibold text-zinc-900">Paso 2: Conéctalo en Vercel</p>
              <p className="text-zinc-500">
                Entra en <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="text-black underline font-semibold inline-flex items-center gap-0.5">vercel.com <ExternalLink className="w-3 h-3" /></a>, inicia sesión con GitHub y selecciona tu repositorio.
              </p>
            </div>

            <div className="p-2.5 rounded-lg border border-zinc-200 bg-white space-y-1">
              <p className="font-semibold text-zinc-900">Paso 3: Toca "Deploy"</p>
              <p className="text-zinc-500">
                En 30 segundos te dará tu enlace público listo para abrir en Safari en tu iPhone (ej. <code className="bg-zinc-100 px-1 py-0.5 rounded font-mono">https://mis-ventas.vercel.app</code>).
              </p>
            </div>
          </div>

          {/* CLI shortcut */}
          <div className="p-3 rounded-xl bg-zinc-900 text-white space-y-2">
            <span className="text-[11px] font-mono text-zinc-400 block">
              O súbela directo por consola de comandos:
            </span>
            <div className="flex items-center justify-between font-mono text-xs">
              <span className="text-zinc-200">npm run build && npx vercel --prod</span>
              <button
                onClick={copyCommand}
                className="p-1 rounded bg-zinc-800 hover:bg-zinc-700 text-white transition cursor-pointer"
                title="Copiar comando"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full mt-5 py-2.5 rounded-xl bg-black hover:bg-zinc-800 text-white font-bold text-xs uppercase tracking-wide transition"
        >
          Cerrar
        </button>
      </div>
    </div>
  );
};
