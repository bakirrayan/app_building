import ContactCards from "@/components/ContactCards";
import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from "react-native";

type Contact = {
  id: string,
  name: string,
  phone: string,
  avatar: string
}

export default function Index() {

  const [contacts, setContacts] = useState<Contact[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errors, setError]= useState('');

  const fetchContacts = async () => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      const json = await response.json();
      setContacts(json.map((item: any) => ({
        id: item.id.toString(),
        name: item.name,
        phone: item.phone,
        avatar: `https://i.pravatar.cc/150?img=${item.id}`
      })));
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unexpected error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  }

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
          <ActivityIndicator size="large" color="#1D9E75" />
        </View>
      ) : contacts.length > 0 && (
        <FlatList
          data={contacts}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <ContactCards
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
