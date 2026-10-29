// src/stores/cartStore.ts
import { atom } from 'nanostores';

export interface CartItem {
  id: string;
  title: string;
  price: number;
  image: string;
  quantity: number;
}

const STORAGE_KEY = 'wintercart_cart_items';

function getInitialCart(): CartItem[] {
  if (typeof window === 'undefined') {
    return [];
  }
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error('Failed to load cart from localStorage', e);
    return [];
  }
}

// The main cart store — initialized from localStorage if in browser
export const $cart = atom<CartItem[]>(getInitialCart());

// Initialize / hydrate cart store from localStorage
export function initCartStore() {
  if (typeof window !== 'undefined') {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          $cart.set(parsed);
        }
      }
    } catch (e) {
      console.error('Failed to sync cart store', e);
    }
  }
}

// Automatically save changes to localStorage in the browser
if (typeof window !== 'undefined') {
  $cart.subscribe((items) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.error('Failed to save cart to localStorage', e);
    }
  });

  // Listen to cross-tab updates
  window.addEventListener('storage', (event) => {
    if (event.key === STORAGE_KEY) {
      try {
        const newItems = event.newValue ? JSON.parse(event.newValue) : [];
        $cart.set(newItems);
      } catch (e) {
        console.error('Failed to parse storage update', e);
      }
    }
  });
}

// Add a product to cart (or increase quantity if already exists)
export function addToCart(product: Omit<CartItem, 'quantity'>, quantityToAdd: number = 1) {
  let current = $cart.get();
  
  // If in-memory is empty, double check localStorage
  if (current.length === 0 && typeof window !== 'undefined') {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) current = JSON.parse(raw);
    } catch {}
  }

  const existing = current.find((item) => item.id === product.id);
  let updated: CartItem[];

  if (existing) {
    updated = current.map((item) =>
      item.id === product.id
        ? { ...item, quantity: item.quantity + quantityToAdd }
        : item
    );
  } else {
    updated = [...current, { ...product, quantity: quantityToAdd }];
  }

  $cart.set(updated);
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch {}
  }
}

// Remove a product from the cart entirely
export function removeFromCart(productId: string) {
  const updated = $cart.get().filter((item) => item.id !== productId);
  $cart.set(updated);
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch {}
  }
}

// Update quantity of a specific cart item
export function updateQuantity(productId: string, quantity: number) {
  if (quantity <= 0) {
    removeFromCart(productId);
    return;
  }
  const updated = $cart.get().map((item) =>
    item.id === productId ? { ...item, quantity } : item
  );
  $cart.set(updated);
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch {}
  }
}

// Clear the entire cart
export function clearCart() {
  $cart.set([]);
  if (typeof window !== 'undefined') {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {}
  }
}
