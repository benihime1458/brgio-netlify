import React from 'react'
import {AppBar, Toolbar, Typography, Button} from '@material-ui/core'
import fire from '../users/Fire'
import './Navbar.css'

export default props => {
  const user = props.user

  return (
    <>
    <AppBar
      position='fixed'
    >
      <Toolbar className='toolbar'>
      {user ? 
      <Button 
        style={{margin: 10}} 
        variant='contained' 
        color='secondary' 
        onClick={() => fire.auth().signOut()}
      >Logout: {user.username}</Button> 
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