import Loader from 'components/Loader/Loader';
import { Message } from 'components/Message/Message';
import { ContactForm } from 'components/ContactForm/ContactForm';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addContactsRequest,
  deleteContactsRequest,
  getContactsRequest, } from 'redux/contacts/contactsSlice';
import css from './ContactsPage.module.css';
import { Filter } from 'components/Filter/Filter';

function ContactsPage() {
  const dispatch = useDispatch();
  const contacts = useSelector(state => state.contacts.contacts);
  const isLoading = useSelector(state => state.contacts.isLoading);
  const error = useSelector(state => state.contacts.error);
  const userData = useSelector(state => state.auth.userData);

  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  
  // const filteredContacts = contacts.filter(contact =>
  //   contact.name.toLowerCase().trim().includes(filter.toLowerCase().trim())
  // );

  useEffect(() => {
    if (userData === null) return;
    dispatch(getContactsRequest());
  }, [userData, dispatch]);

  const handleSubmit = event => {
    event.preventDefault();

    const formData = {
      name,
      number,
    };

    dispatch(addContactsRequest(formData));
    setName('');
    setNumber('');
  };

  // const handleDeleteContact =  contactId  => {
  //   dispatch(deleteContactsRequest(contactId));
  // };
  return (
    <>
      <ul>
        {isLoading && <Loader />}
        {error && <p>error={error}</p>}
        <ContactForm />
        <Filter />
        {Array.isArray(contacts) && contacts.length === 0 && (
          <Message text="Contact list is empty." />
        )}
        {Array.isArray(contacts) &&
          contacts.map(({ id, name, number }) => {
            return (
              <li className={css.item} key={id}>
                <form onSubmit={handleSubmit}>
                <h3>{name}</h3>
                <p>{number}</p>
                <button
                  type="submit"
                  onClick={() => dispatch(deleteContactsRequest(id))}
                >
                  Delete Contact
                </button>
                </form>
              </li>
            );
          })}
      </ul>
    </>
  );
}

export default ContactsPage;