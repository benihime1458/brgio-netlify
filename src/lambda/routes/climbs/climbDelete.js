import mongoose from 'mongoose';
import db from '../../server';
import Climb from '../../models/climbModel';

exports.handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false

  try {
    // Parse the ID
    const id = JSON.parse(event.body),
      response = {
        msg: "Climb successfully deleted"
      }

    await Climb.findOneAndDelete({ _id: id })

    return {
      statusCode: 201,
      body: JSON.stringify(response)
    }
  } catch (err) {
    console.log('climb.delete', err) // output to netlify function log
    return {
      statusCode: 500,
      body: JSON.stringify({ msg: err.message })
    }
  }
}