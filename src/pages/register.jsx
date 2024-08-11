import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { register } from '../services/user';
import { toast } from 'react-toastify';

function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const onCancel = () => {
        navigate('/login');
    };

    const onRegister = async () => {
        if (email.length === 0 || email.trim() === '') {
            toast.error('Enter email.');
        } else if (password.length === 0 || password.trim() === '') {
            toast.error('Enter password.');
        } else if (name.length === 0 || name.trim() === '') {
            toast.error('Enter name.');
        } else if (phone.length === 0 || phone.trim() === '') {
            toast.error('Enter phone.');
        } else {
            try {
                const result = await register(name, email, password, phone);
                if (result['status'] === 'success') {
                    toast.success('Successfully registered.');
                    navigate('/login');
                } else {
                    toast.error('Failed to register.');
                }
            } catch (error) {
                toast.error('An error occurred during registration.');
            }
        }
    };

    return (
        <div className="d-flex align-items-center justify-content-center vh-100" style={{backgroundColor:"#E0F2F1"}}>
            <div className=' shadow p-4 rounded border' style={{backgroundColor:"#FFFFFF"}}>
                <h3 className='text-center mb-4'>REGISTER</h3>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col">
                            <div className="form">
                                <div className="row mb-3 align-items-center">
                                    <div className="col-4">
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
                                <div className="row mb-3 align-items-center">
                                    <div className="col-4">
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
                                <div className="row mb-3 align-items-center">
                                    <div className="col-4">
                                        <label htmlFor="name">Full Name:</label>
                                    </div>
                                    <div className="col-8">
                                        <input
                                            id="name"
                                            type="text"
                                            className="form-control"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="row mb-4 align-items-center">
                                    <div className="col-4">
                                        <label htmlFor="phone">Phone No:</label>
                                    </div>
                                    <div className="col-8">
                                        <input
                                            id="phone"
                                            type="text"
                                            className="form-control"
                                            value={phone}
                                            onChange={(e) => setPhone(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="text-center">
                                    <button
                                        className="btn btn-primary me-3"
                                        onClick={onRegister}
                                    >
                                        Sign Up
                                    </button>
                                    <button
                                        className="btn btn-danger"
                                        onClick={onCancel}
                                    >
                                        Cancel
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

export default Register;
