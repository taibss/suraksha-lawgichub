import Link from "next/link";
import Script from "next/script";
import ReactMarkdown from "react-markdown";
import { notFound } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import type { Metadata } from "next";

async function getPost(slug: string) {
  const { data } = await supabase
    .from("blog_posts")
    .select("slug, title, excerpt, category, category_label, read_time, date, featured, content")
    .eq("slug", slug)
    .single();

  if (!data) return null;
  return { ...data, categoryLabel: data.category_label, readTime: data.read_time };
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return { title: "Blog — Suraksha" };

  const url = `https://dem0-suraksha.mukadamtaiba.workers.dev/blog/${post.slug}`;

  return {
    title: `${post.title} — Suraksha`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url,
      type: "article",
    },
    alternates: {
      canonical: url,
    },
  };
}

function getCategoryColor(category: string): string {
  const colors: Record<string, string> = {
    prevention: "#84cc16",
    legal: "#7c3aed",
    story: "#1a1a1a",
    "legal-tech": "#51C3DD",
    "practice-guide": "#a855f7",
    "case-study": "#f59e0b",
  };
  return colors[category] ?? "#71717a";
}

function getCategoryTextColor(category: string): string {
  const colors: Record<string, string> = {
    "legal-tech": "#3f22ec",
  };
  return colors[category] ?? "#F1FF0Afff";
}

function extractFaqItems(content: string): { question: string; answer: string }[] {
  const lines = content.split("\n");
  const items: { question: string; answer: string }[] = [];
  let inFaq = false;
  let currentQuestion = "";
  let currentAnswer = "";

  for (const line of lines) {
    const trimmed = line.trim();

    if (trimmed === "## FAQ" || trimmed === "## FAQs") {
      inFaq = true;
      continue;
    }

    if (trimmed === "---" || trimmed.startsWith("## ")) {
      if (inFaq && currentQuestion && currentAnswer) {
        items.push({ question: currentQuestion, answer: currentAnswer.trim() });
      }
      inFaq = false;
      currentQuestion = "";
      currentAnswer = "";
      continue;
    }

    if (inFaq) {
      if (trimmed.startsWith("**") && trimmed.includes("**")) {
        if (currentQuestion && currentAnswer) {
          items.push({ question: currentQuestion, answer: currentAnswer.trim() });
        }
        currentQuestion = trimmed.replace(/\*\*/g, "").replace(/\?$/, "").trim() + "?";
        currentAnswer = "";
      } else if (trimmed) {
        currentAnswer += (currentAnswer ? " " : "") + trimmed;
      }
    }
  }

  if (inFaq && currentQuestion && currentAnswer) {
    items.push({ question: currentQuestion, answer: currentAnswer.trim() });
  }

  return items;
}


export default async function BlogArticle({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  const url = `https://dem0-suraksha.mukadamtaiba.workers.dev/blog/${post.slug}`;
  const faqItems = extractFaqItems(post.content);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    publisher: {
      "@type": "Organization",
      name: "Suraksha by LawgicHub",
    },
  };

  const faqSchema = faqItems.length > 0
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqItems.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer,
          },
        })),
      }
    : null;

  return (
    <div className="min-h-screen">
      <Script
        id="article-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      {faqSchema && (
        <Script
          id="faq-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      <SiteHeader />

      <section style={{ backgroundColor: "#AEF5E5" }}>
        <div className="mx-auto max-w-3xl px-5 py-10">
          <span
            className="inline-block rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-widest"
            style={{ backgroundColor: getCategoryColor(post.category), color: getCategoryTextColor(post.category) }}
          >
            {post.categoryLabel}
          </span>
          <h1 className="mt-4 font-display text-[clamp(1.25rem,3vw,1.75rem)] font-extrabold leading-tight tracking-tight" style={{ color: "#000" }}>
            {post.title}
          </h1>
          <p className="mt-3 text-lg" style={{ color: "#000", opacity: 0.8 }}>
            {post.excerpt}
          </p>
          <div className="mt-4 flex items-center gap-4 text-xs" style={{ color: "#000", opacity: 0.6 }}>
            <span>{post.date}</span>
            <span>{post.readTime}</span>
          </div>
        </div>
      </section>

      <section className="bg-background">
        <div className="mx-auto max-w-3xl px-5 py-12 lg:mx-auto">
          <div className="rounded-2xl border border-border bg-card p-6 shadow-[4px_4px_0_0_var(--foreground)] sm:p-8 lg:p-10">
            <div className="prose prose-lg max-w-none">
            <ReactMarkdown
              components={{
                h2: ({children}) => <h2 className="text-xl font-bold mt-8 mb-3 text-gray-900">{children}</h2>,
                p: ({children}) => <p className="mb-5 leading-relaxed text-gray-700">{children}</p>,
                strong: ({children}) => <strong className="font-semibold text-gray-900">{children}</strong>,
                a: ({href, children}) => <a href={href} className="text-blue-600 underline" target="_blank">{children}</a>,
              }}
            >
              {post.content}
            </ReactMarkdown>
            </div>
          </div>

          <section className="bg-background">
            <div className="mx-auto max-w-6xl px-5 py-10 flex flex-col items-center text-center gap-2">
              <p className="text-sm font-semibold text-foreground">Got caught in this?</p>
              <p className="text-sm text-muted-foreground">Get your personal action plan — free, instant.</p>
              <Link
                href="/help"
                className="mt-2 inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-bold text-white shadow-[0_4px_12px_rgba(26,58,143,0.4)]"
                style={{ backgroundColor: "#1a3a8f" }}
              >
                Get my action plan →
              </Link>
            </div>
          </section>

          <Link href="/blog" className="mt-8 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
            ← Back to Blog
          </Link>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
