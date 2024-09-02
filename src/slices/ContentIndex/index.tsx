import Bounded from "@/components/Bounded";
import ContentList from "@/components/ContentList";
import Heading from "@/components/ui/Heading";
import { createClient } from "@/prismicio";
import { Content, isFilled } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";

/**
 * Props for `ContentIndex`.
 */
export type ContentIndexProps = SliceComponentProps<Content.ContentIndexSlice>;

/**
 * Component for "ContentIndex" Slices.
 */
const ContentIndex = async ({
  slice,
}: ContentIndexProps): Promise<JSX.Element> => {
  const client = createClient();

  const projects = await client.getAllByType("project");
  const blogPosts = await client.getAllByType("blog_posts");

  const contentType = slice.primary.content_type || "Project";

  const items = contentType === "Blog" ? blogPosts : projects;

  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <Heading size="xl" className="mb-8">
        {slice.primary.heading}
      </Heading>

      {isFilled.richText(slice.primary.description) && (
        <div className="prose prose-xl dark:prose-invert mb-10">
          <PrismicRichText field={slice.primary.description} />
        </div>
      )}

      <ContentList
        items={items}
        fallbackImage={slice.primary.fall_back_image}
        viewMoreText={slice.primary.view_more_text}
        contentType={contentType}
      />
    </Bounded>
  );
};

export default ContentIndex;
