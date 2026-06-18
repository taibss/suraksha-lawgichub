import Link from "next/link";
import Script from "next/script";
import ReactMarkdown from "react-markdown";
import { notFound } from "next/navigation";
import { BLOG_POSTS } from "@/data/blog";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);
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
  const post = BLOG_POSTS.find((p) => p.slug === slug);
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

      <section className="bg-ink text-ink-foreground">
        <div className="mx-auto max-w-3xl px-5 py-10">
          <span className="inline-block rounded-full bg-lime px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-lime-foreground">
            {post.categoryLabel}
          </span>
          <h1 className="mt-4 font-display text-[clamp(2rem,5vw,3.5rem)] font-extrabold leading-tight tracking-tight">
            {post.title}
          </h1>
          <p className="mt-3 text-lg text-ink-foreground/80">
            {post.excerpt}
          </p>
          <div className="mt-4 flex items-center gap-4 text-xs text-lime">
            <span>{post.date}</span>
            <span>{post.readTime}</span>
          </div>
        </div>
      </section>

      <section className="bg-background">
        <div className="mx-auto max-w-2xl px-5 py-12">
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

          <div className="mt-10 rounded-2xl bg-primary p-6 text-white">
            <p className="font-display font-bold text-lg">Got caught in this?</p>
            <p className="mt-1 text-sm text-white/80">Get your personal action plan — free, instant.</p>
            <Link
              href="/help"
              className="mt-4 inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-bold text-primary"
            >
              Get my action plan →
            </Link>
          </div>

          <Link href="/blog" className="mt-8 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
            ← Back to Blog
          </Link>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
