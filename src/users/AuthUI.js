import React, {useState} from 'react'
import {useForm} from 'react-hook-form'
import {Paper, TextField, Button, Tabs, Tab} from '@material-ui/core'
import './AuthUI.css'
import fire from './Fire'

export default AuthUI => {
  const {register, errors, getValues, handleSubmit} = useForm(
    {
      mode: 'onChange',
      reValidateMode: 'onChange',
    }
  )
  const [index, setIndex] = useState(0)

  const submitForm = data => console.log(data)

  // const login = e => {
  //   e.preventDefault()
  //   fire.auth().signInWithEmailAndPassword(input.email, input.password).then(u => console.log(u)).catch(error => console.log(error))
  // }

  // const signup = async e => {
  //   e.preventDefault()

  //   const res = await fetch('/.netlify/functions/getAllProblems')
  //   const problems = await res.json()
  //   console.log('problems: ', problems)
    
  //   let newUser = {username: input.username, email: input.email, problemLog: problems}

  //   fire.auth().createUserWithEmailAndPassword(input.email, input.password).then(u => console.log(u)).catch(error => console.log(error.message))
  // }
  
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
      <form onSubmit={handleSubmit(submitForm)}>

        {
          index === 1 ? <TextField 
          className='formfield'
          label='Desired Username'
          type='text'
          inputRef={register({required: true, minLength: {value:6, message: 'Must be at least 6 characters'}, maxLength: {value: 20, message: 'Cannot be longer than 20 characters'}, pattern: { value: /^[a-zA-Z0-9]*$/i, message: 'Can only contain alphanumeric characters'}})}
          name='username'
          error={!!errors.username}
          variant='filled'
          helperText={errors.username && errors.username.message}
        /> : null
        }

        <TextField 
          className='formfield'
          label='Email'
          type='email'
          inputRef={register({required: true, pattern: {value: /^\S+@\S+$/i, message: 'Invalid email format'}})}
          name='email'
          error={!!errors.email}
          variant='filled'
          helperText={errors.email && errors.email.message}
        />
        <TextField 
          className='formfield'
          label='Password'
          type='password'
          inputRef={register({required: true, minLength: {value:6, message: 'Must be at least 6 characters'}})}
          name='password'
          error={!!errors.password}
          variant='filled'
          helperText={errors.password && errors.password.message}
        />
        {
          index === 1 ? <><TextField 
          className='formfield'
          label='Confirm Password'
          type='password'
          inputRef={register({required: true, validate: (value) => value === getValues('password')})}
          name='confirmPassword'
          error={!!errors.confirmPassword}
          variant='filled'
          helperText={errors.confirmPassword && "Passwords do not match"}
        /> 
        </>
        : null
        }
        <Button color='primary' type='submit' variant='contained' fullWidth>{index === 0 ? "Login" : "Sign Up"}</Button>
      </form>
    </Paper> )
}