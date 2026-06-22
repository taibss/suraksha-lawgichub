import type { MetadataRoute } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL ?? BASE_URL}/api/blog?action=slugs`, { cache: "no-store" });
  const data = await res.json();

  const staticPages = [
    { url: `${BASE_URL}/blog`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.8 },
    { url: `${BASE_URL}/scams`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.8 },
    { url: `${BASE_URL}/advocate`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.7 },
  ];

  const blogPages = (data as { slug: string }[] ?? []).map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.9,
  }));

  return [...staticPages, ...blogPages];
}
