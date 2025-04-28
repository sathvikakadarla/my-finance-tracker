// app/layout.jsx
import React from 'react';
import Header from '@/components/header';
import Footer from '@/components/footer';
import './globals.css';  // Global styles (if any)

export const metadata = {
  title: 'My Application',
  description: 'A description of my app',
};

const Layout = ({ children }) => {
  return (
    <html lang="en">  {/* Include the <html> tag */}
      <body>
        <Header />
        <main>{children}</main>  {/* Main content will go here */}
        <Footer />
      </body>
    </html>
  );
};

export default Layout;
