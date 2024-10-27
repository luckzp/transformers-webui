"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

export default function Aside() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    // If the pathname is root ("/"), default to "/remove-background"
    if (pathname === "/") return href === "/remove-background";
    return pathname === href;
  };

  const menuItems = [
    {
      href: "/remove-background",
      label: "Remove Background",
      icon: "/background_remove.svg",
    },
    {
      href: "/sentiment-analysis",
      label: "Sentiment Analysis",
      icon: "/sentiment-analysis.svg",
    },
    { href: "/translator", label: "Translator", icon: "/translator.svg" },
  ];

  return (
    <aside className="sticky top-0 h-screen w-56 bg-gray-100 text-gray-800 p-4">
      <div className="flex items-center mb-4 space-x-1">
        <img
          src="/logo.svg"
          width="40"
          height="40"
          alt="Company Logo"
          style={{ aspectRatio: "30/30", objectFit: "cover" }}
        />
        <h1 className="text-lg font-medium text-center">Transformers WebUI</h1>
      </div>
      <nav className="space-y-2">
        {menuItems.map((item) => (
          <Link key={item.href} href={item.href}>
            <button
              className={clsx(
                "w-full flex items-center space-x-2 py-2 px-2 rounded-lg text-gray-500",
                isActive(item.href)
                  ? "bg-gray-200"
                  : "hover:bg-gray-200 active:bg-gray-300"
              )}
            >
              <img
                className="inline-block w-4 h-4"
                src={item.icon}
                alt={`${item.label} icon`}
              />
              <span className="text-sm font-medium">{item.label}</span>
            </button>
          </Link>
        ))}
      </nav>
    </aside>
  );
}
