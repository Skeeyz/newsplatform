import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { getSiteSettings } from "@/lib/api/news";

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const siteSettings = await getSiteSettings();

  return (
    <div className="w-full max-w-[970px] mx-auto min-h-screen flex flex-col">
      <Header settings={siteSettings.header} />
      <div className="flex-1">{children}</div>
      <Footer settings={siteSettings} />
    </div>
  );
}
