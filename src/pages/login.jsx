import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { login } from '../services/user';
import { toast } from 'react-toastify';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSignUp = () => {
    navigate('/register');
  };

  const onLogin = async () => {
    if (email.length === 0 || email.trim() === '') {
      toast.warning('Enter email');
      return;
    } else if (password.length === 0 || password.trim() === '') {
      toast.warning('Enter password');
      return;
    } else {
      try {
        const result = await login(email, password);
        if (result['status'] === 'success') {
          const { token, id, name } = result['data'];

          sessionStorage.setItem('token', token);
          sessionStorage.setItem('id', id);
          sessionStorage.setItem('name', name);

          toast.success(`Welcome to the application, ${name}`);
          navigate('/home');
        } else {
          toast.error('Invalid email or password');
        }
      } catch (error) {
        toast.error('An error occurred while logging in.');
      }
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center vh-100" style={{backgroundColor:"#E3F2FD"}}>
      <div className='shadow p-4 rounded border' style={{backgroundColor:"#FFFFFF"}} >
        <h3 className='text-center mb-4'>LOGIN</h3>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col">
              <div className="form">
                <div className="row mb-3 align-items-center">
                  <div className="col-4 ">
                    <label htmlFor="email">Email:</label>
                  </div>
                  <div className="col-8">
                    <input
                      id="email"
                      type="email"
                      className="form-control"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>
                <div className="row mb-4 align-items-center">
                  <div className="col-4 ">
                    <label htmlFor="password">Password:</label>
                  </div>
                  <div className="col-8">
                    <input
                      id="password"
                      type="password"
                      className="form-control"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>
                <div className="text-center">
                  <button
                    className="btn btn-primary me-3"
                    onClick={onLogin}
                  >
                    Sign In
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={onSignUp}
                  >
                    Sign Up
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
