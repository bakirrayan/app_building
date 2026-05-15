import ContactCards from "@/components/ContactCards";
import { useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, TextInput, View } from "react-native";

type Contact = {
  id: string,
  name: string,
  phone: string,
  avatar: string
}

const initialContacts: Contact[] = [
  { id: "1", name: "ada", phone: "000293948", avatar: "https://i.pravatar.cc/150?img=47" },
  { id: "2", name: "loic", phone: "+333467089", avatar: "https://i.pravatar.cc/150?img=37" }
]

export default function Index() {

  const [contacts, setContacts] = useState<Contact[]>(initialContacts);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const addContact = () => {
    if (!name || !phone) return;
    const newContact: Contact = {
      id: Date.now().toString(),
      name,
      phone,
      avatar: `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70)}`,
    };
    setContacts([...contacts, newContact]);
    setName('');
    setPhone('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Contacts</Text>

      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Phone"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
      />
      <Pressable style={styles.button} onPress={addContact}>
        <Text style={styles.buttonText}>Add Contact</Text>
      </Pressable>

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
      />
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
  input: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 12,
    fontSize: 15,
    marginBottom: 10,
    borderWidth: 0.5,
    borderColor: '#ddd',
  },
  button: {
    backgroundColor: '#1D9E75',
    borderRadius: 10,
    padding: 14,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 15,
  },
  list: {
    flex: 1,
  },
  listContent: {
    paddingBottom: 40,
  },
});
