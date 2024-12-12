import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// These are temporary placeholder components that we'll replace later
const Dashboard = () => (
  <div className="container mt-4">
    <h1>Dashboard</h1>
    <p>Welcome to your Dialogflow SaaS dashboard!</p>
  </div>
);

const IntentGeneration = () => (
  <div className="container mt-4">
    <h1>Intent Generation</h1>
    <p>Create and manage your Dialogflow intents here.</p>
  </div>
);

const Login = () => (
  <div className="container mt-4">
    <h1>Login</h1>
    <p>Please log in to access your account.</p>
  </div>
);

// The main App component that serves as the root of our application
function App() {
  return (
    <BrowserRouter>
      {/* Navigation bar with Bootstrap styling */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container">
          <a className="navbar-brand" href="/">Dialogflow SaaS</a>
        </div>
      </nav>

      {/* Main content area */}
      <div className="app-content">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/intents" element={<IntentGeneration />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

// Don't forget to export the component so it can be imported elsewhere
export default App;