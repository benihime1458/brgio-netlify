import mongoose from 'mongoose';
import db from '../../server';
import Climb from '../../models/climbModel';

exports.handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false

  try {
    // Parse the ID
    const data = JSON.parse(JSON.parse(event.body)),
      id = data.id,
      climb = data.climb,
      response = {
        msg: "Climb successfully updated",
        data: climb
      }

    await Climb.findOneAndUpdate({ _id: id }, climb)

    return {
      statusCode: 201,
      body: JSON.stringify(response)
    }
  } catch (err) {
    console.log('climb.update', err) // output to netlify function log
    return {
      statusCode: 500,
      body: JSON.stringify({ msg: err.message })
    }
  }
}