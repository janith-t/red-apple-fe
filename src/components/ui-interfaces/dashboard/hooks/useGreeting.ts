import { useEffect, useState } from "react";
import dayjs from "dayjs";

const MINUTE_MS = 60_000;

const greetingFor = (hour: number) => (hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening");

// "Good morning" + "Sunday, 4 October 2026". Re-evaluated every minute so it rolls over while the tab stays open.
const useGreeting = () => {
  const [now, setNow] = useState(() => dayjs());

  useEffect(() => {
    const timer = window.setInterval(() => setNow(dayjs()), MINUTE_MS);
    return () => window.clearInterval(timer);
  }, []);

  return { greeting: greetingFor(now.hour()), todayLabel: now.format("dddd, D MMMM YYYY"), now };
};

export default useGreeting;
