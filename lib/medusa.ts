export type StorefrontProduct = {
  id: string;
  title: string;
  handle: string;
  description: string;
  category: string;
  colorway: string;
  price: string;
  image?: {
    src: string;
    alt: string;
  };
};

const mockProducts: StorefrontProduct[] = [
  {
    id: "mock-1",
    title: "เสื้อ Platinum Tee",
    handle: "platinum-tee",
    description: "เสื้อทรงบ็อกซีพร้อมโลโก้ด้านหน้า ใส่ง่ายในทุกวันและจัดลุคได้ไม่ยาก",
    category: "เสื้อ",
    colorway: "ดำคลาสสิก",
    price: "THB 1,490",
    image: {
      src: "/lookbook/tee.png",
      alt: "เสื้อ Platinum Tee"
    }
  },
  {
    id: "mock-2",
    title: "กางเกง Signal Pant",
    handle: "signal-pant",
    description: "กางเกงทรงสบายที่เก็บเส้นขาให้คมขึ้น และดูพร้อมสำหรับภาพลุคหรือหน้าสินค้า",
    category: "กางเกง",
    colorway: "เทากราไฟต์",
    price: "THB 2,490",
    image: {
      src: "/lookbook/pant.png",
      alt: "กางเกง Signal Pant"
    }
  },
  {
    id: "mock-3",
    title: "ลุคแคมเปญหลัก",
    handle: "campaign-look",
    description: "ภาพลุคหลักจากชุดภาพที่คุณให้มา ใช้เป็นตัวตั้งอารมณ์ของคอลเลกชันนี้",
    category: "ไฮไลต์",
    colorway: "Platinum edit",
    price: "THB 3,290",
    image: {
      src: "/lookbook/capture.png",
      alt: "ลุคแคมเปญ Platinum"
    }
  }
];

type MedusaResponse = {
  products?: Array<{
    id: string;
    title: string;
    handle: string;
    description?: string | null;
    subtitle?: string | null;
    type?: {
      value?: string | null;
    } | null;
    thumbnail?: string | null;
    variants?: Array<{
      calculated_price?: {
        calculated_amount?: number | null;
        currency_code?: string | null;
      } | null;
    }> | null;
  }>;
};

function hasMedusaEnv() {
  return Boolean(
    process.env.MEDUSA_BACKEND_URL &&
      process.env.MEDUSA_PUBLISHABLE_API_KEY &&
      process.env.MEDUSA_REGION_ID
  );
}

function formatPrice(amount: number, currencyCode: string) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currencyCode.toUpperCase(),
    maximumFractionDigits: 0
  }).format(amount / 100);
}

function toStorefrontProduct(
  product: NonNullable<MedusaResponse["products"]>[number],
  index: number
): StorefrontProduct {
  const variant = product.variants?.[0];
  const calculatedAmount = variant?.calculated_price?.calculated_amount;
  const currencyCode = variant?.calculated_price?.currency_code ?? "usd";

  return {
    id: product.id,
    title: product.title,
    handle: product.handle,
    description:
      product.description ||
      product.subtitle ||
      "รายละเอียดสินค้าที่ดึงจากแคตตาล็อกและพร้อมนำไปแสดงบนหน้าร้าน",
    category: product.type?.value || "คอลเลกชัน",
    colorway: `Edition ${String(index + 1).padStart(2, "0")}`,
    price:
      typeof calculatedAmount === "number"
        ? formatPrice(calculatedAmount, currencyCode)
        : "สอบถามราคา",
    image: product.thumbnail
      ? {
          src: product.thumbnail,
          alt: product.title
        }
      : undefined
  };
}

export async function fetchFeaturedProducts(): Promise<StorefrontProduct[]> {
  if (!hasMedusaEnv()) {
    return mockProducts;
  }

  const url = new URL("/store/products", process.env.MEDUSA_BACKEND_URL);
  url.searchParams.set("limit", "6");
  url.searchParams.set("region_id", process.env.MEDUSA_REGION_ID as string);
  url.searchParams.set("fields", "+variants.calculated_price,+type");

  const response = await fetch(url, {
    headers: {
      "x-publishable-api-key": process.env.MEDUSA_PUBLISHABLE_API_KEY as string
    },
    next: { revalidate: 300 }
  });

  if (!response.ok) {
    return mockProducts;
  }

  const payload = (await response.json()) as MedusaResponse;
  const products = payload.products ?? [];

  if (products.length === 0) {
    return mockProducts;
  }

  return products.map(toStorefrontProduct);
}
