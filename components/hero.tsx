import Image from "next/image";

export function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero-card">
        <div className="hero-copy">
          <p className="eyebrow">Bangkok / New Season / Platinum</p>
          <h1>Platinum Drop 03</h1>
          <p>
            นิยามใหม่ของลุค Y2K ผ่านงานตัดเย็บที่คมขึ้น สัดส่วนที่ชัดขึ้น
            และภาพรวมที่ออกแบบมาเพื่อให้แต่ละชิ้นโดดเด่นทั้งบนหน้าเว็บและในชีวิตจริง
          </p>
          <div className="hero-cta">
            <a className="button-primary" href="#featured">
              เลือกซื้อคอลเลกชัน
            </a>
            <a className="button-secondary" href="#story">
              สำรวจแรงบันดาลใจ
            </a>
          </div>
          <div className="hero-meta">
            <span>New season essentials</span>
            <span>Statement silhouettes</span>
            <span>Bangkok ready</span>
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
            <span className="orbital-label">Drop 03 / Featured Look</span>
          </div>
          <div className="stat-row">
            <span>Platinum signature</span>
            <span>03 featured styles</span>
            <span>Designed for now</span>
          </div>
        </div>
      </div>
    </section>
  );
}