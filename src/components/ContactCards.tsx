import { useRouter } from 'expo-router';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

type Props = {
  name: string;
  phone: string;
  avatar: string;
};

export default function ContactCard({ name, phone, avatar }: Props) {
  const router = useRouter();

  const handlePress = () => {
    router.push({
      pathname: '/contact',
      params: {name, phone, avatar}
    })
  }

  return (
    <Pressable
      style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
      onPress={handlePress}
    >
      <Image
        source={{ uri: avatar }}
        style={styles.avatar}
      />
      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={1}>{name}</Text>
        <Text style={styles.phone} numberOfLines={1}>{phone}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
    minHeight: 76,
  },
  cardPressed: {
    opacity: 0.7,
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    marginRight: 14,
    backgroundColor: '#eee',
  },
  info: {
    flex: 1,
    justifyContent: 'center',
  },
  name: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1a1a1a',
  },
  phone: {
    fontSize: 13,
    color: '#888',
    marginTop: 2,
  },
});