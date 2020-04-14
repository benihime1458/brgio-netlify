// App.js
import React, { useState, useEffect } from 'react';
import './App.css';

import ClimbsTable from './components/ClimbsTable';

export default App => {
  const [problems, setProblems] = useState([])

  useEffect(() => {

    // async function getClimbs() {
    //   const res = await fetch('/.netlify/functions/climbRead')
    //   const data = await res.json()
    //   console.log(data.data)
    //   setProblems(data.data)

    // }
    fetch('/.netlify/functions/climbRead')
      .then(res => res.json())
      .then(res => {
        setProblems(res.data)
      })
      .catch(err => console.log('Error retrieving climbs: ', err))
    // getClimbs()
  }, []);

  return (
    <div>
      {/* <ClimbsTable problems={problems}/> */}
      {problems.length > 0 ? <ClimbsTable problems={problems}/> : console.log(problems)}
    </div>
  )
}