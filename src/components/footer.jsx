import React from 'react';
import styles from '@/styles/footer.module.css'; 

const Footer = () => {
  return (
    <footer className={styles.footerContainer}>
      <p className={styles.footerText}>
        © {new Date().getFullYear()} Transaction Tracker. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
