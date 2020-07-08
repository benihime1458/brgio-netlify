import React, { useState, useEffect } from 'react';
import AuthUI from './users/AuthUI'
import Navbar from './components/Navbar'
import ClimbsTable from './components/ClimbsTable';
import './App.css';
import fire from './users/Fire';

export default App => {
  const [user, setUser] = useState(null)
  useEffect(() => {

    fire.auth().onAuthStateChanged(function(user) {
      let email 
      if (user) {
        // User is signed in.
        email = user.email
        getUser(email)
      } else {
        // No user is signed in.
        setUser(null)
      }
    });

    async function getUser(email) {
        const res = await fetch(`/.netlify/functions/users?email=${email}`)
        const user = await res.json()
        setUser(user.data)
    }

  }, []);

  return (
    <div className='root'>
      <div className='content'>
        <Navbar user={user}/>
        {!user ? <AuthUI /> : null}
        {user ? <ClimbsTable problems={user.problemLog} /> : null}
      </div>
    </div>
  )
}