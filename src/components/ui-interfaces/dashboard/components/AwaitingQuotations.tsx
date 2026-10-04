import { Center, Group, Skeleton, Stack, Text } from "@mantine/core";
import { IconFileText, IconMailCheck } from "@tabler/icons-react";
import SectionCard from "@/components/ui/SectionCard";
import EmptyState from "@/components/ui/EmptyState";
import { ROUTES } from "@/constants/routes";
import { formatCurrency, formatDate } from "@/utils/format";
import { tokens } from "@/utils/theme";
import type { QuotationSummary } from "@/types/package";

interface AwaitingQuotationsProps {
  quotations?: QuotationSummary[];
  loading: boolean;
  className?: string;
}

const rowStyle = { borderBottom: `1px solid ${tokens.rowDivider}` };

export default function AwaitingQuotations({ quotations = [], loading, className }: AwaitingQuotationsProps) {
  return (
    <SectionCard
      className={className}
      title="Quotations awaiting response"
      action={{ label: "Open quotations", to: ROUTES.QUOTATIONS }}
    >
      {loading ? (
        <Stack gap={12}>
          {[0, 1, 2].map((row) => (
            <Skeleton key={row} h={44} radius="md" />
          ))}
        </Stack>
      ) : quotations.length === 0 ? (
        <EmptyState icon={IconMailCheck} title="Nothing waiting" description="Every sent quotation has a reply." />
      ) : (
        <Stack gap={14}>
          {quotations.map((quotation) => (
            <Group key={quotation.ref} gap={14} py={12} wrap="nowrap" style={rowStyle}>
              <Center
                w={40}
                h={40}
                bg={tokens.pageBg}
                c={tokens.textSecondary}
                style={{ borderRadius: 10, flexShrink: 0 }}
              >
                <IconFileText size={18} stroke={1.8} aria-hidden />
              </Center>
              <Stack gap={2} miw={0} style={{ flex: 1 }}>
                <Text fz={14} fw={600} truncate>
                  {quotation.ref} · {quotation.clientName}
                </Text>
                <Text fz={13} c={tokens.textMuted}>
                  {quotation.nights} nights · sent {formatDate(quotation.sentDate, "DD MMM")}
                </Text>
              </Stack>
              <Text fz={14} fw={700} style={{ whiteSpace: "nowrap" }}>
                {formatCurrency(quotation.amount, quotation.currency)}
              </Text>
            </Group>
          ))}
        </Stack>
      )}
    </SectionCard>
  );
}
