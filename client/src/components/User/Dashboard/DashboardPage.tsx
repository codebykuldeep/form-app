import React from "react";
import styles from "./dashboard-page.module.css";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";

const DashboardPage = () => {
  const { user, kyc, bank } = useSelector((state:RootState)=>state.userSlice)!;
  const bankAccounts = JSON.parse(bank!.bank_data);

  return (
    <div className={styles.container}>
      <div className={styles.layout}>
      <div className={styles.detail}>
            <div className={styles.section}>
                <h2>User Information</h2>
                <p><strong>Name:</strong> {user!.first_name} {user!.last_name}</p>
                <p><strong>Email:</strong> {user!.email}</p>
                <p><strong>Contact:</strong> {user!.contact}</p>
                <p><strong>Date of Birth:</strong> {user!.dob}</p>
            </div>

            <div className={styles.section}>
                <h2>KYC Details</h2>
                <p><strong>Address:</strong> {kyc!.address}</p>
                <p><strong>Occupation:</strong> {kyc!.occupation}</p>
                <p><strong>Document ID:</strong> {kyc!.document_id}</p>
            </div>
        </div>

      <div className={styles.section}>
        <h2>Bank Accounts</h2>
        {bankAccounts.map((account:any) => (
          <div key={account.id} className={styles.bankAccount}>
            <p><strong>Bank:</strong> {account.institution.name}</p>
            <p><strong>Account Type:</strong> {account.type} - {account.subtype}</p>
            <p><strong>Last Four Digits:</strong> {account.last_four}</p>
            <p><strong>Currency:</strong> {account.currency}</p>
          </div>
        ))}
      </div>

      </div>
    </div>
  );
};

export default DashboardPage;
