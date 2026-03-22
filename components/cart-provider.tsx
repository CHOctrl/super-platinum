"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode
} from "react";

export type CartItem = {
  id: string;
  title: string;
  price: string;
  image?: string;
  quantity: number;
};

type CartContextValue = {
  items: CartItem[];
  itemCount: number;
  isOpen: boolean;
  addItem: (item: Omit<CartItem, "quantity">) => void;
  removeItem: (id: string) => void;
  toggleCart: () => void;
  closeCart: () => void;
};

const STORAGE_KEY = "platinum-cart";
const CartContext = createContext<CartContextValue | null>(null);

function CartDrawer({
  items,
  isOpen,
  onClose,
  onRemove
}: {
  items: CartItem[];
  isOpen: boolean;
  onClose: () => void;
  onRemove: (id: string) => void;
}) {
  return (
    <>
      <div
        className={`cart-overlay${isOpen ? " is-open" : ""}`}
        onClick={onClose}
        aria-hidden={!isOpen}
      />
      <aside className={`cart-drawer${isOpen ? " is-open" : ""}`} aria-label="Shopping cart">
        <div className="cart-drawer__header">
          <div>
            <p className="eyebrow">Cart</p>
            <h2>ตะกร้าสินค้า</h2>
          </div>
          <button className="cart-close" type="button" onClick={onClose}>
            ปิด
          </button>
        </div>
        <div className="cart-drawer__body">
          {items.length === 0 ? (
            <p className="cart-empty">ยังไม่มีสินค้าในตะกร้า</p>
          ) : (
            items.map((item) => (
              <div className="cart-item" key={item.id}>
                <div>
                  <p className="cart-item__title">{item.title}</p>
                  <p className="cart-item__meta">
                    {item.price} x {item.quantity}
                  </p>
                </div>
                <button className="cart-remove" type="button" onClick={() => onRemove(item.id)}>
                  ลบ
                </button>
              </div>
            ))
          )}
        </div>
      </aside>
    </>
  );
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return;
    }

    try {
      setItems(JSON.parse(raw) as CartItem[]);
    } catch {
      window.localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const value = useMemo<CartContextValue>(() => {
    const itemCount = items.reduce((total, item) => total + item.quantity, 0);

    return {
      items,
      itemCount,
      isOpen,
      addItem: (item) => {
        setItems((current) => {
          const existing = current.find((entry) => entry.id === item.id);
          if (existing) {
            return current.map((entry) =>
              entry.id === item.id
                ? { ...entry, quantity: entry.quantity + 1 }
                : entry
            );
          }

          return [...current, { ...item, quantity: 1 }];
        });
        setIsOpen(true);
      },
      removeItem: (id) => {
        setItems((current) => current.filter((item) => item.id !== id));
      },
      toggleCart: () => setIsOpen((open) => !open),
      closeCart: () => setIsOpen(false)
    };
  }, [items, isOpen]);

  return (
    <CartContext.Provider value={value}>
      {children}
      <CartDrawer
        items={items}
        isOpen={isOpen}
        onClose={value.closeCart}
        onRemove={value.removeItem}
      />
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }

  return context;
}