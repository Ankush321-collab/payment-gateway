import React from 'react';
import LoginPageLayout from '../components/LoginPageLayout';
import LoginForm from '../components/LoginForm';

const AdminLogin = () => (
  <LoginPageLayout>
    <LoginForm userType="admin" />
  </LoginPageLayout>
);

export default AdminLogin; 