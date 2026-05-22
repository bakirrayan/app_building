import { useLocalSearchParams } from 'expo-router';
import ContactDetail from '../components/ContactDetail';

export default function ContactDetailScreen() {
  const { id, name, phone, avatar } = useLocalSearchParams<{
    id: string;
    name: string;
    phone: string;
    avatar: string;
  }>();

  return <ContactDetail id={id} name={name} phone={phone} avatar={avatar} />;
}