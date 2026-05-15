import { useLocalSearchParams } from 'expo-router';
import ContactDetail from '../components/ContactDetail';

export default function ContactDetailScreen() {
  const { name, phone, avatar } = useLocalSearchParams<{
    name: string;
    phone: string;
    avatar: string;
  }>();

  return <ContactDetail name={name} phone={phone} avatar={avatar} />;
}