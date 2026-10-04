import { Center, Loader } from "@mantine/core";

// Shown while a lazy-loaded route chunk downloads on first load.
export default function PageLoader() {
  return (
    <Center mih="60vh" role="status" aria-label="Loading">
      <Loader color="appleRed" />
    </Center>
  );
}
