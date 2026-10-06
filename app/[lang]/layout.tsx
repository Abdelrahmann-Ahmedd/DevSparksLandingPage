import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { SkipLink } from "@/components/layout/skip-link";
import { getDictionary, requireLocale } from "@/lib/dictionary";
import { localeMeta, locales } from "@/lib/i18n";
import { siteConfig } from "@/lib/site";
import type { Metadata } from "next";
import { Cairo, Geist, Geist_Mono } from "next/font/google";
import "../globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic", "latin"],
});

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  const locale = requireLocale(lang);
  const dictionary = getDictionary(locale);
  const path = `/${locale}`;

  return {
    metadataBase: new URL(siteConfig.url),
    title: {
      default: dictionary.meta.title,
      template: `%s | ${siteConfig.name}`,
    },
    description: dictionary.meta.description,
    keywords: dictionary.meta.keywords.split(", "),
    alternates: {
      canonical: path,
      languages: {
        en: "/en",
        ar: "/ar",
        "x-default": "/en",
      },
    },
    openGraph: {
      type: "website",
      locale: localeMeta[locale].htmlLang,
      url: path,
      siteName: siteConfig.name,
      title: dictionary.meta.ogTitle,
      description: dictionary.meta.ogDescription,
    },
    twitter: {
      card: "summary_large_image",
      title: dictionary.meta.ogTitle,
      description: dictionary.meta.ogDescription,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function RootLayout({
  children,
  params,
}: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  const locale = requireLocale(lang);
  const dictionary = getDictionary(locale);
  const { dir, htmlLang } = localeMeta[locale];
  const fontClass =
    locale === "ar" ? cairo.variable : `${geistSans.variable} ${geistMono.variable} ${cairo.variable}`;

  return (
    <html
      lang={htmlLang}
      dir={dir}
      className={`${fontClass} h-full antialiased`}
    >
      <body
        className={`min-h-full flex flex-col ${locale === "ar" ? "font-[family-name:var(--font-cairo)]" : "font-sans"}`}
      >
        <SkipLink dictionary={dictionary} />
        <SiteHeader locale={locale} dictionary={dictionary} />
        {children}
        <SiteFooter locale={locale} dictionary={dictionary} />
      </body>
    </html>
  );
}
