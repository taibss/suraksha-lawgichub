import type { MetadataRoute } from "next";
import { BLOG_POSTS } from "@/data/blog";

const BASE_URL = "https://dem0-suraksha.mukadamtaiba.workers.dev";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    { url: `${BASE_URL}/blog`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.8 },
    { url: `${BASE_URL}/scams`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.8 },
    { url: `${BASE_URL}/advocate`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.7 },
  ];

  const blogPages = BLOG_POSTS.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.9,
  }));

  return [...staticPages, ...blogPages];
}
