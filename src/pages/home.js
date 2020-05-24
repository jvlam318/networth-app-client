import React, { Component } from 'react';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
// components
import Networthgraph from '../components/Networthgraph';
import Profile from '../components/Profile';

class home extends Component {
  state = {
    networthHistory: null
  }

  componentDidMount() {
    axios.get('/networthHistory')
      .then(res => {
        this.setState({
          networthHistory: res.data
        })
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <Grid container spacing={8}>
        <Grid item sm={8} xs={12}>
          <Networthgraph />
        </Grid>
        <Grid item sm={4} xs={12}>
          <Profile />
        </Grid>
      </Grid>
    )
  }
}

export default home

