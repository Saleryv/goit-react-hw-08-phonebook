import Loader from 'components/Loader/Loader';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { registerUser } from 'redux/user/userSlice';

function RegisterPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isLoading = useSelector(state => state.auth.isLoading);
    const error = useSelector(state => state.auth.error);
    const userData = useSelector(state => state.auth.userData);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData ={
        name,
        email,
        password,
    }
    dispatch(registerUser(formData));
    setName('');
    setEmail('');
    setPassword('');
  }

  useEffect(() => {
    if (userData !== null) {
      navigate('/contacts');
    }
  }, [userData, navigate]);
  return (
    <div>
        <h1>Register</h1>
        {isLoading && <Loader />}
      {error && <p>error={error}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            onChange={e => setName(e.target.value)}
            value={name}
            type="text"
            required
          />
        </label>
        <label>
          Email:
          <input
            onChange={e => setEmail(e.target.value)}
            value={email}
            type="email"
            required
          />
        </label>
        <label>
          Password:
          <input
            onChange={e => setPassword(e.target.value)}
            value={password}
            type="password"
            required
          />
        </label>
        <button type="submit">Send</button>
      </form>
    </div>
  );
}
export default RegisterPage;