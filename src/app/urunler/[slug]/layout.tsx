import type { Metadata } from "next";
import type { ReactNode } from "react";
import { buildServiceMetadata } from "../../services/[id]/metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  return buildServiceMetadata({ slug }, "tr");
}

export default function ProductDetailLayout({ children }: { children: ReactNode }) {
  return children;
}
