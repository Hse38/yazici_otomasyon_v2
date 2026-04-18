"use client";

import { useParams } from "next/navigation";
import { getServiceById, type ServiceId } from "../../../data/services";

function parseServiceId(raw: string | undefined): ServiceId | undefined {
  if (!raw) return undefined;
  return /^product-[1-6]$/.test(raw) ? (raw as ServiceId) : undefined;
}
import { ServiceDetailPage } from "../../../components/ServiceDetailPage";
import { useEffect, useState } from "react";

export default function ServicePage() {
  const params = useParams();
  const serviceId = parseServiceId(params?.id as string | undefined);
  const [lang, setLang] = useState<"tr" | "en">("tr");

  useEffect(() => {
    const stored = localStorage.getItem("lang");
    if (stored === "tr" || stored === "en") {
      setLang(stored);
      return;
    }
    // Default to Turkish if no preference stored
    setLang("tr");
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
