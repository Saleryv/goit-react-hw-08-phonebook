import Loader from 'components/Loader/Loader';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logIn } from 'redux/user/userSlice';

// import { loginUserRequest } from 'redux/user/userSlice';



function LoginPage() {
  const isLoading = useSelector(state => state.auth.isLoading);
  const userData = useSelector(state => state.auth.userData);
  const error = useSelector(state => state.auth.error);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (userData !== null) {
      navigate('/contacts');
    }
  }, [userData, navigate]);

  const handleSubmit = event => {
    event.preventDefault();
    const formData = { email, password };
    dispatch(logIn(formData));
  };
  return (
    <div>
      <h1>Log In</h1>
      {isLoading && <Loader />}
      {error && <p>error={error}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input
            type="email"
            value={email}
            required
            onChange={event => setEmail(event.target.value)}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={password}
            required
            onChange={event => setPassword(event.target.value)}
          />
        </label>
        <button type="submit" disabled={isLoading}>
          Log In
        </button>
      </form>
    </div>
  );
}

export default LoginPage;
