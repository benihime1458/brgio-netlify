import mongoose from 'mongoose';
import db from './server';
import Problem from './problemModel';

exports.handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false

  const data = JSON.parse(event.body)
  const problem = {...data, _v: 0}

  const create = await Problem.create(problem).catch((err) => {
    console.log('error fetching problems')

    return {
      statusCode: 500,
      body: JSON.stringify({ msg: err.message })
    }
  })

  if (create) {
    const response = {
      msg: "Problem succesffuly created",
      data: problem
    }

    return {
      statusCode: 200,
      body: JSON.stringify(response)
    }
  }
  
  // try {
  //   const data = JSON.parse(event.body),
  //   problem = {...data, _v: 0},
  //     response = {
  //       msg: "Climb successfully created",
  //       data: problem
  //     }

  //   await Problem.create(problem)
  //   return {
  //     statusCode: 201,
  //     body: JSON.stringify(response)
  //   }
  // } catch (err) {
  //   console.log('product.create', err) // output to netlify function log
  //   return {
  //     statusCode: 500,
  //     body: JSON.stringify({ msg: err.message })
  //   }
  // }
}
