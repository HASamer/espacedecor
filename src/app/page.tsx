"use client";

import { useEffect, useMemo, useState, Suspense} from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { ITEMS } from "@/constants";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";

function useDebounced<T>(value: T, delay = 300) {
  const [v, setV] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setV(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return v;
}

export default function HomePage() {
  const router = useRouter();
  const params = useSearchParams();

  // derive initial state from URL
  const qParam = params.get("q") ?? "";
  const minParam = params.get("min");
  const maxParam = params.get("max");

  const prices = useMemo(() => ITEMS.map(i => i.price), []);
  const absoluteMin = Math.min(...prices);
  const absoluteMax = Math.max(...prices);

  const [query, setQuery] = useState(qParam);
  const [range, setRange] = useState<[number, number]>([
    minParam ? Number(minParam) : absoluteMin,
    maxParam ? Number(maxParam) : absoluteMax,
  ]);

  // debounce query so typing feels smooth
  const debouncedQuery = useDebounced(query, 300);

  // keep URL in sync (q, min, max)
  useEffect(() => {
  const s = new URLSearchParams();
  if (debouncedQuery.trim()) s.set("q", debouncedQuery.trim());
  if (range[0] !== absoluteMin) s.set("min", String(range[0]));
  if (range[1] !== absoluteMax) s.set("max", String(range[1]));
  const qs = s.toString();

  // ✅ only update URL if there are search params
  if (qs) {
    router.replace(`?${qs}`);
  }
}, [debouncedQuery, range, router, absoluteMin, absoluteMax]);

  const filtered = useMemo(() => {
    const q = debouncedQuery.trim().toLowerCase();
    return ITEMS.filter((i) => {
      const inPrice = i.price >= range[0] && i.price <= range[1];
      if (!q) return inPrice;
      const hay = `${i.name} ${i.description}`.toLowerCase();
      return inPrice && hay.includes(q);
    });
  }, [debouncedQuery, range]);

  return (
    <Suspense fallback={<div className="p-8 text-gray-500">Loading…</div>}>
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-6xl px-6 py-10">
        {/* Controls */}
        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Search (title or description)
            </label>
            <Input
              placeholder="Try: sofa, wood, minimalist…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <div className="sm:col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Price range (${range[0]} – ${range[1]})
            </label>
            <div className="px-2">
              <Slider
                // shadcn/ui Slider expects number[]
                value={[range[0], range[1]]}
                min={absoluteMin}
                max={absoluteMax}
                step={1}
                onValueChange={(vals) => setRange([vals[0], vals[1]] as [number, number])}
              />
              <div className="mt-3 flex items-center gap-2">
                <Input
                  type="number"
                  value={range[0]}
                  min={absoluteMin}
                  max={range[1]}
                  onChange={(e) => setRange([Number(e.target.value), range[1]])}
                />
                <span className="text-gray-400">—</span>
                <Input
                  type="number"
                  value={range[1]}
                  min={range[0]}
                  max={absoluteMax}
                  onChange={(e) => setRange([range[0], Number(e.target.value)])}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Results */}
        {filtered.length === 0 ? (
          <div className="text-center text-gray-500 py-20">
            No items match your filters.
            <div className="mt-4">
              <Button variant="outline" onClick={() => {
                setQuery("");
                setRange([absoluteMin, absoluteMax]);
              }}>
                Reset filters
              </Button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: idx * 0.03 }}
              >
                <Card
                  className="rounded-2xl shadow-sm hover:shadow-md transition cursor-pointer"
                  onClick={() => router.push(`/preview/${item.id}`)}
                >
                  <CardContent className="p-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-48 object-cover rounded-xl mb-4"
                    />
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="text-lg font-semibold">{item.name}</h3>
                      <span className="text-blue-600 font-medium">${item.price}</span>
                    </div>
                    <p className="text-sm text-gray-600 line-clamp-2">{item.description}</p>
                    <div className="mt-4">
                      <Button className="w-full">Preview</Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
    </Suspense>
  );
}
