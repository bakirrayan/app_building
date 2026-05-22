import { ContactProvider } from "@/context/ContactsContext";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <ContactProvider>
      <Stack />
    </ContactProvider>
  );
}
