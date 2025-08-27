"use client";
import { ITEMS } from "@/constants";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function PreviewPage() {
  const params = useParams();
  const router = useRouter();
  const id = Number(params.id);
  const item = ITEMS.find((i) => i.id === id);

  if (!item)
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-600 text-lg">
        Item not found.
      </div>
    );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="max-w-xl w-full"
      >
        <Card className="rounded-2xl shadow-lg overflow-hidden">
          <CardContent className="p-6 flex flex-col items-center text-center">
            <img
              src={item.image}
              alt={item.name}
              className="w-48 h-48 object-cover rounded-xl mb-6"
            />
            <h1 className="text-2xl font-bold mb-2">{item.name}</h1>
            <p className="text-gray-600 mb-4">{item.description}</p>
            <p className="text-xl font-semibold text-blue-600 mb-6">
              ${item.price}
            </p>
            <div className="flex gap-4">
              <Button variant="outline" onClick={() => router.back()}>
                ⬅ Back
              </Button>
              <Button>Add to Bucket</Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
