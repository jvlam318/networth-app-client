import React, { Component } from 'react'
import { Link } from 'react-router-dom';
// mui stuff
import Button from '@material-ui/core/Button';

class Landing extends Component {
  render() {
    return (
      <div>
        <h1>Landing Page</h1>
        <Button variant='contained' color='primary' component={Link} to='/login'>
          Login
            </Button>
        <Button variant='contained' color='secondary' component={Link} to='/signup'>
          Signup
            </Button>
      </div>
    )
  }
}

export default Landing

