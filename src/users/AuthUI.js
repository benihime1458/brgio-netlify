import React, {useState} from 'react'
import {Paper, TextField, Button, Tabs, Tab} from '@material-ui/core'
import './AuthUI.css'
import fire from './Fire'

export default AuthUI => {
  const [index, setIndex] = useState(0)
  const [input, setInput] = useState({email: '', username: '', password: '', confirmPassword: ''})

  const login = e => {
    e.preventDefault()
    fire.auth().signInWithEmailAndPassword(input.email, input.password).then(u => console.log(u)).catch(error => console.log(error))
  }

  const signup = async e => {
    e.preventDefault()

    const res = await fetch('/.netlify/functions/getAllProblems')
    const problems = await res.json()
    console.log('problems: ', problems)
    
    let newUser = {username: input.username, email: input.email, problemLog: problems}



    fire.auth().createUserWithEmailAndPassword(input.email, input.password).then(u => console.log(u)).catch(error => console.log(error.message))
  }

  return (
    <Paper className='paper'>
      <Tabs
        className='tabs'
        value={index}
        variant='fullWidth'
        indicatorColor='primary'
        textColor='primary'
        centered
      >
        <Tab 
          label='Login'
          onClick={() => setIndex(0)}
        />
        <Tab 
          label='Sign Up'
          onClick={() => setIndex(1)}
        />
      </Tabs>
      <form onSubmit={index === 0 ? login : signup}>

        {
          index === 1 ? <TextField 
          className='formfield'
          label='Desired Username'
          type='string'
          value={input.username}
          onChange={(e) => setInput({...input, username: e.target.value})}
          variant='filled'
        /> : null
        }

        <TextField 
        className='formfield'
          label='Email'
          type='email'
          value={input.email}
          onChange={(e) => setInput({...input, email: e.target.value})}
          variant='filled'
        />
        <TextField 
        className='formfield'
          label='Password'
          type='password'
          value={input.password}
          onChange={(e) => setInput({...input, password: e.target.value})}
          variant='filled'
        />
        {
          index === 1 ? <TextField 
          className='formfield'
          label='Confirm Password'
          type='password'
          value={input.confirmPassword}
          onChange={(e) => setInput({...input, confirmPassword: e.target.value})}
          variant='filled'
        /> : null
        }
        <Button color='primary' type='submit' variant='contained' fullWidth>{index === 0 ? "Login" : "Sign Up"}</Button>
      </form>
    </Paper>
  )
}