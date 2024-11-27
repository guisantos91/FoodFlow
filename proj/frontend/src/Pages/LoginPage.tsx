import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8080/api/v1/auth/login', { email, password }, { withCredentials: true });
      navigate('/');
    } catch {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="flex h-screen">
      <div className="w-2/3 bg-orange-500 flex flex-col justify-center">
        <div className='ml-44 mb-28'>
          <h1 className="text-6xl text-white font-bold mb-2">FoodFlow</h1>
          <p className="text-white text-2xl">Where food trends meet data for tastier decisions!</p>
          <button className="btn w-36 bg-orange-400 text-white border-orange-500 rounded-3xl mt-4 hover:bg-orange-200 hover:text-orange-500">Admin Login</button>
        </div>
      </div>
      <div className="w-1/3 bg-white flex items-center justify-center">
        <div className="w-4/5">
          <form onSubmit={handleSubmit}>
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="Email"
                className="input input-bordered"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="Password"
                className="input input-bordered"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {error && <p className="text-red-500 mb-2">{error}</p>}
            <button type="submit" className="btn w-full bg-orange-500 text-white border-orange-500 rounded-lg">Login</button>
          </form>
          <button className="btn w-full mt-4 bg-white text-orange-500 border-orange-500 rounded-lg">Become a Manager</button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
