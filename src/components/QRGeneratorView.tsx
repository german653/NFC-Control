import React, { useState, useRef, useEffect } from 'react';
import QRCode from 'qrcode';
import { QrCode, Download, Share2, Copy, Check, Sparkles, History, Trash2, ExternalLink } from 'lucide-react';

interface SavedQR {
  id: string;
  title: string;
  content: string;
  date: string;
}

const STORAGE_KEY_SAVED_QRS = 'mis_qrs_guardados_v1';

export const QRGeneratorView: React.FC = () => {
  const [urlInput, setUrlInput] = useState('');
  const [filenameInput, setFilenameInput] = useState('');
  const [qrGenerated, setQrGenerated] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [savedQRs, setSavedQRs] = useState<SavedQR[]>([]);

  const previewCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const hdCanvasRef = useRef<HTMLCanvasElement | null>(null);

  // Load saved QRs
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_SAVED_QRS);
      if (stored) {
        setSavedQRs(JSON.parse(stored));
      }
    } catch {
      // ignore
    }
  }, []);

  const saveToHistory = (content: string, name: string) => {
    try {
      const newEntry: SavedQR = {
        id: `qr-${Date.now()}`,
        title: name.trim() || content.slice(0, 30),
        content: content.trim(),
        date: new Date().toLocaleDateString('es-ES', { day: 'numeric', month: 'short' }),
      };
      const updated = [newEntry, ...savedQRs.filter(q => q.content !== content.trim())].slice(0, 8);
      setSavedQRs(updated);
      localStorage.setItem(STORAGE_KEY_SAVED_QRS, JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  const deleteFromHistory = (id: string) => {
    const updated = savedQRs.filter(q => q.id !== id);
    setSavedQRs(updated);
    localStorage.setItem(STORAGE_KEY_SAVED_QRS, JSON.stringify(updated));
  };

  const generarQR = async (customText?: string, customName?: string) => {
    const textToProcess = (customText ?? urlInput).trim();
    if (!textToProcess) {
      alert('Por favor ingresá un enlace o texto válido.');
      return;
    }

    if (customText) {
      setUrlInput(customText);
    }
    if (customName !== undefined) {
      setFilenameInput(customName);
    }

    try {
      // 1. Generate on preview canvas (256x256)
      if (previewCanvasRef.current) {
        await QRCode.toCanvas(previewCanvasRef.current, textToProcess, {
          width: 256,
          margin: 2,
          errorCorrectionLevel: 'H',
          color: {
            dark: '#000000',
            light: '#FFFFFF',
          },
        });
      }

      // 2. Generate on HD canvas (1000x1000 px) for high definition printing
      if (hdCanvasRef.current) {
        await QRCode.toCanvas(hdCanvasRef.current, textToProcess, {
          width: 1000,
          margin: 3,
          errorCorrectionLevel: 'H',
          color: {
            dark: '#000000',
            light: '#FFFFFF',
          },
        });
      }

      setQrGenerated(true);
      saveToHistory(textToProcess, customName ?? filenameInput);
    } catch (err) {
      console.error('Error generating QR', err);
      alert('No se pudo generar el código QR. Verifica el formato del texto.');
    }
  };

  const descargarPNG = () => {
    const canvas = hdCanvasRef.current || previewCanvasRef.current;
    if (!canvas) return;

    let filename = filenameInput.trim();
    if (!filename) {
      filename = 'codigo_qr_hd';
    }
    if (!filename.toLowerCase().endsWith('.png')) {
      filename += '.png';
    }

    const enlace = document.createElement('a');
    enlace.download = filename;
    enlace.href = canvas.toDataURL('image/png', 1.0);
    document.body.appendChild(enlace);
    enlace.click();
    document.body.removeChild(enlace);
  };

  const compartirOguardar = async () => {
    const canvas = hdCanvasRef.current || previewCanvasRef.current;
    if (!canvas) return;

    try {
      canvas.toBlob(async (blob) => {
        if (!blob) {
          descargarPNG();
          return;
        }

        let filename = filenameInput.trim() || 'codigo_qr';
        if (!filename.endsWith('.png')) filename += '.png';
        const file = new File([blob], filename, { type: 'image/png' });

        if (navigator.canShare && navigator.canShare({ files: [file] })) {
          await navigator.share({
            title: filenameInput || 'Código QR',
            text: urlInput,
            files: [file],
          });
        } else {
          descargarPNG();
        }
      }, 'image/png', 1.0);
    } catch {
      descargarPNG();
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(urlInput);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  // Quick preset loader
  const loadPreset = (preset: 'alias' | 'whatsapp' | 'web') => {
    if (preset === 'whatsapp') {
      setUrlInput('https://wa.me/5491100000000?text=Hola,%20quisiera%20hacer%20un%20pedido');
      setFilenameInput('qr_whatsapp_pedidos');
    } else if (preset === 'alias') {
      setUrlInput('ALIAS: TU.ALIAS.AQUI (Banco o Billetera)');
      setFilenameInput('qr_pago_transferencia');
    } else if (preset === 'web') {
      setUrlInput('https://');
      setFilenameInput('qr_mi_catalogo');
    }
  };

  return (
    <div className="space-y-4">
      {/* Container Box */}
      <div className="bg-white rounded-2xl border border-zinc-200 p-4 sm:p-6 shadow-xs space-y-4">
        {/* Header */}
        <div className="text-center space-y-1">
          <div className="w-10 h-10 rounded-2xl bg-black text-white flex items-center justify-center mx-auto mb-2">
            <QrCode className="w-5 h-5" />
          </div>
          <h2 className="text-lg sm:text-xl font-bold text-zinc-900 tracking-tight">
            Generador Dinámico de QR
          </h2>
          <p className="text-xs text-zinc-500 max-w-sm mx-auto">
            Ingresá cualquier enlace, alias o texto para generar y descargar su código QR en alta calidad HD (1000x1000 px).
          </p>
        </div>

        {/* Quick Presets */}
        <div className="flex items-center justify-center gap-1.5 flex-wrap pt-1">
          <span className="text-[11px] font-semibold text-zinc-400 mr-1">Atajos:</span>
          <button
            type="button"
            onClick={() => loadPreset('whatsapp')}
            className="text-[11px] font-medium px-2.5 py-1 rounded-lg border border-zinc-200 hover:bg-zinc-50 text-zinc-700 transition"
          >
            💬 WhatsApp
          </button>
          <button
            type="button"
            onClick={() => loadPreset('alias')}
            className="text-[11px] font-medium px-2.5 py-1 rounded-lg border border-zinc-200 hover:bg-zinc-50 text-zinc-700 transition"
          >
            💳 Alias / Pago
          </button>
          <button
            type="button"
            onClick={() => loadPreset('web')}
            className="text-[11px] font-medium px-2.5 py-1 rounded-lg border border-zinc-200 hover:bg-zinc-50 text-zinc-700 transition"
          >
            🌐 Enlace Web
          </button>
        </div>

        {/* Form Inputs */}
        <div className="space-y-3 text-xs">
          <div>
            <label htmlFor="url-input" className="block font-semibold text-zinc-800 mb-1">
              Ingresá la URL, Enlace o Texto:
            </label>
            <input
              type="text"
              id="url-input"
              value={urlInput}
              onChange={e => setUrlInput(e.target.value)}
              placeholder="https://ejemplo.com/tu-link o ALIAS: TU.ALIAS"
              className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-300 bg-white text-zinc-900 text-sm focus:outline-none focus:ring-2 focus:ring-black"
              autoComplete="off"
            />
          </div>

          <div>
            <label htmlFor="filename-input" className="block font-semibold text-zinc-800 mb-1">
              Nombre para el archivo (opcional):
            </label>
            <input
              type="text"
              id="filename-input"
              value={filenameInput}
              onChange={e => setFilenameInput(e.target.value)}
              placeholder="mi_codigo_qr"
              className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-300 bg-white text-zinc-900 text-sm focus:outline-none focus:ring-2 focus:ring-black"
              autoComplete="off"
            />
          </div>

          {/* Primary Action Button */}
          <button
            type="button"
            onClick={() => generarQR()}
            className="w-full py-3 rounded-xl bg-black hover:bg-zinc-800 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-sm transition active:scale-[0.98] cursor-pointer"
          >
            <Sparkles className="w-4 h-4" />
            <span>⚡ Generar Código QR</span>
          </button>
        </div>

        {/* Hidden HD Canvas for 1000x1000 render */}
        <canvas ref={hdCanvasRef} style={{ display: 'none' }} width={1000} height={1000} />

        {/* Output Section */}
        {qrGenerated && (
          <div className="pt-4 border-t border-zinc-100 flex flex-col items-center space-y-4 animate-in fade-in duration-200">
            {/* QR Box */}
            <div className="p-3 bg-white rounded-2xl border-2 border-zinc-900 shadow-md flex items-center justify-center">
              <canvas
                ref={previewCanvasRef}
                className="w-48 h-48 sm:w-56 sm:h-56 block rounded-lg"
              />
            </div>

            <div className="text-center max-w-xs">
              <p className="text-xs font-semibold text-zinc-900 truncate">
                {filenameInput || 'codigo_qr_hd'}
              </p>
              <p className="text-[11px] text-zinc-500 font-mono truncate">
                {urlInput}
              </p>
            </div>

            {/* Action buttons */}
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-2">
              <button
                type="button"
                onClick={descargarPNG}
                className="w-full py-2.5 px-4 rounded-xl bg-black hover:bg-zinc-800 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xs transition active:scale-[0.98] cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>📥 Descargar PNG HD</span>
              </button>

              <button
                type="button"
                onClick={compartirOguardar}
                className="w-full py-2.5 px-4 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-zinc-900 border border-zinc-300 font-bold text-xs flex items-center justify-center gap-2 transition active:scale-[0.98] cursor-pointer"
              >
                <Share2 className="w-4 h-4" />
                <span>📤 Compartir / Guardar</span>
              </button>
            </div>

            <button
              type="button"
              onClick={copyToClipboard}
              className="text-[11px] text-zinc-500 hover:text-black flex items-center gap-1 transition"
            >
              {copiedLink ? <Check className="w-3.5 h-3.5 text-zinc-900" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedLink ? 'Enlace copiado' : 'Copiar enlace en texto'}</span>
            </button>
          </div>
        )}
      </div>

      {/* Recent QR History */}
      {savedQRs.length > 0 && (
        <div className="bg-white rounded-2xl border border-zinc-200 p-4 shadow-xs space-y-2.5">
          <div className="flex items-center justify-between pb-1.5 border-b border-zinc-100">
            <span className="text-xs font-bold text-zinc-900 flex items-center gap-1.5">
              <History className="w-3.5 h-3.5 text-zinc-600" />
              QRs Recientes Guardados
            </span>
            <span className="text-[10px] text-zinc-400">
              {savedQRs.length} guardados
            </span>
          </div>

          <div className="divide-y divide-zinc-100">
            {savedQRs.map(item => (
              <div
                key={item.id}
                className="py-2.5 flex items-center justify-between gap-2 hover:bg-zinc-50 px-1.5 rounded-lg transition"
              >
                <div
                  onClick={() => generarQR(item.content, item.title)}
                  className="min-w-0 flex-1 cursor-pointer"
                >
                  <p className="text-xs font-semibold text-zinc-900 truncate">
                    {item.title}
                  </p>
                  <p className="text-[11px] text-zinc-500 truncate font-mono">
                    {item.content}
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => generarQR(item.content, item.title)}
                    className="text-[11px] bg-zinc-100 hover:bg-black hover:text-white text-zinc-800 px-2 py-1 rounded-md font-semibold transition"
                  >
                    Ver QR
                  </button>
                  <button
                    onClick={() => deleteFromHistory(item.id)}
                    className="p-1 text-zinc-300 hover:text-zinc-700 transition"
                    title="Eliminar del historial"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
