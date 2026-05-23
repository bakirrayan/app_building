import { ContactProvider } from "@/context/ContactsContext";
import { migrateDbIfNeeded } from "@/database/migration";
import { Host, Text } from "@expo/ui";
import { Stack } from "expo-router";
import { SQLiteProvider } from "expo-sqlite";
import { Suspense } from "react";

export default function RootLayout() {
  return (
    <Suspense fallback={<Host matchContents><Text>Loading...</Text></Host>}>
      <SQLiteProvider databaseName="contacts.db" onInit={migrateDbIfNeeded} useSuspense={true}>
        <ContactProvider>
          <Stack />
        </ContactProvider>
      </SQLiteProvider>
    </Suspense>
  );
}
