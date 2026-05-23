import { useSQLiteContext } from "expo-sqlite";
import { createContext, useContext, useState, type ReactNode } from "react";

type ContactType = {
  id: string,
  name: string,
  phone: string,
  avatar: string
}

type ContactContextType = {
    contacts: ContactType[];
    isLoading: boolean;
    errors: string;
    fetchContacts: () => Promise<void>;
    deleteContact: (id: string) => Promise<void>;
    updateContact: (id: string, updatedContact: ContactType) => Promise<void>
}

export const ContactContext = createContext<ContactContextType>({
    contacts: [],
    isLoading: false,
    errors: '',
    fetchContacts: async () => {},
    deleteContact: async (id: string) => {},
    updateContact: async (id: string, updatedContact: ContactType) => {}
});

export function ContactProvider({ children }: { children: ReactNode}) {
    const [contacts, setContacts] = useState<ContactType[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [errors, setError]= useState('');
    const db = useSQLiteContext();

    const fetchContacts = async () => {
        const results = await db.getFirstAsync<{ count: number}>(`SELECT count(*) as count FROM contacts`)
        const count = results?.count ?? 0;
        if (count >= 1) {
            const data = await db.getAllAsync<ContactType>(`SELECT * FROM contacts`)
            setContacts(data)
            setIsLoading(false)
        } else {
            try {
                const response = await fetch('https://jsonplaceholder.typicode.com/users');
                const json = await response.json();
                const mappedContacts = json.map((item: any) => ({
                    id: item.id.toString(),
                    name: item.name,
                    phone: item.phone,
                    avatar: `https://i.pravatar.cc/150?img=${item.id}`
                }))
                setContacts(mappedContacts);
                for (const contact of mappedContacts) {
                    await db.runAsync(
                        'INSERT INTO contacts (id, name, phone, avatar) VALUES (?, ?, ?, ?)',
                        contact.id, contact.name, contact.phone, contact.avatar
                    )
                }
            } catch (error) {
                // eslint-disable-next-line no-unused-expressions
                error instanceof Error ? setError(error.message) : setError("An unexpected error occurred");
            } finally {
                setIsLoading(false);
            }
        }
    }

    const deleteContact = async (id: string) => {
        const updated = contacts.filter(contact => contact.id !== id);
        setContacts(updated);
        await db.runAsync(`DELETE FROM contacts WHERE id = ?`, id);
    }

    const updateContact = async (id: string, updatedContact: ContactType) => {
        const updated = contacts.map(contact => contact.id === id ? { ...contact, ...updatedContact } : contact);
        setContacts(updated);
        await db.runAsync(`UPDATE contacts SET name = ?, phone = ?, avatar = ? WHERE id = ?`, updatedContact.name, updatedContact.phone, updatedContact.avatar, id);
    }

    return (
        <ContactContext.Provider value={{ contacts, isLoading, errors, fetchContacts, deleteContact, updateContact}}>
            {children}
        </ContactContext.Provider>
    );
}

export function useContacts() {
    return useContext(ContactContext);
}