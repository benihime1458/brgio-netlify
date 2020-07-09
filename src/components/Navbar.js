import React from 'react'
import {AppBar, Toolbar, Typography, Button} from '@material-ui/core'
import fire from '../users/Fire'
import './Navbar.css'



export default props => {
  const user = props.user

  const updateProblemLog = async () => {
    let {_id, problemLog } = user
    const response = await fetch(`/.netlify/functions/users/`, {method: 'PUT', headers: {
      'Content-Type': 'application/json'
    }, body: JSON.stringify({id: _id, problemLog: problemLog})})

    const data = await response.json()
    console.log(data.data)
  }

  return (
    <>
    <AppBar
      position='fixed'
    >
      <Toolbar className='toolbar'>
      <Typography variant='h6' style={{flex: 1}}>brg.io</Typography>
      {user ? 
      <>
      <Button 
        style={{margin: 10}} 
        variant='contained' 
        onClick={updateProblemLog}
      >Log User Problem Log: {user.username}</Button> 
      <Button 
        style={{margin: 10}} 
        variant='contained' 
        color='secondary' 
        onClick={() => fire.auth().signOut()}
      >Logout: {user.username}</Button>
      </> 
      : 
      <Button 
        style={{margin: 10}} 
        variant='contained'
      >Demo</Button>}
      </Toolbar>
    </AppBar>
    </>
  )
}