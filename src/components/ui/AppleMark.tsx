// Brand apple outline (from the approved mockups). Inherits colour from `currentColor`.
export default function AppleMark({ size = 24 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 7.5c-1.6-1.3-4.1-1.4-5.7.1C4.5 9.3 4.4 12.6 6 15.6c1.3 2.4 2.9 4.4 4.6 4.4.8 0 1-.4 1.4-.4s.6.4 1.4.4c1.7 0 3.3-2 4.6-4.4 1.6-3 1.5-6.3-.3-8-1.6-1.5-4.1-1.4-5.7-.1z" />
      <path d="M12 7.5c0-2 .9-3.6 2.8-4.3" />
    </svg>
  );
}
