import pageMetaConfig from "@/configs/page-meta.config";

import ThemeProvider from "@/components/template/Theme/ThemeProvider";
import NavigationProvider from "@/components/template/Navigation/NavigationProvider";

import { getTheme } from "@/server/actions/theme";
import { getNavigation } from "@/server/actions/navigation/getNavigation";

import "./globals.css";

export const metadata = {
  ...pageMetaConfig,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const navigationTree = await getNavigation();

  const theme = await getTheme();

  return (
    <html
      className={theme.mode === "dark" ? "dark" : "light"}
      dir={theme.direction}
      suppressHydrationWarning
    >
      <body suppressHydrationWarning>
        <ThemeProvider theme={theme}>
          <NavigationProvider navigationTree={navigationTree}>
            {children}
          </NavigationProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
