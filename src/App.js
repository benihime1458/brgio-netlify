import React, { useState, useEffect } from 'react';
import AuthUI from './users/AuthUI'
import ClimbsTable from './components/ClimbsTable';
import './App.css';

export default App => {
  const [problems, setProblems] = useState([])

  useEffect(() => {

    async function getClimbs() {
      const res = await fetch('/.netlify/functions/getAllProblems')
      const data = await res.json()
      console.log(data.data)
      setProblems(data.data)

    }

    async function getUser(test) {
        const res = await fetch(`/.netlify/functions/getUser?username=${test}`)
        const data = await res.json()
        console.log(data.data)
    }

    // getClimbs()
    // getUser('beihime1458')
    // getUser('benihime1458')
  }, []);

  return (
    <div className='root'>
      <div className='content'>
        <AuthUI />
        {/* {problems.length > 0 ? <ClimbsTable problems={problems}/> : console.log(problems)} */}
      </div>
    </div>
  )
}