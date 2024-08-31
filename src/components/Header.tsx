import React from "react";
import { createClient } from "@/prismicio";
import Link from "next/link";
import { PrismicLink } from "@prismicio/react";
import ThemeToggleButton from "./ThemeToogleButton";
import Navbar from "./Navbar";

export default async function Header() {
  const client = createClient();
  const setting = await client.getSingle("settings");

  return (
    <header className="top-0 z-50 mx-auto max-w-7xl md:sticky md:top-4">
      <Navbar settings={setting} />
    </header>
  );
}
