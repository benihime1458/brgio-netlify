import React from 'react'
import {LinearProgress} from '@material-ui/core'
import './Loading.css'

export default Loading => {
  return (
    <div className='loading'>
      <LinearProgress />
    </div>
  )
}