import { nanoid } from 'nanoid';
import { ContactEntryForm } from './ContactEntryForm/ContactEntryForm';
import { ContactList } from './ContactList/ContactList';
import { SearchFilter } from './SearchFilter/SearchFilter';
import { GlobalStyle } from './GlobalStyle';
import { useEffect, useState } from 'react';

const initialState = [
  { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
];

export const App = () => {
  const [contacts, setContacts] = useState(() => {
    const contactsList = JSON.parse(localStorage.getItem('ContactsList'));
    return contactsList || initialState;
  });
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('ContactsList', JSON.stringify(contacts));
  }, [contacts]);

  const handleChange = e => {
    const { value } = e.target;
    setFilter(value);
  };

  const handleSubmit = ({ name, number }) => {
    const normalizedName = name.toLowerCase();
    const isNameExists = contacts.some(
      contact => contact.name.toLowerCase() === normalizedName
    );

    if (isNameExists) {
      alert(`Contact with name '${name}' already exists!`);
      return;
    }

    const newContact = {
      id: nanoid(),
      name,
      number,
    };

    setContacts(prevContacts => [...prevContacts, newContact]);
  };

  const handleDeleteContact = id => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== id)
    );
  };

  const getFilteredContacts = () => {
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(({ name }) =>
      name.toLowerCase().includes(normalizedFilter)
    );
  };

  const filteredContacts = getFilteredContacts();

  return (
    <>
      <ContactEntryForm onSubmit={handleSubmit} />
      <SearchFilter value={filter} onChange={handleChange} />
      <ContactList
        contacts={filteredContacts}
        onDeleteContact={handleDeleteContact}
      />
      <GlobalStyle />
    </>
  );
};
