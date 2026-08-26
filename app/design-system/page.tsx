"use client";

import * as React from "react";
import {
  Bell,
  Search,
  Play,
  FileText,
  Bookmark,
  BarChart2,
  Clock,
  User,
  ChevronRight,
  ExternalLink,
  PlayCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SearchInput } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { StatusIndicator } from "@/components/ui/status-indicator";
import { ProgressBar } from "@/components/ui/progress-bar";
import { CourseCard } from "@/components/ui/course-card";
import { LessonCard } from "@/components/ui/lesson-card";
import { ResourceCard } from "@/components/ui/resource-card";
import { Navigation, VertexLogo } from "@/components/ui/navigation";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Pagination } from "@/components/ui/pagination";
import { Principles } from "@/components/ui/principles";

export default function DesignSystemPage() {
  const [currentPage, setCurrentPage] = React.useState(1);

  return (
    <div className="min-h-screen bg-[#FAFAFC] text-[#0F172A] p-6 sm:p-10 lg:p-16">
      <div className="max-w-7xl mx-auto space-y-12 bg-white border border-[#E2E8F0] rounded-[24px] p-8 sm:p-12 lg:p-16 shadow-sm">
        
        {/* TOP ROW: Header & 01 Colors */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start pb-12 border-b border-[#F1F5F9]">
          {/* Header Description */}
          <div className="lg:col-span-4 space-y-6">
            <VertexLogo size={36} />
            <div className="space-y-3">
              <h1 className="text-display-1 text-[#0F172A] leading-tight">
                Design System
              </h1>
              <p className="text-body-large text-[#64748B] leading-relaxed">
                A unified design language for Vertex learning platform. Clean, modern and focused on clarity, consistency and intuitive learning experiences.
              </p>
            </div>
            <div className="pt-2">
              <span className="text-[11px] font-bold tracking-widest text-[#64748B] uppercase">
                VERSION 1.0 • MAY 2025
              </span>
            </div>
          </div>

          {/* 01 COLORS */}
          <div className="lg:col-span-8 space-y-8 bg-[#FAFAFC] p-8 rounded-[16px] border border-[#E2E8F0]">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-[#F97316] tracking-wider uppercase">01</span>
              <h2 className="text-xs font-bold text-[#0F172A] tracking-wider uppercase">COLORS</h2>
            </div>

            {/* Primary Colors */}
            <div className="space-y-3">
              <span className="text-xs font-semibold text-[#64748B]">Primary</span>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                {[
                  { name: "Primary 500", hex: "#F97316", bg: "bg-[#F97316]", text: "text-white" },
                  { name: "Primary 400", hex: "#FB923C", bg: "bg-[#FB923C]", text: "text-white" },
                  { name: "Primary 300", hex: "#FDBA74", bg: "bg-[#FDBA74]", text: "text-[#0F172A]" },
                  { name: "Primary 200", hex: "#FED7AA", bg: "bg-[#FED7AA]", text: "text-[#0F172A]" },
                  { name: "Primary 100", hex: "#FFEEE5", bg: "bg-[#FFEEE5]", text: "text-[#0F172A]", border: "border border-[#FED7AA]" },
                ].map((color) => (
                  <div key={color.name} className="space-y-1.5">
                    <div className={`h-14 rounded-[8px] ${color.bg} ${color.border || ""} shadow-xs`} />
                    <div className="text-[11px] font-medium text-[#0F172A]">{color.name}</div>
                    <div className="text-[10px] font-mono text-[#64748B]">{color.hex}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Neutral Colors */}
            <div className="space-y-3">
              <span className="text-xs font-semibold text-[#64748B]">Neutral</span>
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
                {[
                  { name: "Neutral 900", hex: "#0F172A", bg: "bg-[#0F172A]" },
                  { name: "Neutral 700", hex: "#334155", bg: "bg-[#334155]" },
                  { name: "Neutral 500", hex: "#64748B", bg: "bg-[#64748B]" },
                  { name: "Neutral 300", hex: "#CBD5E1", bg: "bg-[#CBD5E1]" },
                  { name: "Neutral 200", hex: "#E2E8F0", bg: "bg-[#E2E8F0]" },
                  { name: "Neutral 100", hex: "#F1F5F9", bg: "bg-[#F1F5F9]" },
                  { name: "Neutral 50", hex: "#FAFAFC", bg: "bg-[#FAFAFC]", border: "border border-[#E2E8F0]" },
                  { name: "White", hex: "#FFFFFF", bg: "bg-[#FFFFFF]", border: "border border-[#E2E8F0]" },
                ].map((color) => (
                  <div key={color.name} className="space-y-1.5">
                    <div className={`h-14 rounded-[8px] ${color.bg} ${color.border || ""} shadow-xs`} />
                    <div className="text-[11px] font-medium text-[#0F172A]">{color.name}</div>
                    <div className="text-[10px] font-mono text-[#64748B]">{color.hex}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ROW 2: 02 TYPOGRAPHY & 03 TYPE SCALE */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-12 border-b border-[#F1F5F9]">
          {/* 02 TYPOGRAPHY */}
          <div className="lg:col-span-4 space-y-6">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-[#F97316] tracking-wider uppercase">02</span>
              <h2 className="text-xs font-bold text-[#0F172A] tracking-wider uppercase">TYPOGRAPHY</h2>
            </div>

            <div className="space-y-8 bg-[#FAFAFC] p-6 rounded-[16px] border border-[#E2E8F0]">
              <div className="flex items-center gap-4">
                <span className="text-5xl font-serif font-bold text-[#0F172A]">Ag</span>
                <div>
                  <h3 className="text-lg font-serif font-bold text-[#0F172A]">Playfair Display</h3>
                  <p className="text-xs text-[#64748B]">Elegant • Readable • Timeless</p>
                </div>
              </div>

              <div className="flex items-center gap-4 pt-4 border-t border-[#E2E8F0]">
                <span className="text-5xl font-sans font-bold text-[#0F172A]">Ag</span>
                <div>
                  <h3 className="text-lg font-sans font-bold text-[#0F172A]">Inter</h3>
                  <p className="text-xs text-[#64748B]">Clean • Modern • Highly legible</p>
                </div>
              </div>
            </div>
          </div>

          {/* 03 TYPE SCALE */}
          <div className="lg:col-span-8 space-y-6">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-[#F97316] tracking-wider uppercase">03</span>
              <h2 className="text-xs font-bold text-[#0F172A] tracking-wider uppercase">TYPE SCALE</h2>
            </div>

            <div className="overflow-x-auto bg-[#FAFAFC] rounded-[16px] border border-[#E2E8F0] p-4 sm:p-6">
              <table className="w-full text-left text-xs text-[#64748B]">
                <thead className="border-b border-[#E2E8F0] font-semibold text-[#0F172A]">
                  <tr>
                    <th className="pb-3 pr-4">Style</th>
                    <th className="pb-3 pr-4">Font</th>
                    <th className="pb-3 pr-4">Size / Line Height</th>
                    <th className="pb-3 pr-4">Weight</th>
                    <th className="pb-3">Use</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F1F5F9]">
                  {[
                    { style: "Display 1", font: "Playfair Display", size: "48 / 56", weight: "Bold", use: "Page titles", customClass: "font-serif text-2xl font-bold text-[#0F172A]" },
                    { style: "Display 2", font: "Playfair Display", size: "36 / 44", weight: "Bold", use: "Section titles", customClass: "font-serif text-xl font-bold text-[#0F172A]" },
                    { style: "Heading 1", font: "Inter", size: "28 / 36", weight: "Semi Bold", use: "Card titles", customClass: "font-sans font-semibold text-[#0F172A]" },
                    { style: "Heading 2", font: "Inter", size: "22 / 30", weight: "Semi Bold", use: "Sub section", customClass: "font-sans font-semibold text-[#0F172A]" },
                    { style: "Heading 3", font: "Inter", size: "18 / 26", weight: "Medium", use: "Small titles", customClass: "font-sans font-medium text-[#0F172A]" },
                    { style: "Body Large", font: "Inter", size: "16 / 24", weight: "Regular", use: "Body copy", customClass: "font-sans text-[#0F172A]" },
                    { style: "Body", font: "Inter", size: "14 / 20", weight: "Regular", use: "Supporting text", customClass: "font-sans text-[#0F172A]" },
                    { style: "Small", font: "Inter", size: "12 / 16", weight: "Regular", use: "Captions, meta", customClass: "font-sans text-[#0F172A]" },
                  ].map((row) => (
                    <tr key={row.style} className="hover:bg-white/50 transition-colors">
                      <td className="py-2.5 pr-4 font-semibold text-[#0F172A]">{row.style}</td>
                      <td className="py-2.5 pr-4">{row.font}</td>
                      <td className="py-2.5 pr-4 font-mono">{row.size}</td>
                      <td className="py-2.5 pr-4">{row.weight}</td>
                      <td className="py-2.5 text-[#0F172A]">{row.use}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* ROW 3: 04 SPACING SYSTEM & 05 RADIUS & SHADOWS */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-12 border-b border-[#F1F5F9]">
          {/* 04 SPACING SYSTEM */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-[#F97316] tracking-wider uppercase">04</span>
              <h2 className="text-xs font-bold text-[#0F172A] tracking-wider uppercase">SPACING SYSTEM</h2>
            </div>

            <div className="bg-[#FAFAFC] p-6 rounded-[16px] border border-[#E2E8F0] space-y-6">
              <span className="text-xs font-semibold text-[#64748B]">Base unit: 4px</span>
              
              <div className="flex flex-wrap items-end gap-3 pt-2">
                {[
                  { px: 4, rem: "0.25rem", size: "w-1 h-1" },
                  { px: 8, rem: "0.5rem", size: "w-2 h-2" },
                  { px: 12, rem: "0.75rem", size: "w-3 h-3" },
                  { px: 16, rem: "1rem", size: "w-4 h-4" },
                  { px: 24, rem: "1.5rem", size: "w-6 h-6" },
                  { px: 32, rem: "2rem", size: "w-8 h-8" },
                  { px: 40, rem: "2.5rem", size: "w-10 h-10" },
                  { px: 48, rem: "3rem", size: "w-12 h-12" },
                  { px: 64, rem: "4rem", size: "w-16 h-16" },
                ].map((space) => (
                  <div key={space.px} className="flex flex-col items-center gap-2">
                    <div className={`${space.size} bg-[#FED7AA] rounded-[2px]`} />
                    <div className="text-[11px] font-bold text-[#0F172A]">{space.px}</div>
                    <div className="text-[10px] text-[#64748B]">({space.rem})</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 05 RADIUS & SHADOWS */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-[#F97316] tracking-wider uppercase">05</span>
              <h2 className="text-xs font-bold text-[#0F172A] tracking-wider uppercase">RADIUS & SHADOWS</h2>
            </div>

            <div className="bg-[#FAFAFC] p-6 rounded-[16px] border border-[#E2E8F0] space-y-6">
              {/* Radius */}
              <div className="space-y-3">
                <span className="text-xs font-semibold text-[#64748B]">Radius</span>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
                  {[
                    { name: "4px", label: "(xs)", radius: "rounded-[4px]" },
                    { name: "8px", label: "(sm)", radius: "rounded-[8px]" },
                    { name: "12px", label: "(md)", radius: "rounded-[12px]" },
                    { name: "16px", label: "(lg)", radius: "rounded-[16px]" },
                    { name: "24px", label: "(xl)", radius: "rounded-[24px]" },
                    { name: "Full", label: "(circle)", radius: "rounded-full" },
                  ].map((r) => (
                    <div key={r.name} className="flex flex-col items-center gap-1.5">
                      <div className={`w-12 h-12 bg-white border border-[#CBD5E1] ${r.radius}`} />
                      <span className="text-xs font-medium text-[#0F172A]">{r.name}</span>
                      <span className="text-[10px] text-[#64748B]">{r.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Shadows */}
              <div className="space-y-3 pt-4 border-t border-[#E2E8F0]">
                <span className="text-xs font-semibold text-[#64748B]">Shadows</span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {[
                    { name: "Sm", spec: "0 1px 2px 0 rgba(15, 23, 42, 0.05)", shadowClass: "shadow-sm" },
                    { name: "Md", spec: "0 4px 12px -2px rgba(15, 23, 42, 0.08)", shadowClass: "shadow-md" },
                    { name: "Lg", spec: "0 12px 24px -4px rgba(15, 23, 42, 0.10)", shadowClass: "shadow-lg" },
                    { name: "Xl", spec: "0 20px 40px -8px rgba(15, 23, 42, 0.12)", shadowClass: "shadow-xl" },
                  ].map((s) => (
                    <div key={s.name} className={`bg-white p-4 rounded-[12px] border border-[#E2E8F0] ${s.shadowClass} space-y-1`}>
                      <div className="text-xs font-bold text-[#0F172A]">{s.name}</div>
                      <div className="text-[10px] text-[#64748B] leading-tight font-mono">{s.spec}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ROW 4: 06 ICONS, 07 BUTTONS, 08 INPUTS */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pb-12 border-b border-[#F1F5F9]">
          
          {/* 06 ICONS */}
          <div className="lg:col-span-3 space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-[#F97316] tracking-wider uppercase">06</span>
              <h2 className="text-xs font-bold text-[#0F172A] tracking-wider uppercase">ICONS</h2>
            </div>

            <div className="bg-[#FAFAFC] p-5 rounded-[16px] border border-[#E2E8F0] space-y-4">
              <div className="space-y-2">
                <span className="text-xs font-semibold text-[#64748B]">Outline Style</span>
                <div className="flex flex-wrap gap-2.5 text-[#0F172A]">
                  <Bell className="w-5 h-5 stroke-[2]" />
                  <Search className="w-5 h-5 stroke-[2]" />
                  <Play className="w-5 h-5 stroke-[2]" />
                  <FileText className="w-5 h-5 stroke-[2]" />
                  <Bookmark className="w-5 h-5 stroke-[2]" />
                  <BarChart2 className="w-5 h-5 stroke-[2]" />
                  <Clock className="w-5 h-5 stroke-[2]" />
                  <User className="w-5 h-5 stroke-[2]" />
                  <ChevronRight className="w-5 h-5 stroke-[2]" />
                </div>
              </div>

              <div className="space-y-2 pt-3 border-t border-[#E2E8F0]">
                <span className="text-xs font-semibold text-[#64748B]">Filled Style</span>
                <div className="flex flex-wrap gap-2.5 text-[#0F172A]">
                  <Bell className="w-5 h-5 fill-current" />
                  <Search className="w-5 h-5 fill-current stroke-1" />
                  <Play className="w-5 h-5 fill-current" />
                  <FileText className="w-5 h-5 fill-current" />
                  <Bookmark className="w-5 h-5 fill-current" />
                  <BarChart2 className="w-5 h-5 fill-current" />
                  <Clock className="w-5 h-5 fill-current" />
                  <User className="w-5 h-5 fill-current" />
                  <ChevronRight className="w-5 h-5 stroke-[3]" />
                </div>
              </div>

              <div className="pt-3 border-t border-[#E2E8F0] space-y-1 text-[11px] text-[#64748B]">
                <span className="font-semibold text-[#0F172A] block mb-1">Icon Specs</span>
                <div>• 24x24px grid</div>
                <div>• 2px stroke width (outline)</div>
                <div>• Rounded line caps</div>
                <div>• Consistent optical balance</div>
              </div>
            </div>
          </div>

          {/* 07 BUTTONS */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-[#F97316] tracking-wider uppercase">07</span>
              <h2 className="text-xs font-bold text-[#0F172A] tracking-wider uppercase">BUTTONS</h2>
            </div>

            <div className="bg-[#FAFAFC] p-5 rounded-[16px] border border-[#E2E8F0] space-y-4 overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="text-[#64748B]">
                    <th className="pb-3 pr-2">State</th>
                    <th className="pb-3 pr-2">Primary</th>
                    <th className="pb-3 pr-2">Secondary</th>
                    <th className="pb-3 pr-2">Tertiary</th>
                    <th className="pb-3">Text</th>
                  </tr>
                </thead>
                <tbody className="space-y-3">
                  <tr className="border-b border-[#F1F5F9]">
                    <td className="py-2.5 pr-2 font-medium text-[#64748B]">Default</td>
                    <td className="py-2.5 pr-2">
                      <Button size="sm" variant="primary">Get Started</Button>
                    </td>
                    <td className="py-2.5 pr-2">
                      <Button size="sm" variant="secondary">Explore Courses</Button>
                    </td>
                    <td className="py-2.5 pr-2">
                      <Button size="sm" variant="tertiary" icon={<ExternalLink className="w-3 h-3" />}>
                        View Lesson
                      </Button>
                    </td>
                    <td className="py-2.5">
                      <Button size="sm" variant="text" icon={<PlayCircle className="w-3.5 h-3.5" />}>
                        Watch Video
                      </Button>
                    </td>
                  </tr>

                  <tr className="border-b border-[#F1F5F9]">
                    <td className="py-2.5 pr-2 font-medium text-[#64748B]">Hover</td>
                    <td className="py-2.5 pr-2">
                      <button className="h-[34px] px-2.5 text-xs rounded-[8px] font-medium bg-[#EA580C] text-white shadow-sm inline-flex items-center justify-center">
                        Get Started
                      </button>
                    </td>
                    <td className="py-2.5 pr-2">
                      <button className="h-[34px] px-2.5 text-xs rounded-[8px] font-medium border border-[#F97316] text-[#F97316] bg-[#FFEEE5] inline-flex items-center justify-center">
                        Explore Courses
                      </button>
                    </td>
                    <td className="py-2.5 pr-2">
                      <button className="h-[34px] px-2.5 text-xs rounded-[8px] font-medium border border-[#CBD5E1] text-[#0F172A] bg-[#F8FAFC] shadow-sm inline-flex items-center justify-center gap-1">
                        View Lesson <ExternalLink className="w-3 h-3" />
                      </button>
                    </td>
                    <td className="py-2.5">
                      <button className="text-xs font-medium text-[#EA580C] inline-flex items-center gap-1">
                        Watch Video <PlayCircle className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>

                  <tr>
                    <td className="py-2.5 pr-2 font-medium text-[#64748B]">Disabled</td>
                    <td className="py-2.5 pr-2">
                      <Button size="sm" variant="primary" disabled>Get Started</Button>
                    </td>
                    <td className="py-2.5 pr-2">
                      <Button size="sm" variant="secondary" disabled>Explore Courses</Button>
                    </td>
                    <td className="py-2.5 pr-2">
                      <Button size="sm" variant="tertiary" disabled icon={<ExternalLink className="w-3 h-3" />}>
                        View Lesson
                      </Button>
                    </td>
                    <td className="py-2.5">
                      <Button size="sm" variant="text" disabled icon={<PlayCircle className="w-3.5 h-3.5" />}>
                        Watch Video
                      </Button>
                    </td>
                  </tr>
                </tbody>
              </table>

              <div className="pt-3 border-t border-[#E2E8F0] space-y-1 text-[11px] text-[#64748B]">
                <span className="font-semibold text-[#0F172A] block mb-1">Button Specs</span>
                <div>• Height: 44px (default)</div>
                <div>• Padding: 0 16px (lg), 0 12px (md)</div>
                <div>• Radius: 12px</div>
                <div>• Font: Inter Medium (14–16px)</div>
              </div>
            </div>
          </div>

          {/* 08 INPUTS */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-[#F97316] tracking-wider uppercase">08</span>
              <h2 className="text-xs font-bold text-[#0F172A] tracking-wider uppercase">INPUTS</h2>
            </div>

            <div className="bg-[#FAFAFC] p-5 rounded-[16px] border border-[#E2E8F0] space-y-4">
              <div className="space-y-1.5">
                <span className="text-xs font-semibold text-[#64748B]">Search / Text Input</span>
                <SearchInput placeholder="Search anything..." />
              </div>

              <div className="space-y-1.5 pt-2">
                <span className="text-xs font-semibold text-[#64748B]">Select</span>
                <Select
                  options={[
                    { value: "most-relevant", label: "Most Relevant" },
                    { value: "newest", label: "Newest" },
                    { value: "popular", label: "Most Popular" },
                  ]}
                />
              </div>

              <div className="pt-3 border-t border-[#E2E8F0] space-y-1 text-[11px] text-[#64748B]">
                <span className="font-semibold text-[#0F172A] block mb-1">Field Specs</span>
                <div>• Height: 44px</div>
                <div>• Radius: 12px</div>
                <div>• Border: 1px solid #E2E8F0</div>
                <div>• Padding: 0 16px</div>
                <div>• Focus: Border color #FB923C</div>
              </div>
            </div>
          </div>

        </div>

        {/* ROW 5: 09 BADGES / TAGS, 10 STATUS / INDICATORS, 11 PROGRESS BAR */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-12 gap-8 pb-12 border-b border-[#F1F5F9]">
          
          {/* 09 BADGES / TAGS */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-[#F97316] tracking-wider uppercase">09</span>
              <h2 className="text-xs font-bold text-[#0F172A] tracking-wider uppercase">BADGES / TAGS</h2>
            </div>

            <div className="bg-[#FAFAFC] p-5 rounded-[16px] border border-[#E2E8F0] flex items-center justify-around">
              <div className="space-y-1 text-center">
                <span className="text-xs font-semibold text-[#64748B] block mb-1">Video</span>
                <Badge variant="video">VIDEO</Badge>
              </div>

              <div className="space-y-1 text-center">
                <span className="text-xs font-semibold text-[#64748B] block mb-1">Lesson</span>
                <Badge variant="lesson">LESSON</Badge>
              </div>

              <div className="space-y-1 text-center">
                <span className="text-xs font-semibold text-[#64748B] block mb-1">Popular</span>
                <Badge variant="popular">POPULAR</Badge>
              </div>
            </div>
          </div>

          {/* 10 STATUS / INDICATORS */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-[#F97316] tracking-wider uppercase">10</span>
              <h2 className="text-xs font-bold text-[#0F172A] tracking-wider uppercase">STATUS / INDICATORS</h2>
            </div>

            <div className="bg-[#FAFAFC] p-5 rounded-[16px] border border-[#E2E8F0] flex flex-wrap items-center justify-between gap-3">
              <StatusIndicator status="in-progress" />
              <StatusIndicator status="completed" />
              <StatusIndicator status="now-playing" />
              <StatusIndicator status="locked" />
            </div>
          </div>

          {/* 11 PROGRESS BAR */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-[#F97316] tracking-wider uppercase">11</span>
              <h2 className="text-xs font-bold text-[#0F172A] tracking-wider uppercase">PROGRESS BAR</h2>
            </div>

            <div className="bg-[#FAFAFC] p-5 rounded-[16px] border border-[#E2E8F0] flex items-center justify-center">
              <ProgressBar value={35} />
            </div>
          </div>

        </div>

        {/* ROW 6: 12 CARDS */}
        <div className="space-y-6 pb-12 border-b border-[#F1F5F9]">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-[#F97316] tracking-wider uppercase">12</span>
            <h2 className="text-xs font-bold text-[#0F172A] tracking-wider uppercase">CARDS</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Course Card */}
            <div>
              <span className="text-xs font-semibold text-[#64748B] block mb-2">Course Card</span>
              <CourseCard
                title="Next.js for Production"
                description="Build scalable, high-performance web applications with Next.js."
                level="Intermediate"
                duration="18h 24m"
                modulesCount="12 modules"
              />
            </div>

            {/* Lesson Card (Video) */}
            <div>
              <span className="text-xs font-semibold text-[#64748B] block mb-2">Lesson Card (Video)</span>
              <LessonCard
                type="video"
                title="Data Fetching in Server Components"
                description="Learn how to fetch data on the server using async/await and Next.js best practices."
                meta="Lesson 5.1 • 12:45"
                actionLabel="Watch from 12:45"
              />
            </div>

            {/* Lesson Card (Lesson) */}
            <div>
              <span className="text-xs font-semibold text-[#64748B] block mb-2">Lesson Card (Lesson)</span>
              <LessonCard
                type="lesson"
                title="Data Fetching & Caching"
                description="Explore different data fetching methods in Next.js and how to cache and revalidate data for optimal performance."
                meta="Module 5"
                actionLabel="View lesson"
              />
            </div>

            {/* Resource Card */}
            <div>
              <span className="text-xs font-semibold text-[#64748B] block mb-2">Resource Card</span>
              <ResourceCard
                title="Caching and Revalidation Guide"
                description="Deep dive into Next.js caching strategies."
                meta="PDF • 1.2 MB"
              />
            </div>
          </div>
        </div>

        {/* ROW 7: 13 NAVIGATION, BREADCRUMBS, PAGINATION */}
        <div className="space-y-6 pb-12 border-b border-[#F1F5F9]">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-[#F97316] tracking-wider uppercase">13</span>
            <h2 className="text-xs font-bold text-[#0F172A] tracking-wider uppercase">NAVIGATION</h2>
          </div>

          <div className="bg-[#FAFAFC] p-6 rounded-[16px] border border-[#E2E8F0] space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              <div className="lg:col-span-4">
                <Navigation />
              </div>

              <div className="lg:col-span-5 bg-white p-4 rounded-[12px] border border-[#E2E8F0] shadow-xs">
                <span className="text-xs font-semibold text-[#64748B] block mb-2">Breadcrumbs</span>
                <Breadcrumbs
                  items={[
                    { label: "All Courses", href: "#" },
                    { label: "Next.js for Production", href: "#" },
                    { label: "Data Fetching & Caching" },
                  ]}
                />
              </div>

              <div className="lg:col-span-3 bg-white p-4 rounded-[12px] border border-[#E2E8F0] shadow-xs flex flex-col items-center justify-center">
                <span className="text-xs font-semibold text-[#64748B] block mb-2 self-start">Pagination</span>
                <Pagination
                  currentPage={currentPage}
                  totalPages={8}
                  onPageChange={(page) => setCurrentPage(page)}
                />
              </div>
            </div>
          </div>
        </div>

        {/* ROW 8: 14 PRINCIPLES */}
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-[#F97316] tracking-wider uppercase">14</span>
            <h2 className="text-xs font-bold text-[#0F172A] tracking-wider uppercase">PRINCIPLES</h2>
          </div>

          <div className="bg-[#FAFAFC] p-8 rounded-[16px] border border-[#E2E8F0]">
            <Principles />
          </div>
        </div>

      </div>
    </div>
  );
}
