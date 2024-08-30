import React from "react";
import { createClient } from "@/prismicio";
import Link from "next/link";
import { PrismicLink } from "@prismicio/react";
import ThemeToggleButton from "./ThemeToogleButton";

export default async function Header() {
  const client = createClient();
  const setting = await client.getSingle("settings");

  return (
    <header className="top-0 z-50 mx-auto max-w-7xl md:sticky md:top-4">
      <nav>
        <ul>
          <li>
            <Link href="/" aria-label="Home Page">
              {setting.data.name}
            </Link>
          </li>
          {setting.data.nav_items.map(({ link, label }) => (
            <li key={label}>
              <PrismicLink field={link}>{label}</PrismicLink>
            </li>
          ))}
          <li></li>
        </ul>
        <ThemeToggleButton />
      </nav>
    </header>
  );
}
