import { useDispatch, useSelector } from 'react-redux';
import { setFilter } from 'redux/contacts/contactsSlice';
import { getFilter } from 'redux/contacts/selectors';
import css from './Filter.module.css';

export const Filter = () => {
  const filter = useSelector(getFilter);
  const dispatch = useDispatch();

    const onChange = e => {
      dispatch(setFilter(e.target.value));
    }
  return (
    <div>
      <label className={css.label}>
        Find contacts by name
        <input
          className={css.input}
          onChange={onChange}
          value={filter}
          type="text"
        />
      </label>
    </div>
  );
};