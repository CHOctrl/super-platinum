"use client";

import { useCart } from "@/components/cart-provider";

export function Navbar() {
  const { itemCount, toggleCart } = useCart();

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <a className="brand" href="#top">
          PLATINUM
        </a>
        <nav className="site-nav" aria-label="Primary">
          <a href="#new">สินค้าใหม่</a>
          <a href="#featured">เลือกซื้อ</a>
          <a href="#story">เรื่องราว</a>
        </nav>
        <div className="site-actions">
          <button className="site-badge site-badge--button" type="button" onClick={toggleCart}>
            ตะกร้า {itemCount}
          </button>
          <button className="button-primary button-primary--nav" type="button" onClick={toggleCart}>
            ดูตะกร้า
          </button>
        </div>
      </div>
    </header>
  );
}