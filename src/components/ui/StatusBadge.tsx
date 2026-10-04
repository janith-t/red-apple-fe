import { Badge } from "@mantine/core";
import { PACKAGE_STATUS } from "@/constants/packageStatus";
import type { PackageStatus } from "@/types/package";

export default function StatusBadge({ status }: { status: PackageStatus }) {
  const { label, bg, fg } = PACKAGE_STATUS[status];
  return (
    <Badge
      radius="xl"
      size="md"
      tt="none"
      fw={700}
      fz={12}
      px={10}
      styles={{ root: { backgroundColor: bg, color: fg, height: "auto", paddingBlock: 4, lineHeight: "normal" } }}
    >
      {label}
    </Badge>
  );
}
