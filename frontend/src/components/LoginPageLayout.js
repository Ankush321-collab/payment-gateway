import React from 'react';

const LoginPageLayout = ({ children }) => (
  <div className="flex flex-col items-center justify-center min-h-screen w-full">
    <div className="text-center mb-8">
      <h1 className="text-6xl font-extrabold text-white opacity-10 tracking-widest absolute w-full left-0 top-12 select-none pointer-events-none z-0">
        Computer Point Nepal
      </h1>
      <h2 className="relative text-3xl sm:text-4xl font-bold text-gray-100 z-10 mt-20">
      Access the Power of Technology
      </h2>
      <p className="relative text-lg text-gray-300 mt-2 z-10">
      Empowering the Future Through Advanced Technology
      </p>
    </div>
    {children}
  </div>
);

export default LoginPageLayout; 