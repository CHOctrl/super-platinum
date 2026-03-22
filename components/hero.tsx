import Image from "next/image";

export function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero-card">
        <div className="hero-copy">
          <p className="eyebrow">พร้อมขายในกรุงเทพ / platinum utility / 2026</p>
          <h1>คมแบบ Y2K แต่ซื้อได้ง่ายกว่าเดิม</h1>
          <p>
            งานดีไซน์นี้ยังคงอารมณ์ futurist แบบ platinum เอาไว้
            แต่จัดให้เหมือนร้านจริงมากขึ้น: มี navbar ชัดเจน
            มีปุ่มซื้อที่เข้าใจง่าย และใช้ภาพสินค้าที่ดูเป็นของแบรนด์เอง
          </p>
          <div className="hero-cta">
            <a className="button-primary" href="#featured">
              ช้อปคอลเลกชันนี้
            </a>
            <a className="button-secondary" href="#story">
              ดูคอนเซปต์
            </a>
          </div>
          <div className="hero-meta">
            <span>รองรับงานอีคอมเมิร์ซจริง</span>
            <span>พร้อมต่อยอดปุ่มใส่ตะกร้า</span>
            <span>พร้อมเชื่อม Shopify</span>
          </div>
        </div>
        <div className="hero-side">
          <div className="hero-shot">
            <Image
              src="/lookbook/capture.png"
              alt="ภาพลุคหลักของ Platinum"
              fill
              priority
              sizes="(max-width: 1100px) 100vw, 40vw"
            />
            <span className="orbital-label">ภาพจากลูกค้า / hero lockup</span>
          </div>
          <div className="stat-row">
            <span>01 ภาพหลักของหน้าแรก</span>
            <span>03 การ์ดสินค้า</span>
            <span>ทิศทางสำหรับตลาดไทย</span>
          </div>
        </div>
      </div>
    </section>
  );
}
