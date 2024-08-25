"use client";

import React from "react";

import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";

import useScroll from "@/hooks/use-scroll";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

const Header = () => {
  const scrolled = useScroll(5);
  const selectedLayout = useSelectedLayoutSegment();
  const router = useRouter();

  return (
    <div
      className={cn(
        `sticky inset-x-0 top-0 z-30 w-full border-b border-gray-200 transition-all`,
        {
          "border-b border-gray-200 bg-white/75 backdrop-blur-lg": scrolled,
          "border-b border-gray-200 bg-white": selectedLayout,
        },
      )}
    >
      <div className="flex h-[47px] items-center justify-between px-4">
        <Button
          variant="ghost"
          size="sm"
          className="hidden md:block lg:block"
          onClick={() => {
            if (window.history.length > 1) {
              router.back();
            } else {
              router.push("/dashboard");
            }
          }}
        >
          <ChevronLeft size={24} />
        </Button>
        <div className="flex items-center space-x-4">
          <Link
            href="/dashboard"
            className="flex flex-row items-center justify-center space-x-3 md:hidden"
          >
            <Image src={"/teaboy-logo.png"} width={28} height={28} alt={""} />
            <span className="flex text-xl font-bold">teaboy.io</span>
          </Link>
        </div>

        <div className="hidden md:block">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-300 text-center">
            <span className="text-sm font-semibold">M</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
