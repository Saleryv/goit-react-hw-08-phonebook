import { ContactItem } from './ContactItem/ContactItem';
import css from '../ContactList/ContactList.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { selectFilterContacts } from 'redux/contacts/selectors';
import { useEffect } from 'react';
import { getContactsThunk } from 'redux/thunks/contactsThunk';

export const ContactList = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getContactsThunk());
  }, [dispatch]);

  // const contacts = useSelector(getContacts);
  // const filter = useSelector(getFilter);
  const filterContact = useSelector(selectFilterContacts)
  
return (
    <ul className={css.namesList}>
      {filterContact.map(({ id, name, number }) => (
        <ContactItem id={id} key={id} name={name} number={number} />
      ))}
    </ul>
  );
};
