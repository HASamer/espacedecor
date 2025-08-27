"use client";
import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ITEMS, Item } from "@/constants";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface BucketItem extends Item {
  quantity: number;
}

export default function HomePage() {
  const [bucket, setBucket] = useState<BucketItem[]>([]);

  const addToBucket = (item: Item) => {
    setBucket((prev) => {
      const found = prev.find((i) => i.id === item.id);
      if (found) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const updateQuantity = (id: number, delta: number) => {
    setBucket((prev) =>
      prev
        .map((i) =>
          i.id === id ? { ...i, quantity: Math.max(1, i.quantity + delta) } : i
        )
        .filter((i) => i.quantity > 0)
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Items Section */}
        <div className="md:col-span-2">
          <h1 className="text-3xl font-bold mb-6 text-blue-900">EspaceDecor</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {ITEMS.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="rounded-2xl shadow-md hover:shadow-xl transition">
                  <CardContent className="p-4 flex flex-col items-center text-center">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-32 h-32 object-cover rounded-xl mb-4"
                    />
                    <h3 className="text-lg font-semibold">
                      <Link href={`/preview/${item.id}`} className="hover:underline">
                        {item.name}
                      </Link>
                    </h3>
                    <p className="text-sm text-gray-500 mb-2">{item.description}</p>
                    <p className="font-bold text-blue-600 mb-4">${item.price}</p>
                    <Button onClick={() => addToBucket(item)} className="w-full">
                      Add to Bucket
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bucket Section */}
        <div>
          <h2 className="text-2xl font-bold mb-4">🪣 Bucket</h2>
          {bucket.length === 0 ? (
            <p className="text-gray-500">No items in bucket.</p>
          ) : (
            <Card className="rounded-2xl shadow-lg p-4">
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
      </div>
    </div>
  );
}
