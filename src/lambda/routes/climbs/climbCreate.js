import mongoose from 'mongoose';
import db from '../../server';
import Climb from '../../models/climbModel';

exports.handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false

  try {
    const data = JSON.parse(event.body),
      area = data.area,
      number = data.number,
      color = data.color,
      grade = data.grade,
      dateSet = data.dateSet,
      wcw = data.wcw,
      dyno = data.dyno,
      response = {
        msg: "Climb successfully created",
        data: climb
      }

    await Climb.create(climb)
    return {
      statusCode: 201,
      body: JSON.stringify(response)
    }
  } catch (err) {
    console.log('product.create', err) // output to netlify function log
    return {
      statusCode: 500,
      body: JSON.stringify({ msg: err.message })
    }
  }
}
