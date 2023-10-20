import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import axios from 'axios';
import { BsFillEyeFill, BsFillEyeSlashFill } from 'react-icons/bs';
import GoogleLogin from "./GoogleLogin";
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const Auth = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://shy-cloud-3319.fly.dev/api/v1/auth/login', {
        email: email,
        password: password,
      });

      if (response.data.data.token) {
        localStorage.setItem('token', response.data.data.token);
      }

      window.history.pushState(null, '', '/');
      window.location.reload();
      navigate('/');
    } catch (error) {
      if (error.response) {
        setMessage(error.response.data.message);
      }
    }
  };

  return (
    
    <div className="login-container" style={{ marginTop: '180px' }}>
      <div className="row justify-content-center">
        <div className="col-md-4">
          <div className="card border-0 rounded shadow-sm">
            <div className="card-body">
              <form onSubmit={Auth}>
                <p className="text-align-center">{message}</p>
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Masukkan Email"
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Password</label>
                  <div className="input-group">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      className="form-control"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Masukkan Password"
                    />
                    <button
                      type="button"
                      className="btn btn-outline-secondary"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <BsFillEyeSlashFill /> : <BsFillEyeFill />}
                    </button>
                  </div>
                </div>
                <div className="d-grid gap-2">
                  <button type="submit" className="btn btn-primary">
                    Login
                  </button>
                </div>
                <GoogleLogin buttonText="Login with Google" />
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
