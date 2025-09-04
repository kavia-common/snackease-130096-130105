import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { snacks } from '../data/snacks';

const CartCtx = createContext(null);

// PUBLIC_INTERFACE
export function useCart() {
  /** Access cart state and actions. */
  return useContext(CartCtx);
}

// Helpers
const LS_CART_KEY = 'snack_cart';
const LS_ORDERS_KEY = 'snack_orders';

function loadLS(key, fallback) {
  const raw = localStorage.getItem(key);
  if (!raw) return fallback;
  try { return JSON.parse(raw); } catch { return fallback; }
}
function saveLS(key, val) {
  localStorage.setItem(key, JSON.stringify(val));
}

// PUBLIC_INTERFACE
export function CartProvider({ children }) {
  /** Provide cart and order state. */
  const [items, setItems] = useState(() => loadLS(LS_CART_KEY, []));
  const [orders, setOrders] = useState(() => loadLS(LS_ORDERS_KEY, []));

  useEffect(() => saveLS(LS_CART_KEY, items), [items]);
  useEffect(() => saveLS(LS_ORDERS_KEY, orders), [orders]);

  const total = useMemo(() => items.reduce((sum, it) => {
    const s = snacks.find(sn => sn.id === it.id);
    return sum + (s ? s.price * it.qty : 0);
  }, 0), [items]);

  const value = useMemo(() => ({
    items,
    total,
    // PUBLIC_INTERFACE
    addItem: (id, qty = 1) => {
      setItems(prev => {
        const idx = prev.findIndex(p => p.id === id);
        if (idx >= 0) {
          const next = [...prev];
          next[idx] = { ...next[idx], qty: next[idx].qty + qty };
          return next;
        }
        return [...prev, { id, qty }];
      });
    },
    // PUBLIC_INTERFACE
    setQty: (id, qty) => {
      setItems(prev => prev.map(p => p.id === id ? { ...p, qty: Math.max(0, qty) } : p).filter(p => p.qty > 0));
    },
    // PUBLIC_INTERFACE
    removeItem: (id) => setItems(prev => prev.filter(p => p.id !== id)),
    // PUBLIC_INTERFACE
    clearCart: () => setItems([]),
    orders,
    // PUBLIC_INTERFACE
    placeOrder: () => {
      if (items.length === 0) return null;
      const order = {
        id: 'o_' + Date.now(),
        createdAt: new Date().toISOString(),
        items,
        total
      };
      setOrders(prev => [order, ...prev]);
      setItems([]);
      return order;
    }
  }), [items, total, orders]);

  return <CartCtx.Provider value={value}>{children}</CartCtx.Provider>;
}
