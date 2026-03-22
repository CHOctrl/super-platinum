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
            <h2>ซิลูเอตคม วัสดุเด่น และลุคที่ใส่ได้จริง</h2>
            <p>
              คอลเลกชันล่าสุดของ Platinum รวมเสื้อผ้าและชิ้นเด่นที่ออกแบบมาให้
              โดดเด่นตั้งแต่ภาพแรก แต่ยังสวมใส่ได้ทุกวันในจังหวะของเมือง
            </p>
          </div>
        </div>
        <ProductGrid products={products} />
      </section>
      <section className="section" id="story">
        <div className="section-heading">
          <p className="eyebrow">Platinum World</p>
          <div>
            <h2>แรงบันดาลใจจาก Y2K ที่ถูกขัดให้เรียบและร่วมสมัย</h2>
            <p>
              โทน metallic พื้นผิวมันวาว และเส้นสายที่เฉียบคม ถูกถ่ายทอดออกมา
              ในรูปแบบที่โมเดิร์นขึ้น เพื่อให้แต่ละลุคดูชัดบนหน้าเว็บและชัดบนตัวคนใส่
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}