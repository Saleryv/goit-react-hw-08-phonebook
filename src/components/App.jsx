// import { Filter } from './Filter/Filter';
// import { ContactList } from './ContactList/ContactList';
// import { ContactForm } from './ContactForm/ContactForm';

import css from './App.module.css';
import { useSelector } from 'react-redux';
import { Suspense } from 'react';
import { NavLink, Route, Routes } from 'react-router-dom';

import ContactsPage from '../pages/ContactsPage/ContactsPage';
// import HomePage from '../pages/HomePage/HomePage';
import RegisterPage from '../pages/RegisterPage/RegisterPage';
import LoginPage from '../pages/LoginPage/LoginPage';
import Loader from './Loader/Loader';


// const HomePage = lazy(() => import('pages/HomePage/HomePage'));
// const RegisterPage = lazy(() => import('pages/RegisterPage/RegisterPage'));
// const LoginPage = lazy(() => import('pages/LoginPage/LoginPage'));


export const App = () => {
  // const isLoading = useSelector(state => state.contacts.isLoading)
  // const dispatch = useDispatch();
  const userData = useSelector(state => state.userData.userData);

  return (
    
    // <div className={css.app}>
    //   <h1>Phonebook</h1>
    //   <ContactForm />
    //   <h2>Contacts</h2>
    //   <Filter />
    //   <ContactList/>
    // <div>

    <>
      <div className={css.app}>
        <header>
          <nav>
            {/* <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? css.active : css.navLink
              }
            >
              Home
            </NavLink> */}
            {userData !== null ? (
              <NavLink
                className={({ isActive }) =>
                  isActive ? css.active : css.navLink
                }
                to="/contactsPage"
              >
                Contacts
              </NavLink>
            ) : null}

            {userData !== null ? null : (
              <NavLink
                to="/registerPage"
                className={({ isActive }) =>
                  isActive ? css.active : css.navLink
                }
              >
                Register 
              </NavLink>
            )}

            {userData !== null ? null : (
              <NavLink
                to="/loginPage"
                className={({ isActive }) =>
                  isActive ? css.active : css.navLink
                }
              >
                Login  
              </NavLink>
            )}
          </nav>
        </header>
        <div>
  <Suspense fallback={<Loader />}>
      <Routes>
        {/* <Route path='/' element={<HomePage />} /> */}
        <Route path='/contactsPage' element={<ContactsPage />} />
        <Route path='/registerPage' element={<RegisterPage />} />
        <Route path='/loginPage' element={<LoginPage />} />
        {/* <Route path='*' element={<HomePage />} /> */}
      </Routes>
    </Suspense>
    </div>
    </div>
    </>
  );
};
