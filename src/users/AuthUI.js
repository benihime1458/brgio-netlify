import React, {useState} from 'react'
import {useForm} from 'react-hook-form'
import {Paper, TextField, Button, Tabs, Tab, Typography} from '@material-ui/core'
import './AuthUI.css'
import fire from './Fire'

export default AuthUI => {
  const {register, errors, getValues, handleSubmit} = useForm(
    {
      mode: 'onSubmit',
      reValidateMode: 'onBlur',
    }
  )
  const [index, setIndex] = useState(0)

  const submitForm = form => {
    index === 0 ? login(form) : signup(form)
  }
  // if index === 0 => Login
    // fire auth login (form.email, form.password)
  // if index === 1 => Signup
    // fire auth sign up (form)

  const infoCheck = async (query, param) => {
    const response = await fetch(`/.netlify/functions/getUser?${query}=${param}`)

    if (query === 'username') {
      const {data: {username}} = await response.json()
      return username === param ? "username not available" : true
    }
    if (query === 'email') {
      const {data: {email}} = await response.json()
      return email === param ? "email not available" : true
    }
  }

  const login = ({email, password}) => {
    // e.preventDefault()
    fire.auth().signInWithEmailAndPassword(email, password).then(u => console.log(u)).catch(error => console.log(error))
  }

  const signup = async ({username, email, password}) => {
    const res = await fetch('/.netlify/functions/getAllProblems')
    const problems = await res.json()
    console.log('problems: ', problems)
    
    let newUser = {username: username, email: email, problemLog: problems.data}

    // fire.auth().createUserWithEmailAndPassword(email, password).catch(error => console.log(error.message))

    const createNewUser = await fetch(`/.netlify/functions/getUser`, {method: 'POST', headers: {
      'Content-Type': 'application/json'
    }, body: JSON.stringify(newUser)})
    const data = await createNewUser.json()
    console.log(data.data)
  }
  
  return (
    <Paper className='paper'>
      <Typography
        align='center'
        variant='h1'
        gutterBottom
      >brg.io</Typography>
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
          inputRef={register({required: true, minLength: {value:6, message: 'Must be at least 6 characters'}, maxLength: {value: 20, message: 'Cannot be longer than 20 characters'}, pattern: { value: /^[a-zA-Z0-9]*$/i, message: 'Can only contain alphanumeric characters'}, validate: (value) => (value.length > 5 && value.length < 21 && index === 1) ? infoCheck('username', value) : true})}
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
          inputRef={register({required: true, pattern: {value: /^\S+@\S+$/i, message: 'Invalid email format'}, validate: (value) => (index === 1) ? infoCheck('email', value) : true})}
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