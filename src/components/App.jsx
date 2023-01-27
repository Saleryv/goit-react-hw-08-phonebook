// import { Filter } from './Filter/Filter';
// import { ContactList } from './ContactList/ContactList';
// import { ContactForm } from './ContactForm/ContactForm';

import css from './App.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { Suspense, useEffect } from 'react';
import { NavLink, Route, Routes } from 'react-router-dom';

import ContactsPage from '../pages/ContactsPage/ContactsPage';
// import HomePage from '../pages/HomePage/HomePage';
import RegisterPage from '../pages/RegisterPage/RegisterPage';
import LoginPage from '../pages/LoginPage/LoginPage';
import Loader from './Loader/Loader';
import { authUserRequest, logOut } from 'redux/user/userSlice';


// const HomePage = lazy(() => import('pages/HomePage/HomePage'));
// const RegisterPage = lazy(() => import('pages/RegisterPage/RegisterPage'));
// const LoginPage = lazy(() => import('pages/LoginPage/LoginPage'));


export const App = () => {
  const auth = useSelector(state => state.auth.userData);
  const isUserAuthorization = auth !== null;
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) return;

    dispatch(authUserRequest());
  }, [dispatch]);

  const handleLogOut = () => {
    dispatch(logOut());
  };
  return (
    <>
    <div>
      <header className={css.header}>
        <nav>
          {isUserAuthorization ? (
            <>
              <NavLink
                to="/contacts"
                className={({ isActive }) =>
                  isActive ? css.active : css.navLink
                }
              >
                Contacts
              </NavLink>
              <button
                type="button"
                className={css.btn}
                onClick={handleLogOut}
              >
                Log Out
              </button>
            </>
          ) : (
            <>
              <NavLink
                to="/register"
                className={({ isActive }) =>
                  isActive ? css.active : css.navLink
                }
              >
                Register 
              </NavLink>
              <NavLink
                to="/loginPage"
                className={({ isActive }) =>
                  isActive ? css.active : css.navLink
                }
              >
                Log in
              </NavLink>
            </>
          )}
        </nav>
      </header>
      <div>
        <Suspense fallback={<Loader />}>
          <Routes>
          <Route path='/contacts' element={<ContactsPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/loginPage' element={<LoginPage />} />
          </Routes>
        </Suspense>
      </div>
    </div>
  </>
);
};
