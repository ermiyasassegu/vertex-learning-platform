"use client";

import * as React from "react";
import Link from "next/link";
import { Bell } from "lucide-react";
import { Show, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import { VertexLogo } from "@/components/ui/navigation";
import { Button } from "@/components/ui/button";

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
              href="/courses"
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

        {/* Right: Auth Controls & User State */}
        <div className="flex items-center gap-3">
          <Show when="signed-out">
            <div className="flex items-center gap-2 sm:gap-3">
              <SignInButton mode="modal">
                <button
                  type="button"
                  className="text-sm font-medium text-[#64748B] hover:text-[#0F172A] px-3 py-2 transition-colors cursor-pointer"
                >
                  Sign in
                </button>
              </SignInButton>
              <SignUpButton mode="modal">
                <Button
                  variant="primary"
                  size="sm"
                  className="rounded-full px-4 h-9 cursor-pointer"
                >
                  Sign up
                </Button>
              </SignUpButton>
            </div>
          </Show>

          <Show when="signed-in">
            <div className="flex items-center gap-4">
              <button
                type="button"
                aria-label="Notifications"
                className="p-2 text-[#0F172A] hover:text-[#F97316] hover:bg-[#F1F5F9] rounded-full transition-colors relative cursor-pointer"
              >
                <Bell className="w-5 h-5 stroke-[1.8]" />
              </button>

              <UserButton />
            </div>
          </Show>
        </div>
      </div>
    </header>
  );
}
