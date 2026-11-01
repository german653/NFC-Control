import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { registerSW } from 'virtual:pwa-register';

// Register service worker with auto-update
registerSW({
  immediate: true,
  onNeedRefresh() {
    console.log('Nueva versión de la PWA disponible.');
  },
  onOfflineReady() {
    console.log('Cybernetic Terminal listo para operar sin conexión.');
  },
});

createRoot(document.getElementById('root')!).render(<App />);
