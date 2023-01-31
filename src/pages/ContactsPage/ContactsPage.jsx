import Loader from 'components/Loader/Loader';
import { Message } from 'components/Message/Message';
import { ContactForm } from 'components/ContactForm/ContactForm';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteContactsRequest,
  getContactsRequest, } from 'redux/contacts/contactsSlice';
import css from './ContactsPage.module.css';
import { Filter } from 'components/Filter/Filter';
import WithAuthRedirect from 'hoc/WithAuthRedirect';

function ContactsPage() {
  const dispatch = useDispatch();
  const contacts = useSelector(state => state.contacts.contacts);
  const isLoading = useSelector(state => state.contacts.isLoading);
  const error = useSelector(state => state.contacts.error);
  const userData = useSelector(state => state.auth.userData);
  const filter = useSelector(state => state.contacts.filter);

  // const [name, setName] = useState('');
  // const [number, setNumber] = useState('');

 
  
  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().trim().includes(filter.toLowerCase().trim())
  );

  useEffect(() => {
    if (userData === null) return;
    dispatch(getContactsRequest());
  }, [userData, dispatch]);

  // const handleSubmit = event => {
  //   event.preventDefault();

  //   const formData = {
  //     name,
  //     number,
  //   };

  //   dispatch(addContactsRequest(formData));
  //   setName('');
  //   setNumber('');
  // };

  // const handleDeleteContact =  contactId  => {
  //   dispatch(deleteContactsRequest(contactId));
  // };
  return (
    <>
      <ul>
        {isLoading && <Loader />}
        {error && <p>error={error}</p>}
        <ContactForm />
        <br />
        <Filter />
        {Array.isArray(filteredContacts) && filteredContacts.length === 0 && (
          <Message text="Contact list is empty." />
        )}
        {Array.isArray(contacts) &&
          filteredContacts.map(({ id, name, number }) => {
            return (
              <li className={css.item} key={id}>
              
                <h3>{name}</h3>
                <p>{number}</p>
                <button
                  type="submit"
                  onClick={() => dispatch(deleteContactsRequest(id))}
                >
                  Delete Contact
                </button>
              </li>
            );
          })}
      </ul>
    </>
  );
}

const ProtectedContactsPage = WithAuthRedirect(ContactsPage, "/loginPage");

export default ProtectedContactsPage;


