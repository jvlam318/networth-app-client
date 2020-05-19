import React, { Component } from 'react';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import Networthgraph from '../components/Networthgraph';

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
    let networthHistory = this.state.networthHistory ? networthHistory : <p>Loading...</p>
    return (
      <Grid container spacing={8}>
        <Grid item sm={8} xs={12}>
          <Networthgraph networthHistory={networthHistory} />
        </Grid>
        <Grid item sm={4} xs={12}>
          <p>Summary</p>
        </Grid>
      </Grid>
    )
  }
}

export default home

