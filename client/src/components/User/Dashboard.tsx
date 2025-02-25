import React from 'react'
import DashboardPage from './Dashboard/DashboardPage'
import LogoutIcon from '@mui/icons-material/Logout';
import styles from './Dashboard/dashboard-page.module.css';
import { useNavigate } from 'react-router-dom';
import { removeToken } from '../../utils/auth-utils';

function Dashboard() {
  const navigate= useNavigate();

  function handleLogout(){
    removeToken();
    navigate('/');
  }
  return (
    <div>
      <div className={styles.header}>
        <h1 >Dashboard</h1>
        <button onClick={handleLogout}><LogoutIcon/></button>
      </div>
      <DashboardPage/>
    </div>
  )
}

export default Dashboard