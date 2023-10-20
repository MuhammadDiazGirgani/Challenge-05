import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import axios from 'axios';
import './Register.css'
import { BsFillEyeFill, BsFillEyeSlashFill } from 'react-icons/bs';

const Register = () => { 
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate(); 

  
  const registerHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://shy-cloud-3319.fly.dev/api/v1/auth/register', {
        name: name,
        email: email,
        password: password,
        confPassword: confPassword
      });

     
      navigate('/login');
    } catch (error) {
      if (error.response) {
        setMessage(error.response.data.message);
      }
    }
  }
  
     
  return (
    <div className="container" style={{ marginTop: "180px" }}>
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card border-0 rounded shadow-sm">
            <div className="card-body">
              <form onSubmit={registerHandler}>
                <p className='text-align-center'>{message}</p>
                <div className="row">
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label">Nama</label>
                      <input
                        type="text"
                        className="form-control inpt-cus"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Masukkan Nama"
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
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
                  </div>
                </div>
                <div className="row">
  <div className="col-md-6">
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
  </div>
  <div className="col-md-6">
    <div className="mb-3">
      <label className="form-label">Konfirmasi Password</label>
      <div className="input-group">
        <input
          type={showPassword ? 'text' : 'password'}
          className="form-control"
          value={confPassword}
          onChange={(e) => setConfPassword(e.target.value)}
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
  </div>
</div>

                <button type="submit" className="btn btn-primary">
                  Register
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
