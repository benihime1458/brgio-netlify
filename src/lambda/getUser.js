import mongoose from 'mongoose';
import db from './server';
import User from './userModel';

exports.handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false
  const username = event.queryStringParameters.username

  const user = await User.findOne({username: username}).catch((err) => {
    console.log('error fetching user')

    return {
      statusCode: 500,
      body: JSON.stringify({msg: err})
    }
  })

  if (user) {
    
    const response = {
      msg: "user found",
      data: user
    }

    return {
      statusCode: 200,
      body: JSON.stringify(response)
    }
  }

  else {
    return {
      statusCode: 500,
      body: "User not found"
    }
  }
}
