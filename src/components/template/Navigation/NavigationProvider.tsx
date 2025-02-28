"use client";

import { CommonProps } from "@/@types/common";
import { NavigationTree } from "@/@types/navigation";
import NavigationContext from "./NavigationContext";

interface NavigationProviderProps extends CommonProps {
  navigationTree: NavigationTree[];
}

const NavigationProvider = ({
  navigationTree,
  children,
}: NavigationProviderProps) => {
  return (
    <NavigationContext.Provider value={{ navigationTree }}>
      {children}
    </NavigationContext.Provider>
  );
};

export default NavigationProvider;
