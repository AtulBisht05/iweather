import React, { Component } from 'react'
import Triplex from './assets/Triplex.gif'

export default class Spinner extends Component {
  render() {
    return (
      <div className='spinner'>
        <img src={Triplex} alt="Loading..."/>
      </div>
    )
  }
}
