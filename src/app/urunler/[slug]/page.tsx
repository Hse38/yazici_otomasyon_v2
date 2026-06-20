"use client";

import { useParams } from "next/navigation";
import { getServiceById } from "../../../data/services";
import { resolveServiceIdFromParam } from "../../../lib/seo";
import { ServiceDetailPage } from "../../../components/ServiceDetailPage";
import { useEffect, useState } from "react";

export default function ProductPage() {
  const params = useParams();
  const serviceId = resolveServiceIdFromParam(params?.slug as string | undefined);
  const [lang, setLang] = useState<"tr" | "en">("tr");

  useEffect(() => {
    const stored = localStorage.getItem("lang");
    if (stored === "tr" || stored === "en") {
      setLang(stored);
      document.documentElement.lang = stored;
      return;
    }
    setLang("tr");
    document.documentElement.lang = "tr";
  }, []);

  const service = serviceId ? getServiceById(serviceId) : undefined;

  if (!service) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-dark">Ürün bulunamadı</h1>
          <p className="mt-2 text-dark/70">Aradığınız ürün sayfası bulunamadı.</p>
        </div>
      </div>
    );
  }

  return <ServiceDetailPage service={service} language={lang} />;
}
