"use client";
import getLinks from "@/actions/get-links";
import { useQRCode } from "next-qrcode";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const { Canvas } = useQRCode();
  const [links, setLinks] = useState([]);

  const loadLinks = async () => {
    const fetched_links = await getLinks();
    setLinks(fetched_links);
  };

  if (links.length === 0) {
    loadLinks();
  }
  return (
    <main className="w-full h-full flex flex-col items-center justify-center gap-4 p-4">
      <div className="text-3xl xl:text-2xl">Welcome to iMenu</div>
      <div className="grid grid-cols-1 gap-8 xl:grid-cols-3 md:grid-cols-3">
        {links.map((link, index) => {
          return (
            <div
              key={index}
              className="flex flex-col items-center justify-center gap-4 rounded-md p-4 bg-slate-200 text-black drop-shadow-lg"
            >
              <Canvas
                text={link}
                options={{
                  type: "image/jpeg",
                  quality: 0.4,
                  errorCorrectionLevel: "M",
                  margin: 3,
                  scale: 5,
                  width: 300,
                  color: {
                    dark: "#000000FF",
                    light: "#e2e8f0ff",
                  },
                }}
              />
            </div>
          );
        })}
      </div>
    </main>
  );
}
