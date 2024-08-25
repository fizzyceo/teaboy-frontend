"use client";

import React, { useState } from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Icon } from "@iconify/react";
import Image from "next/image";
import { SIDENAV_ITEMS, SideNavItem } from "@/constants/navlinks";

const SideNav = () => {
  return (
    <div className="fixed hidden h-screen flex-1 border-r border-zinc-200 bg-white md:flex md:w-60">
      <div className="flex w-full flex-col space-y-6">
        <Link
          href="/"
          className="flex h-12 w-full flex-row items-center justify-center space-x-3 border-b border-zinc-200 md:justify-start md:px-6"
        >
          <Image src={"/teaboy-logo.png"} width={28} height={28} alt={""} />
          <span className="flex text-xl font-bold">teaboy.io</span>
        </Link>

        <div className="flex flex-col space-y-2 md:px-6">
          {SIDENAV_ITEMS.map((item, idx) => {
            return <MenuItem key={idx} item={item} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default SideNav;

const MenuItem = ({ item }: { item: SideNavItem }) => {
  const pathname = usePathname();
  const [subMenuOpen, setSubMenuOpen] = useState(false);
  const toggleSubMenu = () => {
    setSubMenuOpen(!subMenuOpen);
  };

  return (
    <div>
      {item.submenu ? (
        <>
          <button
            onClick={toggleSubMenu}
            className={`hover-bg-zinc-100 flex w-full flex-row items-center justify-between rounded-lg p-2 hover:bg-zinc-100 ${
              pathname.includes(item.path) ? "bg-zinc-100" : ""
            }`}
          >
            <div className="flex flex-row items-center space-x-4">
              <item.icon />
              <span className="flex text-xl font-semibold">{item.title}</span>
            </div>

            <div className={`${subMenuOpen ? "rotate-180" : ""} flex`}>
              <Icon icon="lucide:chevron-down" width="24" height="24" />
            </div>
          </button>

          {subMenuOpen && (
            <div className="my-2 ml-12 flex flex-col space-y-4">
              {item.subMenuItems?.map((subItem, idx) => {
                return (
                  <Link
                    key={idx}
                    href={subItem.path}
                    className={`${
                      subItem.path === pathname ? "font-bold" : ""
                    }`}
                  >
                    <div className="flex space-x-3">
                      <subItem.icon />
                      <span>{subItem.title}</span>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </>
      ) : (
        <Link
          href={item.path}
          className={`flex flex-row items-center space-x-4 rounded-lg p-2 hover:bg-zinc-100 ${
            item.path === pathname ? "bg-zinc-100" : ""
          }`}
        >
          <item.icon />
          <span className="flex text-xl font-semibold">{item.title}</span>
        </Link>
      )}
    </div>
  );
};
