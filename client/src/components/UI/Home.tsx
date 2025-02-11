import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../store/store'
import { Link } from 'react-router-dom';

function Home() {
    const user = useSelector((state:RootState)=>state.userSlice.user);
  return (
    <div>
        <div>Home</div>
    {user && <Link to={'/user'}>Dashboard</Link>}
    {!user && <Link to={'/login'}>Login</Link>}
    </div>
  )
}

export default Home