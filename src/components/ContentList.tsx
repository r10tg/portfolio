"use client";

import { asImageSrc, Content, isFilled } from "@prismicio/client";
import clsx from "clsx";
import { gsap } from "gsap";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MdArrowOutward } from "react-icons/md";

gsap.registerPlugin(ScrollTrigger);

type ContentListProps = {
  items: Content.BlogPostsDocument[] | Content.ProjectDocument[];
  contentType: Content.ContentIndexSlice["primary"]["content_type"];
  fallbackImage: Content.ContentIndexSlice["primary"]["fall_back_image"];
  viewMoreText: Content.ContentIndexSlice["primary"]["view_more_text"];
};

const ContentList = ({
  items,
  contentType,
  fallbackImage,
  viewMoreText,
}: ContentListProps) => {
  const urlPrefix = contentType === "Blog" ? "/blog" : "/project";

  const component = useRef(null);
  const itemsRef = useRef<Array<HTMLLIElement | null>>([]);
  const lastMousePos = useRef({ x: 0, y: 0 });
  const revealRef = useRef(null);
  const [currentItem, setCurrentItem] = useState<null | number>(null);

  const contentImages = items.map((item) => {
    const image = isFilled.image(item.data.hover_image)
      ? item.data.hover_image
      : fallbackImage;

    return asImageSrc(image, {
      fit: "crop",
      w: 220,
      h: 320,
      exp: -10,
    });
  });

  //   useeffect for rendering list

  useEffect(() => {
    let ctx = gsap.context(() => {
      itemsRef.current.forEach((item) => {
        gsap.fromTo(
          item,
          {
            opacity: 0,
            y: 20,
          },
          {
            opacity: 1,
            y: 0,
            duration: 1.3,
            ease: "elastic.out(1,0.3)",
            scrollTrigger: {
              trigger: item,
              start: "top bottom-=100px",
              end: "bottom center",
              toggleActions: "play none none none",
            },
          }
        );
      });
    }, component);
  }, []);

  //   useeffect hook to track mouse movement
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const mousePos = { x: e.clientX, y: e.clientY + window.scrollY };

      const speed = Math.sqrt(Math.pow(mousePos.x - lastMousePos.current.x, 2));

      let ctx = gsap.context(() => {
        if (currentItem !== null) {
          const maxY = window.scrollY + window.innerHeight - 350;
          const maxX = window.scrollX + window.innerWidth - 220;

          gsap.to(revealRef.current, {
            x: gsap.utils.clamp(0, maxX, mousePos.x - 110),
            y: gsap.utils.clamp(0, maxY, mousePos.y - 160),
            rotation: speed * (mousePos.x > lastMousePos.current.x ? 1 : -1),
            ease: "back.out(2)",
            duration: 1.3,
            opacity: 1,
          });
        }
        lastMousePos.current = mousePos;

        return () => ctx.revert();
      }, component);
    };
    console.log("mousePos is: ", lastMousePos.current);
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [currentItem]);

  //   useeffect to preload image
  useEffect(() => {
    contentImages.forEach((url) => {
      if (!url) return;
      const img = new Image();
      img.src = url;
    });
  }, []);

  return (
    <>
      <ul
        ref={component}
        className={clsx(
          " grid border-b border-slate-800 dark:border-slate-100 "
        )}
        onMouseLeave={() => setCurrentItem(null)}
      >
        {items.map((item, index) => (
          <li
            key={index}
            ref={(el: any) => (itemsRef.current[index] = el)}
            className={clsx("list-item opacity-0")}
            onMouseEnter={() => setCurrentItem(index)}
          >
            <Link
              href={`${urlPrefix}/${item.uid}`}
              className={clsx(
                "flex flex-col justify-between border-t border-slate-800 dark:border-slate-100 py-10 md:flex-row"
              )}
            >
              <div className={clsx(" flex flex-col ")}>
                <span className="text-3xl font-bold">{item.data.title}</span>
                <div className="flex gap-3 text-yellow-400 ">
                  {item.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="text-lg font-semibold overflow-hidden"
                    >
                      {" "}
                      {tag}{" "}
                    </span>
                  ))}
                </div>
              </div>
              <span className="flex ml-auto items-center gap-2 text-2xl font-medium md:ml-0">
                {" "}
                {viewMoreText} <MdArrowOutward />
              </span>
            </Link>
          </li>
        ))}
      </ul>

      {/* hover element */}

      <div
        ref={revealRef}
        className="hover-reveal pointer-events-none absolute left-0 top-0 -z-10  h-[320px] w-[220px] rounded-lg bg-cover bg-center opacity-0 transition-[background] duration-300"
        style={{
          backgroundImage:
            currentItem !== null ? `url(${contentImages[currentItem]})` : "",
        }}
      ></div>
    </>
  );
};

export default ContentList;
