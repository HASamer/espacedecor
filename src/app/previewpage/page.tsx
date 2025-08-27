"use client";
import { ITEMS } from "@/constants";
import { useParams, useRouter } from "next/navigation";

export default function PreviewPage() {
  const params = useParams();
  const router = useRouter();
  const id = Number(params.id);
  const item = ITEMS.find((i) => i.id === id);

  if (!item) return <div>Item not found.</div>;

  return (
    <div>
      <button onClick={() => router.back()}>Back</button>
      <h1>{item.name}</h1>
      <img src={item.image} alt={item.name} width={200} />
      <p>{item.description}</p>
      <p>${item.price}</p>
    </div>
  );
}