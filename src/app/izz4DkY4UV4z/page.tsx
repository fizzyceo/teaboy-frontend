"use client";
import getLinks from "@/actions/menu/get-links";
import LoadingHome from "@/components/shared/loadingHome";
import { QRCode } from "react-qrcode-logo";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [baseUrl, setBaseUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const [links, setLinks] = useState([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const url = `${window.location.protocol}//${window.location.host}`;
      setBaseUrl(url);
    }
  }, []);

  useEffect(() => {
    const fetchLinks = async () => {
      if (baseUrl) {
        setLoading(true);
        const fetched_links = await getLinks(baseUrl);
        setLinks(fetched_links);
        setTimeout(() => {
          setLoading(false);
        }, 4000);
      }
    };

    fetchLinks();
  }, [baseUrl]);

  if (loading) {
    return <LoadingHome />;
  }

  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center gap-4 px-4 py-10">
      <div className="grid h-full grid-cols-1 gap-8 md:h-auto md:grid-cols-2 lg:grid-cols-3 xl:h-auto xl:grid-cols-3">
        {links.map((link: any) => {
          return (
            <div
              key={link.id}
              className="flex flex-col items-center justify-center gap-1 rounded-md border-4 border-slate-300 bg-white p-2 text-black drop-shadow-xl"
            >
              <QRCode
                value={link?.url}
                size={300}
                eyeRadius={10}
                ecLevel="H"
                logoPaddingStyle="circle"
                bgColor="#ffffff"
                logoImage={link?.site_image_url}
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
