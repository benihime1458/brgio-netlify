import mongoose from 'mongoose';
import db from './server';
import User from './userModel';
exports.handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false
  switch (event.httpMethod) {
    case 'GET':
      let {username, email} = event.queryStringParameters
      
      // query all users if there are no queryStringParameters
      if (!username && !email) {
        const users = await User.find()
        return {
          statusCode: 200,
          body: JSON.stringify({
            msg: "all users found",
            data: users
          })
        }
      }

      // query user by...
      let user
      // username
      if (username) {
        user = await User.findOne({username: username})
      }
      // email
      if (email) {
        user = await User.findOne({email: email})
      }
  
      if (user) {
        return {
          statusCode: 200,
          body: JSON.stringify({
            msg: "user found",
            data: user
          })
        }
      } else {
        return {
          statusCode: 404,
          body: JSON.stringify({
            msg: "User not found",
            data: "User not found"
          })
        }
      }
    case 'POST':
      const post  = JSON.parse(event.body)
      const newUser = {...post}

      await User.create(newUser).then(console.log('user created in db'))
      return {
        statusCode: 200,
        body: JSON.stringify({
          msg: "User created",
          data: newUser
        })
      }
    case 'PUT':
      const put  = JSON.parse(event.body)
      const currentUser = {...put}

      await User.updateOne(currentUser).then(console.log('user updated'))
      return {
        statusCode: 200,
        body: JSON.stringify({
          msg: "User updated",
          data: currentUser
        })
      }
    default: 
      console.log('default')
  }
}