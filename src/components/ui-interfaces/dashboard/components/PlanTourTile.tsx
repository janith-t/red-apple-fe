import { Box, Button, Group, Stack, Text, Title } from "@mantine/core";
import { Link } from "react-router";
import { PLAN_TOUR_STEPS } from "@/constants/packageStatus";
import { ROUTES } from "@/constants/routes";

// Red call-to-action tile (2 × 2 in the bento grid).
export default function PlanTourTile({ className }: { className?: string }) {
  return (
    <Box
      component="section"
      className={className}
      bg="appleRed.6"
      c="white"
      p={28}
      style={{ borderRadius: 18, display: "flex", flexDirection: "column", justifyContent: "space-between", gap: 24 }}
    >
      <Stack gap={10}>
        <Text fz={13} fw={600} tt="uppercase" lts="0.06em" style={{ opacity: 0.9 }}>
          Plan Tour
        </Text>
        <Title order={2} c="white" fz={28} lh={1.2} fw={800} lts="-0.01em" maw={420}>
          Start a new tour plan for your client
        </Title>
        <Text fz={15} lh={1.55} maw={440} style={{ opacity: 0.92 }}>
          Set tour type, nationality, dates, flights and pax, then add hotels, meals, transport and activities. The
          quotation builds as you go.
        </Text>
      </Stack>

      <Group component="ol" gap={8} p={0} m={0} style={{ listStyle: "none" }} aria-label="Plan Tour steps">
        {PLAN_TOUR_STEPS.map((step, index) => (
          <Box
            component="li"
            key={step}
            fz={12}
            fw={600}
            px={10}
            py={6}
            style={{
              borderRadius: 999,
              background: "rgba(255,255,255,0.16)",
              border: "1px solid rgba(255,255,255,0.35)",
            }}
          >
            {index + 1}. {step}
          </Box>
        ))}
      </Group>

      <Group gap={10}>
        <Button component={Link} to={ROUTES.PLAN_TOUR} h={46} px={20} fz={15} fw={700} variant="white">
          Plan a tour
        </Button>
        <Button
          component={Link}
          to={`${ROUTES.PACKAGES}?status=draft`}
          h={46}
          px={20}
          fz={15}
          fw={600}
          variant="outline"
          color="white"
          styles={{ root: { borderColor: "rgba(255,255,255,0.6)" } }}
        >
          Continue a draft
        </Button>
      </Group>
    </Box>
  );
}
