// src/app/items/page.jsx

import Item from "@/components/Item";

export default function ItemsPage() {
  return (
    <div className="flex flex-wrap items-center justify-center min-h-screen bg-[#cffafe] gap-3 py-2">
      <Item imagePath="/images/inclusive-pack.jpg" title="חבילת מתנות" />
      <Item imagePath="/images/small-pack.jpg" title="חבילת מתנות" />
      <Item imagePath="/images/inclusive-pack.jpg" title="חבילת מתנות" />
      <Item imagePath="/images/small-pack.jpg" title="חבילת מתנות" />
      <Item imagePath="/images/inclusive-pack.jpg" title="חבילת מתנות" />
      <Item imagePath="/images/small-pack.jpg" title="חבילת מתנות" />
      <Item imagePath="/images/inclusive-pack.jpg" title="חבילת מתנות" />
    </div>
  );
}
