// components/form.tsx
'use client'; // Required for client-side state
import { useState } from 'react';
import styles from '@/styles/form.module.css'; // Import the CSS module

export default function Form() {
  const [name, setName] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    alert(`Hello, ${name}!`);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.inputContainer}>
        <label htmlFor="name" className={styles.label}>Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
          required
          className={styles.input}
        />
      </div>
      <button type="submit" className={styles.button}>Submit</button>
    </form>
  );
}
