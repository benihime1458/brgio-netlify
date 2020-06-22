import mongoose from 'mongoose';
import db from './server';
import User from './userModel';
exports.handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false
  const {username, email} = event.queryStringParameters

  let user
  
  if (username) {
    user = await User.findOne({username: username})
  }

  if (email) {
    user = await User.findOne({email: email})
  }

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


}