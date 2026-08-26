"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { Bell } from "lucide-react";
import { VertexLogo } from "@/components/ui/navigation";

export interface HomeHeaderProps {
  activeTab?: "courses" | "my-learning";
}

export function HomeHeader({ activeTab = "courses" }: HomeHeaderProps) {
  return (
    <header className="w-full pt-6 pb-4 px-4 sm:px-8">
      <div className="max-w-[1440px] mx-auto flex items-center justify-between">
        {/* Left: Vertex Logo & Nav Links */}
        <div className="flex items-center gap-10">
          <Link href="/" className="hover:opacity-90 transition-opacity">
            <VertexLogo size={30} />
          </Link>

          <nav className="hidden sm:flex items-center gap-8 text-sm font-medium">
            <Link
              href="#"
              className={`transition-colors ${
                activeTab === "courses"
                  ? "text-[#0F172A] font-semibold"
                  : "text-[#64748B] hover:text-[#0F172A]"
              }`}
            >
              Courses
            </Link>
            <Link
              href="#"
              className={`transition-colors ${
                activeTab === "my-learning"
                  ? "text-[#0F172A] font-semibold"
                  : "text-[#64748B] hover:text-[#0F172A]"
              }`}
            >
              My Learning
            </Link>
          </nav>
        </div>

        {/* Right: Notifications & User Avatar */}
        <div className="flex items-center gap-4">
          <button
            type="button"
            aria-label="Notifications"
            className="p-2 text-[#0F172A] hover:text-[#F97316] hover:bg-[#F1F5F9] rounded-full transition-colors relative"
          >
            <Bell className="w-5 h-5 stroke-[1.8]" />
          </button>

          {/* User Avatar */}
          <div className="relative w-9 h-9 rounded-full overflow-hidden border border-[#E2E8F0] shadow-xs shrink-0 bg-[#F1F5F9]">
            <Image
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=120"
              alt="User profile"
              width={36}
              height={36}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </header>
  );
}
