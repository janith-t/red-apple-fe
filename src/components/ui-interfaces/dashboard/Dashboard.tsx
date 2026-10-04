// PLACEHOLDER dashboard – replaced by the bento grid from the HTML mockup in step D.
import { Text, Title } from "@mantine/core";
import useAuth from "@/hooks/common/useAuth";

export default function Dashboard() {
  const { userInfo } = useAuth();
  return (
    <>
      <Title order={1}>Good day, {userInfo?.displayName}</Title>
      <Text c="dimmed">The dashboard will be rebuilt from the mockup next.</Text>
    </>
  );
}
