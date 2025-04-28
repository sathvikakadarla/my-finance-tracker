
import React from 'react';
import Header from '@/components/header';
import Footer from '@/components/footer';
import './globals.css';
import { Toaster } from 'react-hot-toast';

export const metadata = {
  title: 'My Application',
  description: 'A description of my app',
};

const Layout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
        <Toaster
          position="top-right"
          reverseOrder={false}
          toastOptions={{
            style: {
              fontSize: '18px', 
              padding: '20px 50px', 
            },
            success: {
              style: {
                background: 'white',
                color: '#4CAF50',
                fontWeight: 'bold',
              },
            },
            error: {
              style: {
                background: 'white',
                color: '#F44336',
                fontWeight: 'bold',
              },
            },
          }}
        />
        
      </body>
    </html>
  );
};

export default Layout;
