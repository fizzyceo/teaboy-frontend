"use client";
import getLinks from "@/actions/menu/get-links";
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
    console.log("links", links);
  }
  return (
    <main className="flex h-screen w-full flex-col items-center justify-center gap-4 px-4 py-10">
      <p>Scan the QR code to access the menu</p>
      <div className="grid h-full grid-cols-1 gap-8 md:h-auto md:grid-cols-3 xl:h-auto xl:grid-cols-3">
        {links.map((link: any, index) => {
          return (
            <div
              key={index}
              className="flex flex-col items-center justify-center gap-4 rounded-md border-4 border-slate-300 bg-slate-200 p-4 text-black drop-shadow-xl"
            >
              <Canvas
                text={link?.url}
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
              <Link
                href={link.url.replace(
                  "https://basseer-internship-web-app.vercel.app",
                  "",
                )}
              >
                <p className="text-2xl font-semibold">
                  {link.restaurant_name} Menu{" "}
                </p>
              </Link>
            </div>
          );
        })}
      </div>
    </main>
  );
}
