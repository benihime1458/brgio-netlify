import mongoose from 'mongoose';
import db from './server';
import Problem from './problemModel';

exports.handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false

  // const id = JSON.parse(event.body)
  // Problem.findOneAndDelete({ _id: id }).then(() => {
  //   const response = {
  //     msg: "Problem successfully deleted"
  //   }

  //   return {
  //     statusCode: 201,
  //     body: JSON.stringify(response)
  //   }
  // }).catch((err) => {
  //   console.log('climb.delete', err) // output to netlify function log
  //   return {
  //     statusCode: 500,
  //     body: JSON.stringify({ msg: err.message })
  //   }
  // })

  // if (deleteOne) {
  //   const response = {
  //     msg: "Problem successfully deleted"
  //   }

  //   return {
  //     statusCode: 201,
  //     body: JSON.stringify(response)
  //   }
  // }


  try {
    // Parse the ID
    const id = JSON.parse(event.body),
      response = {
        msg: "Climb successfully deleted"
      }

    await Problem.findOneAndDelete({ _id: id })

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