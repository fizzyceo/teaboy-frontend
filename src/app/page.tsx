"use client";
import getLinks from "@/actions/menu/get-links";
import { useQRCode } from "next-qrcode";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [baseUrl, setBaseUrl] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const url = `${window.location.protocol}//${window.location.host}`;
      setBaseUrl(url);
    }
  }, []);
  const { Canvas } = useQRCode();
  const [links, setLinks] = useState([]);

  const loadLinks = async () => {
    const fetched_links = await getLinks(baseUrl);
    setLinks(fetched_links);
  };

  if (links.length === 0) {
    loadLinks();
    console.log("links", links);
  }
  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center gap-4 px-4 py-10">
      <p>Scan the QR code to access the menu</p>
      <div className="grid h-full grid-cols-1 gap-8 md:h-auto md:grid-cols-2 lg:grid-cols-3 xl:h-auto xl:grid-cols-3">
        {links.map((link: any) => {
          return (
            <div
              key={link.id}
              className="flex flex-col items-center justify-center gap-1 rounded-md border-4 border-slate-300 bg-slate-200 p-2 text-black drop-shadow-xl"
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
              <Link href={`menu/${link.id}`} className="hover:underline">
                <p className="text-xl font-semibold">
                  {link.menu_name} - {link.space_name}
                </p>
              </Link>
            </div>
          );
        })}
      </div>
    </main>
  );
}
