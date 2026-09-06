import type { Metadata } from "next";
import type { ReactNode } from "react";
import localFont from "next/font/local";
import "./globals.css";
import SiteHeader, { ThemeProvider } from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import ScrollFX from "@/components/scroll-fx";
import { I18nProvider } from "@/i18n";

const instagramSansScript = localFont({
  src: [
    {
      path: "../../fonts/instagram-sans-script/Instagram Sans Script.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../fonts/instagram-sans-script/Instagram Sans Script Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-instagram-script",
  display: "swap",
});

const elMessiri = localFont({
  src: [
    {
      path: "../../public/fonts/El_Messiri/ElMessiri-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/El_Messiri/ElMessiri-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/El_Messiri/ElMessiri-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../public/fonts/El_Messiri/ElMessiri-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-el-messiri",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://inclass.app"),
  title: {
    default: "INCLASS — Cours particuliers au Maroc, à domicile et en ligne",
    template: "%s · INCLASS",
  },
  description:
    "INCLASS met en relation élèves, parents et professeurs vérifiés partout au Maroc. Maths, physique, langues, soutien scolaire : trouve ton prof en 2 minutes.",
  openGraph: {
    title: "INCLASS — Cours particuliers au Maroc",
    description:
      "La marketplace marocaine du cours particulier : profs vérifiés, à domicile ou en ligne.",
    locale: "fr_MA",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="fr"
      className={`${instagramSansScript.variable} ${elMessiri.variable}`}
      suppressHydrationWarning
    >
      <body className="bg-cream text-ink antialiased transition-colors duration-200 dark:bg-ink-900 dark:text-white">
        <script
          id="theme-and-i18n-init"
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  /* Theme Init */
                  var storedTheme = localStorage.getItem('theme');
                  if (storedTheme === 'dark' || (!storedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }

                  /* Locale & RTL Init */
                  var storedLocale = localStorage.getItem('inclass_locale');
                  if (storedLocale === 'ar') {
                    document.documentElement.lang = 'ar';
                    document.documentElement.dir = 'rtl';
                    document.documentElement.classList.add('rtl');
                  } else if (storedLocale) {
                    document.documentElement.lang = storedLocale;
                    document.documentElement.dir = 'ltr';
                    document.documentElement.classList.remove('rtl');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
        <ThemeProvider>
          <I18nProvider>
            <ScrollFX />
            <SiteHeader />
            <main>{children}</main>
            <SiteFooter />
          </I18nProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
