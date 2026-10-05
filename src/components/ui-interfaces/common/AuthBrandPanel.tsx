import { Flex, Group, Stack, Text, Title } from "@mantine/core";
import { IconCheck } from "@tabler/icons-react";
import BrandLogo from "@/components/ui/BrandLogo";
import { COMPANY_LEGAL_NAME } from "@/constants/contact";

const BENEFITS = [
  "Build day-by-day itineraries in minutes",
  "Generate quotations in LKR or USD",
  "Track every package from draft to confirmed",
];

// Left half of the auth screens (login now; register / forgot password later).
// On phones it collapses to logo + headline so the form is reachable without scrolling past marketing copy.
export default function AuthBrandPanel() {
  return (
    <Flex
      component="section"
      direction="column"
      justify="space-between"
      gap={{ base: 24, sm: 48 }}
      bg="appleRed.6"
      c="white"
      px={{ base: 24, sm: 56 }}
      py={{ base: 32, sm: 48 }}
      style={{ flex: "1 1 480px" }}
    >
      <BrandLogo variant="onBrand" size="lg" />

      <Stack gap={20} maw={520}>
        <Title order={2} c="white" fz={{ base: 26, sm: 44 }} lh={1.12} fw={800} lts="-0.02em">
          Plan, price and confirm tours across Sri Lanka.
        </Title>
        <Text fz={17} lh={1.6} style={{ opacity: 0.92 }} visibleFrom="sm">
          The agent portal for building itineraries, arranging hotels, transport and guides, and sending quotations to
          your clients.
        </Text>
        <Stack component="ul" gap={12} mt={12} p={0} mb={0} style={{ listStyle: "none" }} visibleFrom="sm">
          {BENEFITS.map((benefit) => (
            <Group component="li" key={benefit} gap={12} wrap="nowrap" fz={15}>
              <IconCheck size={20} stroke={2} aria-hidden style={{ flexShrink: 0 }} />
              {benefit}
            </Group>
          ))}
        </Stack>
      </Stack>

      <Group justify="space-between" gap={12} fz={13} style={{ opacity: 0.85 }} visibleFrom="sm">
        <span>© {COMPANY_LEGAL_NAME}</span>
        <span>Agent portal</span>
      </Group>
    </Flex>
  );
}
