'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import styles from '@/styles/home.module.css';
import Image from 'next/image';

const Home = () => {
  const router = useRouter();

  // This handles the button click navigation
  const handleTransactionClick = () => {
    router.push('/transactions');  // Navigates to /transactions
  };

  return (
    <div className={styles.home}>
      <Image src="/images/assetManagement.gif" alt="gif" width={200} height={200} className={styles.assetsGif} />
      <div className={styles.button}>
      <button onClick={handleTransactionClick} className={styles.transactionButton}>
        add Transactions
      </button>
      </div>
      {/* Alternatively, you can use Link for navigation */}
      <Link href="/transactions" className={styles.link}>
      </Link>
    </div>
  );
};

export default Home;
