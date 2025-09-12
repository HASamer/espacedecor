"use client";

import Link from "next/link";
import React from "react";
import { useSidebar } from "@/contexts/SidebarContext";
import { useCart } from "@/contexts/CartContext";
import Image from "next/image";

export default function Header() {
  const { toggleSidebar } = useSidebar();
  const { state } = useCart();

  return (
    <React.Fragment>
      <header className="bg-white fixed top-0 left-0 right-0 z-30 ">
        <div className="mx-auto flex h-16 max-w-screen-xl items-center gap-8 px-4 sm:px-6 lg:px-8">
          <div className="flex flex-1 items-center justify-between">
            {/* Sidebar Toggle Button */}
            <button
              onClick={toggleSidebar}
              className="border rounded-md border-blue-900 text-blue-900 bg-gray-100 p-1.5 hover:bg-blue-900 hover:text-white  transition-colors cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-7"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75"
                />
              </svg>
            </button>

            <div>
              <Link
                href="/"
              >
                <Image
                  alt="espacedecor"
                  src="/logo/EspaceDecorLightLogoWithoutBack.png"
                  className="h-20 mt-3 rounded-md object-contain"
                  width={500}
                  height={500}
                  priority
                />
              </Link>
            </div>

            <div>
              <div className="flex items-center gap-4 border rounded-md border-blue-900 p-0.5 transition">
                <div className="sm:flex sm:gap-4">
                  <Link
                    href="/bucket"
                    className="flex rounded-md bg-blue-900 p-1 text-sm font-medium text-white transition hover:bg-white hover:text-blue-900 border border-blue-900"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="size-6 mt-2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                      />
                    </svg>

                    <div className=" -ml-2 px-1 mb-3 rounded-full text-white bg-red-600 ">
                      {state.totalItems}
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </React.Fragment>
  );
}
