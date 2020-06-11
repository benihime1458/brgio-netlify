import mongoose from 'mongoose';
import db from './server';
import Problem from './problemModel';

exports.handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false

  const problems = await Problem.find().catch((err) => {
    console.log('error fetching problems')

    return {
      statusCode: 500,
      body: JSON.stringify({msg: err.message})
    }
  })

  if (problems) {
    
    const response = {
      msg: "Climbs successfully found",
      data: problems
    }

    return {
      statusCode: 200,
      body: JSON.stringify(response)
    }
  }
}
