// src/components/Layout/Navbar.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../store/slices/authSlice';

const Navbar: React.FC = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container">
        <Link className="navbar-brand" to="/">Dialogflow SaaS</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/dashboard">Dashboard</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/intents">Intents</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/webhooks">Webhooks</Link>
            </li>
          </ul>
          <div className="d-flex">
            {user ? (
              <button 
                className="btn btn-outline-light" 
                onClick={() => dispatch(logout())}
              >
                Logout
              </button>
            ) : (
              <Link className="btn btn-outline-light" to="/login">
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};