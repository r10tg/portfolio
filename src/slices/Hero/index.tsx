"use client";

import ThemeToogleButton from "@/components/ThemeToogleButton";
import { Content, KeyTextField } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { gsap } from "gsap";
import clsx from "clsx";
import { useEffect, useRef } from "react";
import Bounded from "@/components/Bounded";
import { Shapes } from "./Shapes";

/**
 * Props for `Hero`.
 */
export type HeroProps = SliceComponentProps<Content.HeroSlice>;

/**
 * Component for "Hero" Slices.
 */
const Hero = ({ slice }: HeroProps): JSX.Element => {
  const component = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline();

      tl.fromTo(
        ".name-animation",
        {
          x: -100,
          opacity: 0,
          rotate: -10,
        },
        {
          x: 0,
          opacity: 1,
          rotate: 0,
          ease: "elastic.out(1, 0.5)",
          duration: 1,
          transformOrigin: "left top",
          stagger: {
            each: 0.25,
            from: "random",
          },
        }
      );

      tl.fromTo(
        ".job-title-animation",
        {
          y: 20,
          opacity: 0,
          scale: 1.2,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          scale: 1,
          ease: "bounce.out",
        }
      );
    }, component);
    return () => ctx.revert();
  }, []);

  const renderLetters = (name: KeyTextField, key: String) => {
    if (!name) return;
    return name.split("").map((letter, index) => {
      return (
        <span
          key={index}
          className={`name-animation name-aimation-${key} inline-block opacity-0`}
        >
          {letter}
        </span>
      );
    });
  };

  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      ref={component}
    >
      <div className="grid min-h-[70vh] grid-cols-1 md:grid-cols-2 items-center">
        <Shapes />

        <div className="col-start-1 md:row-start-1">
          <h1
            className={clsx(
              "leading-none font-extrabold tracking-tighter mb-8 text-[clamp(3rem,20vmin,20rem)]"
            )}
            aria-label={`${slice.primary.firstname} ${slice.primary.lastname}`}
          >
            <span className={clsx("block ")}>
              {" "}
              {renderLetters(slice.primary.firstname, "first")}{" "}
            </span>
            <span className={clsx("-mt-[.2em] block ")}>
              {" "}
              {renderLetters(slice.primary.lastname, "last")}{" "}
            </span>
          </h1>
          <span
            className={clsx(
              "block job-title-animation bg-gradient-to-tr from-orange-500 via-orange-200 to-orange-500 dark:from-yellow-500 dark:via-yellow-200 dark:to-yellow-500 bg-clip-text text-2xl uppercase font-bold tracking-[.2em] opacity-0 text-transparent md:text-4xl"
            )}
          >
            {" "}
            {slice.primary.tagline}{" "}
          </span>
        </div>
      </div>
    </Bounded>
  );
};

export default Hero;
