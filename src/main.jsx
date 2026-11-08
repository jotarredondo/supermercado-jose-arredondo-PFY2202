import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router';
import App from './App.jsx';
import { InventoryProvider } from './context/InventoryContext.jsx';
import './styles/index.css';

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <HashRouter>
            <InventoryProvider>
                <App />
            </InventoryProvider>
        </HashRouter>
    </StrictMode>,
);
