"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  return (
    <nav className="font-mono bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold text-green-400">
          My App
        </Link>
        <div className="space-x-4">
          <Link href="/" className={`hover:text-green-400 ${pathname === "/" ? "text-green-400 font-bold" : ""}`}>
            To-Do List
          </Link>
          <Link href="/kdrama-review" className={`hover:text-green-400 ${pathname === "/other-page" ? "text-green-400 font-bold" : ""}`}>
            Kdrama Review
          </Link>
        </div>
      </div>
    </nav>
  );
}
