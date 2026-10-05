import type { CSSProperties } from "react";

interface BrandShape {
  width: number;
  height: number;
  d: string;
}

interface BrandMarkProps {
  shape: BrandShape;
  /** Rendered height in px; width follows the shape's aspect ratio. */
  height: number;
  /** Accessible name. Omit for decorative use (hidden from screen readers). */
  label?: string;
  style?: CSSProperties;
}

// Renders one of the vector shapes from ./paths in the current text colour.
export default function BrandMark({ shape, height, label, style }: BrandMarkProps) {
  const width = (height * shape.width) / shape.height;
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${shape.width} ${shape.height}`}
      fill="currentColor"
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      style={{ display: "block", flexShrink: 0, ...style }}
    >
      <path d={shape.d} />
    </svg>
  );
}
