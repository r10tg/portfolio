import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

/**
 * Props for `ToggleThemeButton`.
 */
export type ToggleThemeButtonProps =
  SliceComponentProps<Content.ToggleThemeButtonSlice>;

/**
 * Component for "ToggleThemeButton" Slices.
 */
const ToggleThemeButton = ({ slice }: ToggleThemeButtonProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      Placeholder component for toggle_theme_button (variation:{" "}
      {slice.variation}) Slices
    </section>
  );
};

export default ToggleThemeButton;
