import React, { Component } from 'react';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
// components
import Landing from '../components/Landing'
import Networthgraph from '../components/Networthgraph';
import Profile from '../components/Profile';
// redux stuff
import { connect } from 'react-redux'


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
    const { authenticated } = this.props
    return (

      <div>
        {authenticated ? (
          <Grid container spacing={8}>
            <Grid item sm={8} xs={12}>
              <Networthgraph />
            </Grid >
            <Grid item sm={4} xs={12}>
              <Profile />
            </Grid>
          </Grid >
        ) : (
            <Landing />
          )
        }
      </div>

    )
  }
}

home.propTypes = {
  authenticated: PropTypes.bool.isRequired
}

const mapStateToProps = (state) => ({
  authenticated: state.user.authenticated
})

export default connect(mapStateToProps)(home)

