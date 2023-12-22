// Auth/AuthForm.jsx
import React from 'react';
import AuthButton from './AuthButton';
import useAuth from '../../hooks/useAuth';

function AuthForm() {
  const { login } = useAuth();

  const handleLogin = async () => {
    // Your login logic here
    await login();
  };

  return (
    <div>
      <h2>Login Form</h2>
      <AuthButton onClick={handleLogin} />
    </div>
  );
}

export default AuthForm;
