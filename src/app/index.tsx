import ContactCards from "@/components/ContactCards";
import { useContacts } from "@/context/ContactsContext";
import { CircularWavyProgressIndicator, Host } from '@expo/ui/jetpack-compose';
import { useEffect } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";



export default function Index() {
  const { contacts, isLoading, errors, fetchContacts } = useContacts();

  useEffect(() => {
    fetchContacts();
  }, [])

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Contacts</Text>
      {errors && 
        <Text style={styles.error}>{errors}</Text>
      }
      {isLoading ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Host matchContents>
            <CircularWavyProgressIndicator color="#1eff00"/>
          </Host>
        </View>
      ) : contacts.length > 0 && (
        <FlatList
          data={contacts}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <ContactCards
              id={item.id}
              name={item.name}
              phone={item.phone}
              avatar={item.avatar}
            />
        )}
        style={styles.list}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      />)}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '600',
    marginBottom: 20,
  },
  error: {
    color: 'red',
    marginBottom: 20,
  },
  list: {
    flex: 1,
  },
  listContent: {
    paddingBottom: 40,
  },
});
