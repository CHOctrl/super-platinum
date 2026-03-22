export function Navbar() {
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
          <a className="site-badge" href="#featured">
            ตะกร้าสินค้า
          </a>
          <a className="button-primary button-primary--nav" href="#featured">
            ช้อปเลย
          </a>
        </div>
      </div>
    </header>
  );
}
