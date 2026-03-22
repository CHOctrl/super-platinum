import { Hero } from "@/components/hero";
import { Navbar } from "@/components/navbar";
import { ProductGrid } from "@/components/product-grid";
import { fetchFeaturedProducts } from "@/lib/medusa";

export default async function HomePage() {
  const products = await fetchFeaturedProducts();

  return (
    <main className="page-shell">
      <Navbar />
      <Hero />
      <section className="section" id="new">
        <div className="section-heading">
          <p className="eyebrow">ดรอป 03 / วางขายแล้ว</p>
          <div>
            <h2>ลุคแฟชั่นชัด แต่ยังพาคนซื้อได้ไว</h2>
            <p>
              เป้าหมายตอนนี้คือทำให้ร้านชัดเจนขึ้น: มีเมนูนำทางที่ดีขึ้น
              ใช้ภาพสินค้าจริงที่คุณให้มา และวางจุดซื้อให้พร้อมต่อยอดไปยัง
              ตะกร้าและระบบชำระเงินจริงในขั้นถัดไป
            </p>
          </div>
        </div>
        <ProductGrid products={products} />
      </section>
      <section className="section" id="story">
        <div className="section-heading">
          <p className="eyebrow">ทิศทางแบรนด์</p>
          <div>
            <h2>โครงสร้างคมขึ้น และพร้อมใช้งานขายจริงมากขึ้น</h2>
            <p>
              ภาพรวมยังคงคาแรกเตอร์ Y2K แบบ platinum อยู่ แต่ตอนนี้การจัดวาง
              ทำงานเหมือนร้านค้าที่พร้อมขายจริงมากขึ้น
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
