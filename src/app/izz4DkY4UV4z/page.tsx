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
  const [currentPage, setCurrentPage] = useState(1);
  const linksPerPage = 21;

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

  const totalPages = Math.ceil(links.length / linksPerPage);
  const currentLinks = links.slice(
    (currentPage - 1) * linksPerPage,
    currentPage * linksPerPage,
  );

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  if (loading) {
    return <LoadingHome />;
  }

  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center gap-4 px-4 py-10">
      <div className="grid h-full grid-cols-1 gap-8 md:h-auto md:grid-cols-2 lg:grid-cols-3 xl:h-auto xl:grid-cols-3">
        {currentLinks.map((link: any) => (
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
        ))}
      </div>

      {/* Pagination */}
      <nav aria-label="Page navigation">
        <ul className="flex h-10 items-center -space-x-px text-base">
          <li>
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              className="flex h-10 items-center justify-center rounded-s-lg border border-e-0 border-gray-300 bg-white px-4 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700"
              disabled={currentPage === 1}
            >
              <span className="sr-only">Previous</span>
              <svg
                className="h-3 w-3 rtl:rotate-180"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 1 1 5l4 4"
                />
              </svg>
            </button>
          </li>
          {Array.from({ length: totalPages }).map((_, index) => (
            <li key={index}>
              <button
                onClick={() => handlePageChange(index + 1)}
                className={`flex h-10 items-center justify-center px-4 leading-tight ${
                  currentPage === index + 1
                    ? "border border-blue-300 bg-blue-50 text-blue-600"
                    : "border border-gray-300 bg-white text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                }`}
              >
                {index + 1}
              </button>
            </li>
          ))}
          <li>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              className="flex h-10 items-center justify-center rounded-e-lg border border-gray-300 bg-white px-4 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700"
              disabled={currentPage === totalPages}
            >
              <span className="sr-only">Next</span>
              <svg
                className="h-3 w-3 rtl:rotate-180"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 9 4-4-4-4"
                />
              </svg>
            </button>
          </li>
        </ul>
      </nav>
    </main>
  );
}
