// components/heroicon.tsx
import React from "react";
import * as HeroSolid from "react-native-heroicons/solid";

type HeroIconName = keyof typeof HeroSolid;

interface Props {
  name: HeroIconName;
  size?: number;
  color?: string;
}

export function HeroIcon({ name, size = 24, color = "black" }: Props) {
  const IconComponent = HeroSolid[name] as React.ComponentType<{
    size?: number;
    color?: string;
  }>;

  if (!IconComponent) return null;
  return <IconComponent size={size} color={color} />;
}