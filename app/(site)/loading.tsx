import { Loader2 } from "lucide-react";

export default function SiteLoading() {
  return (
    <div className="w-full flex items-center justify-center py-20">
      <div className="flex flex-col items-center gap-3">
        <Loader2 className="h-8 w-8 animate-spin text-[#e24a48]" />
        <p className="text-sm text-gray-500 font-medium">Đang tải...</p>
      </div>
    </div>
  );
}
