"use client";

import Image from "next/image";
import { useCart } from "@/components/cart-provider";
import type { StorefrontProduct } from "@/lib/medusa";

type ProductGridProps = {
  products: StorefrontProduct[];
};

export function ProductGrid({ products }: ProductGridProps) {
  const { addItem } = useCart();

  return (
    <div className="product-grid" id="featured">
      {products.map((product) => (
        <article className="product-card" key={product.id}>
          <div className="product-visual">
            {product.image ? (
              <Image
                src={product.image.src}
                alt={product.image.alt}
                fill
                sizes="(max-width: 1100px) 100vw, 33vw"
              />
            ) : (
              <div className="product-fallback" />
            )}
          </div>
          <div className="product-copy">
            <div className="product-topline">
              <span className="product-tag">{product.category}</span>
              <span className="product-price">{product.price}</span>
            </div>
            <div className="product-bottomline">
              <h3>{product.title}</h3>
              <span className="product-tag">{product.colorway}</span>
            </div>
            <p>{product.description}</p>
            <div className="product-actions">
              <button
                className="button-secondary button-secondary--small"
                type="button"
                onClick={() =>
                  addItem({
                    id: product.id,
                    title: product.title,
                    price: product.price,
                    image: product.image?.src
                  })
                }
              >
                เพิ่มลงตะกร้า
              </button>
              <a className="product-link" href="#story">
                ดูรายละเอียด
              </a>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}