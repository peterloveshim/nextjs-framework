"use client";

import { useState } from "react";

import { Theme } from "@/@types/theme";
import type { CommonProps } from "@/@types/common";

import { setTheme as setThemeCookies } from "@/server/actions/theme";

import ConfigProvider from "@/components/ui/ConfigProvider/ConfigProvider";

import appConfig from "@/configs/app.config";

import applyTheme from "@/utils/applyThemeSchema";

import ThemeContext from "./ThemeContext";
import presetThemeSchemaConfig from "@/configs/preset-theme-schema.config";

interface ThemeProviderProps extends CommonProps {
  theme: Theme;
  locale?: string;
}

const ThemeProvider = ({ children, theme, locale }: ThemeProviderProps) => {
  const [themeState, setThemeState] = useState<Theme>(theme);

  const handleSetTheme = async (payload: (param: Theme) => Theme | Theme) => {
    const setTheme = async (theme: Theme) => {
      setThemeState(theme);
      await setThemeCookies(JSON.stringify({ state: theme }));
    };

    if (typeof payload === "function") {
      const nextTheme = payload(themeState);
      await setTheme(nextTheme);
    } else {
      await setTheme(payload);
    }
  };

  return (
    <ThemeContext.Provider
      value={{
        theme: themeState,
        setTheme: handleSetTheme,
      }}
    >
      <ConfigProvider
        value={{
          ...theme,
          locale: locale || appConfig.locale,
        }}
      >
        {children}
      </ConfigProvider>
      <script
        suppressContentEditableWarning
        dangerouslySetInnerHTML={{
          __html: `(${applyTheme.toString()})(${JSON.stringify([
            theme.themeSchema || "default",
            theme.mode,
            presetThemeSchemaConfig,
          ]).slice(1, -1)})`,
        }}
      />
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
