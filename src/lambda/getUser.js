import mongoose from 'mongoose';
import db from './server';
import User from './userModel';

exports.handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false
  const username = event.queryStringParameters.username

  const user = await User.findOne({username: username})

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