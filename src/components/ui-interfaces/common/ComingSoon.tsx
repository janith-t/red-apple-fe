import { Button } from "@mantine/core";
import { IconTools } from "@tabler/icons-react";
import { Link } from "react-router";
import EmptyState from "@/components/ui/EmptyState";
import PageHeader from "@/components/ui/PageHeader";
import SectionCard from "@/components/ui/SectionCard";
import { ROUTES } from "@/constants/routes";

// Placeholder for modules whose requirements haven't arrived yet. Replaced module by module.
export default function ComingSoon({ title }: { title: string }) {
  return (
    <>
      <PageHeader title={title} />
      <SectionCard>
        <EmptyState
          icon={IconTools}
          title={`${title} is on its way`}
          description="This module will be built once its requirements are confirmed."
          action={
            <Button component={Link} to={ROUTES.DASHBOARD} variant="default" mt={6}>
              Back to dashboard
            </Button>
          }
        />
      </SectionCard>
    </>
  );
}
