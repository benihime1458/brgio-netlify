import React, { useState, useEffect } from 'react';
import './App.css';
import AuthUI from './users/AuthUI'
import ClimbsTable from './components/ClimbsTable';

export default App => {
  const [problems, setProblems] = useState([])

  useEffect(() => {

    async function getClimbs() {
      const res = await fetch('/.netlify/functions/getAllProblems')
      const data = await res.json()
      console.log(data.data)
      setProblems(data.data)

    }
    // fetch('/.netlify/functions/getAllProblems')
    //   .then(res => res.json())
    //   .then(res => {
    //     console.log(res.data[0])
    //     setProblems(res.data)
    //   })
    //   .catch(err => console.log('Error retrieving climbs: ', err))
    async function getUser(test) {
      const res = await fetch(`/.netlify/functions/getUser?username=${test}`)
      const data = await res.json()
      console.log(data.data)
    }

    getClimbs()
    getUser('benihime1458')
  }, []);

  return (
    <div className='content'>
      {/* {problems.length > 0 ? <ClimbsTable problems={problems}/> : console.log(problems)} */}
      <AuthUI />
    </div>
  )
}