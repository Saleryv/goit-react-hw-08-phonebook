// import PropTypes from 'prop-types';
// import css from './ContactItem.module.css';
// import { useDispatch } from 'react-redux';
// import { deleteContactsRequest } from 'redux/contacts/contactsSlice';


// export const ContactItem = ({ id, name, number }) => {
//   const dispatch = useDispatch();
//   return (
//     <li className={css.namesItem}>
//       {name}
//       <span className={css.colon}> : </span>
//       <span className={css.number}>{number}</span>
//       <button
//         className={css.btn}
//         type="button"
//         onClick={() => dispatch(deleteContactsRequest(id))}
//       >
//         Delete
//       </button>
//     </li>
//   );
// };

// ContactItem.propTypes = {
//   id: PropTypes.string.isRequired,
//   name: PropTypes.string.isRequired,
//   number: PropTypes.string.isRequired,
// }; 