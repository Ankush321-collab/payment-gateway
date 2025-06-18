import React from 'react';
import LoginPageLayout from '../components/LoginPageLayout';
import LoginForm from '../components/LoginForm';

const UserLogin = () => (
  <LoginPageLayout>
    <LoginForm userType="user" />
  </LoginPageLayout>
);

export default UserLogin; 