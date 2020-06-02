import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import MyButton from '../utilities/MyButton';
import EditDetails from './EditDetails';
// MUI stuff
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
// Icons
import HomeIcon from '@material-ui/icons/Home';
import KeyboardReturn from '@material-ui/icons/KeyboardReturn';
// redux stuff
import { logoutUser } from '../redux/actions/userActions';

class navbar extends Component {
  handleLogout = () => {
    this.props.logoutUser();
  };

  render() {
    const { authenticated } = this.props
    return (
      <AppBar>
        <Toolbar className='nav-container'>
          {authenticated ? (
            <Fragment>
              <Link to="/">
                <MyButton tip="Home">
                  <HomeIcon />
                </MyButton>
                <EditDetails />
              </Link>
              <MyButton tip="Logout" onClick={this.handleLogout}>
                <KeyboardReturn color="primary" />
              </MyButton>
            </Fragment>
          ) : (<Fragment>
            <Button color='inherit' component={Link} to='/login'>Login</Button>
            <Button color='inherit' component={Link} to='/'>Home</Button>
            <Button color='inherit' component={Link} to='/signup'>Signup</Button>
          </Fragment>
            )
          }
        </Toolbar>
      </AppBar >
    )
  }
}

navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  authenticated: PropTypes.bool.isRequired
}

const mapStateToProps = (state) => ({
  authenticated: state.user.authenticated
})

const mapActionsToProps = { logoutUser }

export default connect(mapStateToProps, mapActionsToProps)(navbar)

