import { createContext, useContext, useReducer } from 'react';
import inventoryReducer, { initialInventoryState } from './inventoryReducer.js';

const InventoryContext = createContext(null);

export function InventoryProvider({ children }) {
  const [state, dispatch] = useReducer(inventoryReducer, initialInventoryState);

  return (
    <InventoryContext.Provider value={{ products: state.products, dispatch }}>
      {children}
    </InventoryContext.Provider>
  );
}

export function useInventory() {
  const context = useContext(InventoryContext);
  if (!context) {
    throw new Error('useInventory debe utilizarse dentro de InventoryProvider.');
  }
  return context;
}
