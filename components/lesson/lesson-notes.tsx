import * as React from "react";
import Image from "next/image";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/react";
import { urlForImage } from "@/sanity/lib/image";
import type { SanityImage } from "@/sanity/types";

interface CodeBlockValue {
  language?: string;
  filename?: string;
  code?: string;
}

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="text-[15px] sm:text-base text-[#334155] leading-relaxed mb-4">{children}</p>
    ),
    h2: ({ children }) => (
      <h2 className="font-serif text-2xl font-bold text-[#0F172A] mt-8 mb-3">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="font-serif text-xl font-semibold text-[#0F172A] mt-6 mb-2">{children}</h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-lg font-semibold text-[#0F172A] mt-5 mb-2">{children}</h4>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-[#D96338] pl-4 py-1 my-4 text-[#475569] italic">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc pl-6 mb-4 space-y-1.5 text-[15px] sm:text-base text-[#334155]">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal pl-6 mb-4 space-y-1.5 text-[15px] sm:text-base text-[#334155]">
        {children}
      </ol>
    ),
  },
  marks: {
    strong: ({ children }) => <strong className="font-semibold text-[#0F172A]">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
    underline: ({ children }) => <span className="underline">{children}</span>,
    "strike-through": ({ children }) => <span className="line-through">{children}</span>,
    code: ({ children }) => (
      <code className="px-1.5 py-0.5 rounded-md bg-[#F1F5F9] text-[#D96338] font-mono text-[13px]">
        {children}
      </code>
    ),
    link: ({ children, value }) => {
      const blank = value?.blank ?? true;
      return (
        <a
          href={value?.href}
          target={blank ? "_blank" : undefined}
          rel={blank ? "noopener noreferrer" : undefined}
          className="text-[#D96338] font-medium hover:text-[#C2542D] underline underline-offset-2"
        >
          {children}
        </a>
      );
    },
  },
  types: {
    image: ({ value }: { value: SanityImage & { caption?: string } }) => {
      const src = urlForImage(value, 1200);
      if (!src) return null;
      return (
        <figure className="my-6">
          <Image
            src={src}
            alt={value.alt || value.caption || ""}
            width={1200}
            height={675}
            className="w-full h-auto rounded-[12px] border border-[#E2E8F0]"
          />
          {value.caption && (
            <figcaption className="mt-2 text-sm text-[#64748B] text-center">{value.caption}</figcaption>
          )}
        </figure>
      );
    },
    codeBlock: ({ value }: { value: CodeBlockValue }) => (
      <div className="my-5 rounded-[12px] overflow-hidden border border-[#1E293B] bg-[#0F172A]">
        {value.filename && (
          <div className="px-4 py-2 text-xs font-mono text-[#94A3B8] border-b border-[#1E293B]">
            {value.filename}
          </div>
        )}
        <pre className="px-4 py-4 overflow-x-auto text-[13px] leading-relaxed text-[#E2E8F0]">
          <code>{value.code}</code>
        </pre>
      </div>
    ),
  },
};

interface LessonNotesProps {
  notes?: PortableTextBlock[];
}

export function LessonNotes({ notes }: LessonNotesProps) {
  if (!notes || notes.length === 0) return null;
  return (
    <div className="max-w-none">
      <PortableText value={notes} components={components} />
    </div>
  );
}
