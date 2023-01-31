import { useState } from 'react';
import css from './ContactForm.module.css';
import { useDispatch, useSelector } from 'react-redux';
// import { addContact } from 'redux/contacts/contactsSlice';
import { useEffect } from 'react';
import { addContactsRequest, getContactsRequest } from 'redux/contacts/contactsSlice';


export const ContactForm = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(state => state.contacts.contacts);

  useEffect(() => {
    dispatch(getContactsRequest())
  }, [dispatch]);

  const [formData, setFormData] = useState({
    name: '',
    number: '',
  });

   const change = e => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const { name, number } = formData;

  const onSubmit = e => {
    e.preventDefault();
    const contactPresent = contacts.filter(
      ({ name: currentName }) =>
        currentName.toLowerCase() === name.toLowerCase()
    );

    if (contactPresent.length) {
      alert(`${name} is already in contacts`);
      return;
    }
    const newContact = {...formData }
    dispatch(addContactsRequest(newContact)); 
    reset();
  };

  const reset = () => {
    setFormData({
      name: '',
      number: '',
    });
  };



  return (
      <form onSubmit={onSubmit} className={css.section}>
        <label className={css.label}>
          Name
          <input
            className={css.input}
            type="text"
            value={name}
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            onChange={change}
            required
          />
        </label>
       <span> </span>
        <label className={css.label}>
          Number
          <input
            className={css.input}
            type="tel"
            value={number}
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            onChange={change}
            required
          />
        </label>
        <button className={css.addBtn} type="submit">
          Add contact
        </button>
      </form>
    );
  }