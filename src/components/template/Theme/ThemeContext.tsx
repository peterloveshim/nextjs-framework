"use client";

import { createContext } from "react";

import { Theme } from "@/@types/theme";

import { themeConfig } from "@/configs/theme.config";

type Props = {
  theme: Theme;
  setTheme: (fn: (param: Theme) => Theme | Theme) => void;
};

const ThemeContext = createContext<Props>({
  theme: themeConfig,
  setTheme: () => {},
});

export default ThemeContext;
