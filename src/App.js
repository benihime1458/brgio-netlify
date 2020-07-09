import React, { useState, useEffect, useMemo } from 'react';
import { UserContext } from './context/user-context'
import AuthUI from './users/AuthUI'
import Navbar from './components/Navbar'
import Loading from './components/Loading'
import ClimbsTable from './components/ClimbsTable';
import './App.css';
import fire from './users/Fire';

export default App => {
  const [user, setUser] = useState({loading: false, data: null})

  useEffect(() => {

    fire.auth().onAuthStateChanged(function(user) {
      let email 
      if (user) {
        // User is signed in.
        setUser({loading: true, data: null})
        email = user.email
        setTimeout(() => getUser(email), 2000)
      } else {
        // No user is signed in.
        setUser({loading: false, data: null})
      }
    });

    async function getUser(email) {
        const res = await fetch(`/.netlify/functions/users?email=${email}`)
        const userByEmail = await res.json()
        setUser({loading: false, data: userByEmail.data})
    }

  }, []);

  const UserStore = useMemo(() => ({user, setUser}), [user])

  return (
    <div className='root'>
      <div className='content'>
        <UserContext.Provider value={UserStore}>
          <Navbar user={user.data}/>
          {!user.data && !user.loading ? <AuthUI /> : null}
          {user.loading ? <Loading /> : null }
          {!user.loading && user.data ? <ClimbsTable /> : null}
        </UserContext.Provider>
      </div>
    </div>
  )
}