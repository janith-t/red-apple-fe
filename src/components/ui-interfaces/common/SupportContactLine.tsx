import { Anchor, Text } from "@mantine/core";
import { SUPPORT_CONTACT } from "@/constants/contact";
import { tokens } from "@/utils/theme";
import classes from "./Auth.module.css";

export default function SupportContactLine({ prefix = "Need help signing in?" }: { prefix?: string }) {
  return (
    <Text fz={13} c={tokens.textMuted} ta="center" lh={1.5}>
      {prefix} Contact{" "}
      <Anchor href={`mailto:${SUPPORT_CONTACT.email}`} fz={13} underline="never" className={classes.link}>
        {SUPPORT_CONTACT.email}
      </Anchor>{" "}
      or{" "}
      <Anchor href={SUPPORT_CONTACT.hotlineHref} fz={13} underline="never" className={classes.link}>
        {SUPPORT_CONTACT.hotline}
      </Anchor>
    </Text>
  );
}
