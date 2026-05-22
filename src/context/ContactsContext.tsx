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
    deleteContact: (id: string) => void;
}

export const ContactContext = createContext<ContactContextType>({
    contacts: [],
    isLoading: false,
    errors: '',
    fetchContacts: async () => {},
    deleteContact: (id: string) => {}
});

export function ContactProvider({ children }: { children: ReactNode}) {
    const [contacts, setContacts] = useState<ContactType[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [errors, setError]= useState('');

    const fetchContacts = async () => {
        /* await new Promise(resolve => setTimeout(resolve, 3000)); */
        /* to check the loading state */
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
            error instanceof Error ? setError(error.message) : setError("An unexpected error occurred");
        } finally {
            setIsLoading(false);
        }
    }

    const deleteContact = ( id: string ) => {
        const updated = contacts.filter(contact => contact.id !== id);
        setContacts(updated);
    }

    return (
        <ContactContext.Provider value={{ contacts, isLoading, errors, fetchContacts, deleteContact}}>
            {children}
        </ContactContext.Provider>
    );
}

export function useContacts() {
    return useContext(ContactContext);
}