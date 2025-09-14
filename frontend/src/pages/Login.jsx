import React, { useState, useContext } from 'react';
import Title from '../components/Title';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [currentState, setCurrentState] = useState('Sign Up');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { setToken, backendUrl } = useContext(ShopContext);
  const navigate = useNavigate(); // ✅ useNavigate directly

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      if (currentState === 'Sign Up') {
        // SIGN UP request
        const response = await axios.post(
          `${backendUrl}/api/user/register`,
          { name, email, password }
        );

        if (response.data.success) {
          toast.success('Signup successful, please login');
          setCurrentState('Login');
        } else {
          toast.error(response.data.message);
        }
      } else {
        // LOGIN request
        const response = await axios.post(
          `${backendUrl}/api/user/login`,
          { email, password }
        );

        if (response.data.success) {
          toast.success('Login successful');
          setToken(response.data.token);
          localStorage.setItem('token', response.data.token);

          navigate('/'); // ✅ redirect after login
        } else {
          toast.error(response.data.message);
        }
      }
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <div className="flex flex-col items-center pt-16">
      <div className="text-3xl font-bold mb-2">
        <Title text1={currentState === 'Login' ? 'LOGIN' : 'SIGN UP'} text2="" />
      </div>

      <form
        className="w-full max-w-sm flex flex-col gap-4 mt-8"
        onSubmit={onSubmitHandler}
      >
        {currentState === 'Sign Up' && (
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border border-gray-300 rounded py-2 px-4 w-full"
            required
          />
        )}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border border-gray-300 rounded py-2 px-4 w-full"
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border border-gray-300 rounded py-2 px-4 w-full"
          required
        />

        {currentState === 'Login' && (
          <div className="text-right">
            <button
              type="button"
              className="text-blue-600 text-sm hover:underline"
            >
              Forgot Password?
            </button>
          </div>
        )}

        <button
          type="submit"
          className="bg-black text-white py-2 rounded w-full mt-2"
        >
          {currentState === 'Login' ? 'Login' : 'Sign Up'}
        </button>

        <button
          type="button"
          onClick={() =>
            setCurrentState(currentState === 'Login' ? 'Sign Up' : 'Login')
          }
          className="text-blue-600 text-sm mt-2 hover:underline"
        >
          {currentState === 'Login'
            ? 'Create an account'
            : 'Already have an account? Login'}
        </button>
      </form>
    </div>
  );
};

export default Login;


