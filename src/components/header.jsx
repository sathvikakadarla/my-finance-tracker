import React from 'react';
import styles from '@/styles/header.module.css';

const Header = () => {
  return (
    <header className="header-container">
      <h1 className={styles.title}>Finance Tracker</h1>
    </header>
  );
};

export default Header;
