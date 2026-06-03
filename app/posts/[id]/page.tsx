import Link from "next/link";
import { notFound } from "next/navigation";
import { getOrGenerateArticle } from "@/lib/mockData";
import { Clock } from "lucide-react";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function PostDetailPage({ params }: PageProps) {
  const { id } = await params;
  const article = getOrGenerateArticle(id);

  if (!article) {
    notFound();
  }

  return (
    <main className="w-full px-3 md:px-4 py-4 font-sans text-xs">
      {/* Top Banner Advertisement (QC 970x250) */}
      <div className="relative w-full max-w-[970px] mx-auto overflow-hidden rounded border border-gray-200 mb-5 bg-gray-50 group shadow-sm aspect-[970/250]">
        <a href="#" className="block w-full h-full">
          <img
            src="/qc_970_250.svg"
            alt="Quảng cáo 970x250"
            className="w-full h-full object-cover"
          />
        </a>
        <div className="absolute top-1 right-1 bg-black/40 hover:bg-black/70 text-white/90 text-[9px] px-1.5 py-0.5 cursor-pointer rounded select-none z-10 transition-colors">
          Quảng cáo &times;
        </div>
      </div>

      {/* Main Two-Column Content Layout */}
      <div className="flex flex-col lg:flex-row gap-5 items-start">
        {/* Left Column: Post Content (Width matches GameK desktop 650px) */}
        <article className="w-full lg:w-[650px] flex-shrink-0 bg-white border border-gray-200 p-4 sm:p-5 rounded-sm shadow-sm">
          {/* Metadata: Category & Date Time */}
          <div className="flex items-center gap-1.5 text-gray-500 font-semibold mb-2">
            <span className="text-brand-red font-bold uppercase tracking-wide text-[11px]">
              {article.category}
            </span>
            <span className="text-gray-300">&#8226;</span>
            <span className="text-[11px]">{article.time.split(" ")[0]}</span>
            {article.time.includes(" ") && (
              <>
                <Clock size={11} className="text-gray-400 ml-1.5" />
                <span className="text-[11px] font-normal">{article.time.split(" ")[1]}</span>
              </>
            )}
          </div>

          {/* Title */}
          <h1 className="text-gray-900 font-bold text-lg sm:text-xl md:text-2xl leading-snug tracking-tight mb-4 font-sans">
            {article.title}
          </h1>

          {/* Thin horizontal divider */}
          <hr className="border-gray-200 my-4" />

          {/* Bold Intro Paragraph */}
          {article.intro && (
            <p className="text-gray-900 font-bold text-xs sm:text-[13px] leading-relaxed mb-4">
              {article.intro}
            </p>
          )}

          {/* Content Blocks */}
          <div className="space-y-4 text-xs sm:text-[13px] text-gray-800 leading-relaxed">
            {article.content?.map((block, index) => {
              if (block.type === "paragraph") {
                return (
                  <p key={index} className="text-gray-700 font-sans">
                    {block.text}
                  </p>
                );
              } else if (block.type === "bold-paragraph") {
                return (
                  <p key={index} className="font-bold text-gray-900 font-sans">
                    {block.text}
                  </p>
                );
              } else if (block.type === "image") {
                return (
                  <div key={index} className="my-4 space-y-1.5">
                    <div className="border border-gray-200 overflow-hidden bg-gray-50 rounded-sm">
                      <img
                        src={block.src}
                        alt={block.caption || "Hình ảnh bài viết"}
                        className="w-full h-auto object-cover max-h-[500px] mx-auto"
                        loading="lazy"
                      />
                    </div>
                    {block.caption && (
                      <p className="text-gray-500 text-[11px] italic text-center px-4 leading-normal font-sans">
                        {block.caption}
                      </p>
                    )}
                  </div>
                );
              } else if (block.type === "ad") {
                return (
                  <div key={index} className="relative w-full overflow-hidden rounded border border-gray-200 bg-gray-50 flex justify-center group shadow-sm my-5 aspect-[650/300]">
                    <a href="#" className="block w-full h-full">
                      <img
                        src="/qc_650_300.svg"
                        alt="Quảng cáo 650x300"
                        className="w-full h-full object-cover"
                      />
                    </a>
                    <div className="absolute top-1 right-1 bg-black/45 hover:bg-black/75 text-white/90 text-[9px] px-1.5 py-0.5 cursor-pointer rounded select-none z-10 transition-colors">
                      Quảng cáo &times;
                    </div>
                  </div>
                );
              }
              return null;
            })}
          </div>
        </article>

        {/* Right Column: Sidebar (Width matches GameK desktop 310px) */}
        {/* Sticky sidebar behavior applied using lg:sticky lg:top-4 */}
        <aside className="w-full lg:w-[310px] flex-shrink-0 lg:sticky lg:top-4 space-y-4">
          {/* Ad 1: QC 300x600 */}
          <div className="relative w-full overflow-hidden rounded border border-gray-200 bg-gray-50 flex justify-center group shadow-sm aspect-[300/600]">
            <a href="#" className="block w-full h-full">
              <img
                src="/qc_300_600.svg"
                alt="Quảng cáo 300x600"
                className="w-full h-full object-cover"
              />
            </a>
            <div className="absolute top-1 right-1 bg-black/45 hover:bg-black/75 text-white/90 text-[9px] px-1.5 py-0.5 cursor-pointer rounded select-none z-10 transition-colors">
              Quảng cáo &times;
            </div>
          </div>

          {/* Ad 2: QC 300x600 */}
          <div className="relative w-full overflow-hidden rounded border border-gray-200 bg-gray-50 flex justify-center group shadow-sm aspect-[300/600]">
            <a href="#" className="block w-full h-full">
              <img
                src="/qc_300_600.svg"
                alt="Quảng cáo 300x600"
                className="w-full h-full object-cover"
              />
            </a>
            <div className="absolute top-1 right-1 bg-black/45 hover:bg-black/75 text-white/90 text-[9px] px-1.5 py-0.5 cursor-pointer rounded select-none z-10 transition-colors">
              Quảng cáo &times;
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}
