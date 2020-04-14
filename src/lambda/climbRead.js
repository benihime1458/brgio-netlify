import mongoose from 'mongoose';
import db from './server';
import Climb from './climbModel';

exports.handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false

  try {
    const climbs = await Climb.find(),
      response = {
        msg: "Climbs successfully found",
        data: climbs
      }

    return {
      statusCode: 200,
      body: JSON.stringify(response)
    }

  } catch (err) {
    console.log(err) // output to netlify function log
    return {
      statusCode: 500,
      body: JSON.stringify({ msg: err.message })
    }
  }
}
