"use client";

import Heading from "@/components/ui/Heading";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { MdCircle } from "react-icons/md";
import clsx from "clsx";
import React, { useEffect, useRef } from "react";
import Bounded from "@/components/Bounded";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Props for `Techlist`.
 */
export type TechlistProps = SliceComponentProps<Content.TechlistSlice>;

/**
 * Component for "Techlist" Slices.
 */
const Techlist = ({ slice }: TechlistProps): JSX.Element => {
  const component = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: component.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 4,
        },
      });

      tl.fromTo(
        ".tech-row",
        {
          x: (index) => {
            return index % 2 === 0
              ? gsap.utils.random(400, 200)
              : gsap.utils.random(-400, -200);
          },
        },
        {
          x: (index) => {
            return index % 2 === 0
              ? gsap.utils.random(-400, -200)
              : gsap.utils.random(400, 200);
          },
          ease: "power1.inOut",
        }
      );
    }, component);

    return () => ctx.revert();
  }, []);

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="overflow-hidden"
      ref={component}
    >
      <Bounded as="div">
        <Heading size="xl" className="mb-8" as="h2">
          {slice.primary.heading}
        </Heading>
      </Bounded>
      {slice.primary.techs.map(({ tech_name, tech_color }, index) => (
        <div
          key={index}
          className="tech-row mb-8 flex items-center justify-center gap-4 text-slate-700 "
          aria-label={tech_name || ""}
        >
          {Array.from({ length: 15 }, (_, index) => (
            <React.Fragment key={index}>
              <span
                className={clsx(
                  "tech-item text-5xl font-extrabold uppercase tracking-tighter "
                )}
                style={{
                  color: index === 7 && tech_color ? tech_color : "inherit",
                }}
              >
                {tech_name}
              </span>
              <span className="text-3xl">
                <MdCircle />
              </span>
            </React.Fragment>
          ))}
        </div>
      ))}
    </section>
  );
};

export default Techlist;
