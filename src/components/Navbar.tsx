"use client";

import { asLink, Content, KeyTextField } from "@prismicio/client";
import { PrismicNextLink } from "@prismicio/next";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { MdClose, MdMenu } from "react-icons/md";
import Button from "./ui/Button";
import ThemeToggleButton from "./ThemeToogleButton";

const Navbar = ({ settings }: { settings: Content.SettingsDocument }) => {
  const [open, setOpen] = useState(false);
  const pathName = usePathname();

  const NameLogo = ({ name }: { name: KeyTextField }) => {
    return (
      <Link
        href="/"
        aria-label="Home Page"
        className={clsx(
          "text-xl font-extrabold tracking-tighter text-slate-200 dark:text-slate-900"
        )}
      >
        {name}
      </Link>
    );
  };

  return (
    <nav aria-label="Main Navigation">
      <ul
        className={clsx(
          " flex flex-col justify-between rounded-b-lg bg-slate-800 dark:bg-slate-50 py-2 px-4 md:m-4 md:flex-row md:items-center md:rounded-xl "
        )}
      >
        <div className={clsx("flex items-center justify-between")}>
          <NameLogo name={settings.data.name} />
        </div>
        <button
          aria-expanded={open}
          aria-label="Open Menu"
          onClick={() => setOpen(true)}
          className={clsx(
            "block p-2 text-2xl text-slate-200 dark:text-slate-800 md:hiddenf "
          )}
        >
          <MdMenu />
        </button>
        <div
          className={clsx(
            " flex flex-col fixed top-0 right-0 left-0 bottom-0 z-50 items-end gap-4 pr-4 pt-14 transition-transform duration-300 ease-in-out md:hiddenf ",
            open ? "translate-x-0" : "translate-x-[100%]"
          )}
        >
          <button
            aria-label="Close Menu"
            aria-expanded={open}
            onClick={() => setOpen(false)}
            className="fixed right-4 top-3 block text-2xl p-2 text-slate-200 dark:text-slate-800"
          >
            <MdClose />
          </button>
          {settings.data.nav_items.map(({ link, label }, index) => (
            <React.Fragment key={index}>
              <PrismicNextLink
                field={link}
                onClick={() => setOpen(false)}
                className={clsx(
                  "group relative block overflow-hidden rounded px-3 text-3xl font-bold text-slate-200 dark:text-slate-800"
                )}
              >
                <span
                  className={clsx(
                    "absolute inset-0 h-full translate-y-12 rounded bg-yellow-300 z-0 duration-300 transition-transform ease-in-out group-hover:translate-y-0 ",
                    pathName.includes(asLink(link) as string)
                      ? "translate-y-6"
                      : "translate-y-18"
                  )}
                ></span>
                <span className="relative">{label}</span>
                {index < settings.data.nav_items.length - 1 && (
                  <span
                    className={clsx(
                      "hidden text-3xl font-thin leading-[0] text-slate-400 md:inline"
                    )}
                    aria-hidden="true"
                  >
                    /
                  </span>
                )}
              </PrismicNextLink>
            </React.Fragment>
          ))}

          <li>
            <Button
              linkField={settings.data.cta_link}
              label={settings.data.cta_label}
              className="ml-3"
            />
          </li>

          <li>
            <ThemeToggleButton />
          </li>
        </div>
      </ul>
    </nav>
  );
};

export default Navbar;
