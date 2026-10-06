export const siteConfig = {
  name: "DevSparks",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://devsparks.dev",
  email: "academydevsparks@gmail.com",
  phone: "01039211576",
  address: {
    en: "Remote-first · Cohorts in GMT+3 and PST",
    ar: "تعلم عن بُعد · مجموعات بتوقيت الخليج وبتوقيت المحيط الهادئ",
  },
} as const;
