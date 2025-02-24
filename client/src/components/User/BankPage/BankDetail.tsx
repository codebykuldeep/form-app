import React from 'react'
import { Bank } from '../../../types/dataTypes';
import styles from './bank-details.module.css'

interface Props{
    bank:Bank;
}

const BankDetail = ({ bank }:Props) => {
    if (!bank || !bank.bank_data) return <p>Loading...</p>;
  
    let bankAccounts;
    try {
      bankAccounts = JSON.parse(bank.bank_data);
    } catch (error) {
      console.error("Error parsing bank_data:", error);
      return <p>Error loading bank data</p>;
    }
  
    const lastAccount = bankAccounts[bankAccounts.length - 1];
  
    return (
      <div className={styles.container}>
        <h2 className={styles.title}>{lastAccount.name}</h2>
        <p className={styles.info}>Account Id: <span className={styles.bold}>({lastAccount.id})</span></p>
        <p className={styles.info}>Type: <span className={styles.bold}>{lastAccount.type} ({lastAccount.subtype})</span></p>
        <p className={styles.info}>Status: <span className={styles.bold}>{lastAccount.status}</span></p>
        <p className={styles.info}>Institution: <span className={styles.bold}>{lastAccount.institution.name}</span></p>
        <p className={styles.info}>Last Four Digits: <span className={styles.bold}>{lastAccount.last_four}</span></p>
        <p className={styles.info}>Currency: <span className={styles.bold}>{lastAccount.currency}</span></p>
  
      </div>
    );
  };
  

export default BankDetail