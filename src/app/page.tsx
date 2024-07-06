"use client";
import { useQRCode } from "next-qrcode";
import Link from "next/link";

export default function Home() {
  const { Canvas } = useQRCode();

  const links = [
    "basseer-internship-web-app.vercel.app/menu/1?table=1",
    "basseer-internship-web-app.vercel.app/menu/1?table=2",
    "basseer-internship-web-app.vercel.app/menu/1?table=3",
  ];

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
              <div className="text-center text-xl">
                <Link href={`/menu/1?table=${index + 1}`}>
                  Menu number {index + 1}
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}
