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
    console.log("links", links);
  }
  return (
    <main className="flex h-full w-full flex-col items-center justify-center gap-4 p-4">
      <div className="text-3xl xl:text-2xl">Welcome to iMenu</div>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3 xl:grid-cols-3">
        {links.map((link: any, index) => {
          return (
            <div
              key={index}
              className="flex flex-col items-center justify-center gap-4 rounded-md bg-slate-200 p-4 text-black drop-shadow-lg"
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
                <p>Menu {index + 1}</p>
              </Link>
            </div>
          );
        })}
      </div>
    </main>
  );
}
