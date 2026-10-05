import type { ReactNode } from "react";
import { Box, Stack, Text, Title } from "@mantine/core";
import AuthBrandPanel from "./AuthBrandPanel";
import { tokens } from "@/utils/theme";

interface AuthPageLayoutProps {
  title: string;
  subtitle: string;
  /** Form column width. Login uses the mockup's 400px; longer forms can go wider. */
  contentWidth?: number;
  children: ReactNode;
}

// Split layout shared by login, register and forgot password: brand panel left, content right.
export default function AuthPageLayout({ title, subtitle, contentWidth = 400, children }: AuthPageLayoutProps) {
  return (
    <Box mih="100vh" bg={tokens.surface} c={tokens.textPrimary} style={{ display: "flex", flexWrap: "wrap" }}>
      <AuthBrandPanel />

      <Box
        component="section"
        px={24}
        py={{ base: 32, sm: 48 }}
        style={{ flex: "1 1 480px", display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <Stack gap={28} w="100%" maw={contentWidth}>
          <Stack gap={8}>
            <Title order={1} fz={30} fw={800} lts="-0.02em">
              {title}
            </Title>
            <Text fz={15} c={tokens.textMuted} lh={1.5}>
              {subtitle}
            </Text>
          </Stack>
          {children}
        </Stack>
      </Box>
    </Box>
  );
}
