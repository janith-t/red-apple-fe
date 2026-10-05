import { ActionIcon, Tooltip, useComputedColorScheme, useMantineColorScheme } from "@mantine/core";
import { IconMoon, IconSun } from "@tabler/icons-react";
import { tokens } from "@/utils/theme";

// Mantine's colour-scheme pattern: useMantineColorScheme to set, useComputedColorScheme to read the
// effective value. The choice is saved by Mantine (localStorage) and restored before paint by the script in index.html.
export default function ColorSchemeToggle() {
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme("light");
  const isDark = computedColorScheme === "dark";
  const label = isDark ? "Switch to light mode" : "Switch to dark mode";

  return (
    <Tooltip label={label} withArrow>
      <ActionIcon
        variant="default"
        size={44}
        radius="md"
        aria-label={label}
        onClick={() => setColorScheme(isDark ? "light" : "dark")}
        c={tokens.textSecondary}
        styles={{ root: { borderColor: tokens.border } }}
      >
        {isDark ? <IconSun size={20} stroke={1.8} /> : <IconMoon size={20} stroke={1.8} />}
      </ActionIcon>
    </Tooltip>
  );
}
