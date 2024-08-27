"use client";
import { useRouter } from "next/navigation";

const SiteCard = ({ site }: { site: any }) => {
  const router = useRouter();
  return (
    <div
      className="bottom-0 flex h-60 cursor-pointer flex-col justify-end space-y-0.5 rounded border bg-gradient-to-t from-slate-100 to-slate-50 p-4 pt-12"
      onClick={() => router.push(`/dashboard/sites/${site.site_id}`)}
    >
      <h2>{site.name}</h2>
    </div>
  );
};

export default SiteCard;
