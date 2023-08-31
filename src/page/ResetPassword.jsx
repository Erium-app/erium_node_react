// src/components/ResetPassword.js

import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

function ResetPassword() {
  const { resetPasswordRequest } = useAuth();
  const [email, setEmail] = useState('');

  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      await resetPasswordRequest(email);
      // Show a message to inform the user about the password reset request
    } catch (error) {
      console.error('Password reset request error:', error);
    }
  };

  return (
    <div>
      <h2>Reset Password</h2>
      <form onSubmit={handleResetPassword}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit">Reset Password</button>
      </form>
    </div>
  );
}

export default ResetPassword;
