import Avatar from "@/components/about/Avatar";
import Bounded from "@/components/Bounded";
import Button from "@/components/ui/Button";
import Heading from "@/components/ui/Heading";
import { Content } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import clsx from "clsx";

/**
 * Props for `About`.
 */
export type AboutProps = SliceComponentProps<Content.AboutSlice>;

/**
 * Component for "About" Slices.
 */
const About = ({ slice }: AboutProps): JSX.Element => {
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <div className="grid gap-x-8 gap-y-6 md:grid-cols[2fr_1fr]">
        <Heading size="xl" as="h1" className={clsx("col-start-1")}>
          {" "}
          {slice.primary.heading}{" "}
        </Heading>
        <div className="prose prose-xl prose-slate dark:prose-invert col-start-1">
          <PrismicRichText field={slice.primary.description} />
        </div>
        <div className="text-slate-900 dark:border-black">
          <Button
            linkField={slice.primary.button_link}
            label={slice.primary.button_text}
          />
        </div>
        <Avatar
          image={slice.primary.avatar}
          className={clsx("max-w-sm row-start-1 md:col-start-2 md:row-end-3")}
        />
      </div>
    </Bounded>
  );
};

export default About;
