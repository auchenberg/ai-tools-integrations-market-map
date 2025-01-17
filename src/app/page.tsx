"use client";
import React from "react";
import { MarketMap } from "@/components/MarketMap";
import marketMapData from "@/data/market-map.json";

export default function Home() {
  // Reverse layers for display
  const processedData = {
    ...marketMapData,
    layers: [...marketMapData.layers].reverse(),
  };

  return (
    <main className="p-32">
      <MarketMap data={processedData} />
    </main>
  );
}
