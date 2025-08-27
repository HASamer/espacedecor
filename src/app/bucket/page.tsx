"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Item } from "@/constants";

interface BucketItem extends Item {
  quantity: number;
}

export default function BucketPage() {
  const [bucket, setBucket] = useState<BucketItem[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("bucket");
    setBucket(stored ? JSON.parse(stored) : []);
  }, []);

  const updateQuantity = (id: number, delta: number) => {
    setBucket((prev) => {
      const updated = prev
        .map((i) =>
          i.id === id ? { ...i, quantity: Math.max(1, i.quantity + delta) } : i
        )
        .filter((i) => i.quantity > 0);
      localStorage.setItem("bucket", JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-10">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold">🪣 Bucket</h2>
        <Link href="/">
          <Button variant="outline">← Back to Home</Button>
        </Link>
      </div>
      {bucket.length === 0 ? (
        <p className="text-gray-500">No items in bucket.</p>
      ) : (
        <Card className="rounded-2xl shadow-lg p-4 max-w-xl mx-auto">
          <ul className="space-y-4">
            {bucket.map((item) => (
              <li
                key={item.id}
                className="flex justify-between items-center border-b pb-2"
              >
                <div>
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-sm text-gray-500">
                    {item.quantity} × ${item.price}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => updateQuantity(item.id, -1)}
                  >
                    -
                  </Button>
                  <span className="px-2">{item.quantity}</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => updateQuantity(item.id, 1)}
                  >
                    +
                  </Button>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-4 font-bold text-right text-blue-700">
            Total: ${bucket.reduce((sum, i) => sum + i.price * i.quantity, 0)}
          </div>
        </Card>
      )}
    </div>
  );
}