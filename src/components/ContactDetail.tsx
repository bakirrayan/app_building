import { useRouter } from "expo-router";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

type Props = {
  name: string;
  phone: string;
  avatar: string;
};

export default function ContactDetail({name, phone, avatar}: Props) {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <Pressable style={styles.backButton} onPress={() => router.back()}>
        <Text style={styles.backText}>← Back</Text>
      </Pressable>
      <Image source={{ uri: avatar }} style={styles.avatar}/>
      <Text style={styles.name} numberOfLines={1}>{name}</Text>
      <Text style={styles.phone} numberOfLines={1}>{phone}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  backButton: {
    position: 'absolute',
    top: 60,
    left: 20,
  },
  backText: {
    fontSize: 16,
    color: '#1D9E75',
    fontWeight: '500',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 8,
  },
  phone: {
    fontSize: 16,
    color: '#888',
  },
})