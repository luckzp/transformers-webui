"use client";

import React from "react";
import Link from "next/link";

export default function Aside() {
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
        <Link href="/remove-background">
          <button className="w-full flex items-center space-x-2 hover:bg-gray-200 active:bg-gray-300 py-2 px-2 rounded-lg text-gray-500">
            <img
              className="inline-block w-4 h-4"
              src="/background_remove.svg"
              alt="background_remove SVG"
            />
            <span className="text-sm font-medium">Remove Background</span>
          </button>
        </Link>

        <Link href="/sentiment-analysis">
          <button className="w-full flex items-center space-x-2 bg-gray-200 active:bg-gray-300 py-2 px-2 rounded-lg text-gray-500">
            <img
              className="inline-block w-4 h-4"
              src="/sentiment-analysis.svg"
              alt="sentiment-analysis SVG"
            />
            <span className="text-sm font-medium">Sentiment Analysis</span>
          </button>
        </Link>
        <Link href="/translator">
          <button className="w-full flex items-center space-x-2 hover:bg-gray-200 active:bg-gray-300 py-2 px-2 rounded-lg text-gray-500">
            <img
              className="inline-block w-4 h-4"
              src="/translator.svg"
              alt="translator SVG"
            />
            <span className="text-sm font-medium">Translator</span>
          </button>
        </Link>
      </nav>
    </aside>
  );
}
