import { useState, useEffect } from 'react';
import { ContactList } from './ContactList';
import { ContactForm } from './ContactForm';
import { ContactContainer } from './App.styled';
import { Filter } from './Filter';
import { nanoid } from 'nanoid';
import Notiflix from 'notiflix';

const LS_KEY = 'phonebook_contacts';

export const App = () => {
  const [contacts, setContacts] = useState([
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const localStorContacts = localStorage.getItem(LS_KEY);
    const parseContacts = JSON.parse(localStorContacts);

    if (parseContacts) {
      setContacts(parseContacts);
    }
  }, []);

  
  useEffect(() => {
    localStorage.setItem(LS_KEY, JSON.stringify(contacts));
  }, [contacts]);

  const addToContact = ({ name, number }) => {
    if (contacts.some(contact => contact.name === name)) {
      return Notiflix.Notify.info(`${contacts.name} is already in contacts!`);
    }

    setContacts(prevState => [...prevState, { id: nanoid(), name, number }]);
  };

  const deleteFromContact = id => {
    setContacts(contacts.filter(contact => contact.id !== id));
  };

  const filtring = e => {
    setFilter(e.currentTarget.value.toLowerCase().trim());
  };

  const filtringContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter)
  );


  return (
    <ContactContainer>
      <h1>Phonebook</h1>

      <ContactForm onSubmit={addToContact}></ContactForm>

      <h2>Contacts</h2>
      <Filter filtring={filtring} />
      <ContactList
        filtringContacts={filtringContacts}
        onDelete={deleteFromContact}
      ></ContactList>
    </ContactContainer>
  );
};
