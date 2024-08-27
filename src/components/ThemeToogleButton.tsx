"use client";

import React, { useEffect, useState } from "react";
import clsx from "clsx";
import { SunIcon, MoonIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";
import { Switch } from "./ui/switch";

const ThemeToggleButton = () => {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div>Loading...</div>;
  }

  const isDark = resolvedTheme === "dark";

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark");
  };

  return (
    <div>
      <Switch
        checked={isDark}
        onCheckedChange={toggleTheme}
        className={clsx("w-20 h-8 ")}
      />
    </div>
  );
};

export default ThemeToggleButton;
