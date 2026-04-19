import type { Metadata } from "next";
import type { ReactNode } from "react";
import { buildServiceMetadata } from "./metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  return buildServiceMetadata({ id }, "tr");
}

export default function ServiceDetailLayout({ children }: { children: ReactNode }) {
  return children;
}
