import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import { Link } from 'react-router-dom';
import EditDetails from './EditDetails';
import MyButton from '../utilities/MyButton';
// MUI stuff
import Button from '@material-ui/core/Button';
import MuiLink from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
// icons
import KeyboardReturn from '@material-ui/icons/KeyboardReturn';
// redux stuff
import { connect } from 'react-redux';
import { logoutUser } from '../redux/actions/userActions';


const styles = (theme) => ({
  paper: {
    padding: 20
  },
  profile: {
    '& .image-wrapper': {
      textAlign: 'center',
      position: 'relative',
      '& button': {
        position: 'absolute',
        top: '80%',
        left: '70%'
      }
    },
    '& .profile-image': {
      width: 200,
      height: 200,
      objectFit: 'cover',
      maxWidth: '100%',
      borderRadius: '50%'
    },
    '& .profile-details': {
      textAlign: 'center',
      '& span, svg': {
        verticalAlign: 'middle'
      },
      '& a': {
        color: theme.palette.primary.main
      }
    },
    '& hr': {
      border: 'none',
      margin: '0 0 10px 0'
    },
    '& svg.button': {
      '&:hover': {
        cursor: 'pointer'
      }
    }
  },
  buttons: {
    textAlign: 'center',
    '& a': {
      margin: '20px 10px'
    }
  }
});

class Profile extends Component {
  handleLogout = () => {
    this.props.logoutUser();
  };

  render() {
    const { classes, user: { credentials: { userName, createdAt, goal }, loading, authenticated } } = this.props
    let profileMarkup = !loading ? (authenticated ? (
      <Paper className={classes.paper}>
        <div className={classes.profile}>
          <div className="profile-details">
            <Fragment>
              <MuiLink component={Link} to={`/users/${userName}`} color='primary' variant='h5'>
                {userName}
              </MuiLink>
              <hr />
            </Fragment>
            <Fragment>
              Goal: {goal && <Typography variant='body2'>{goal}</Typography>}
              <hr />
            </Fragment>
          </div>
          <MyButton tip="Logout" onClick={this.handleLogout}>
            <KeyboardReturn color="primary" />
          </MyButton>
          <EditDetails />
        </div>
      </Paper>
    ) : (
        <Paper className={classes.paper}>
          <Typography variant='body2' align='center'>
            No profile found, please login again</Typography>
          <div className={classes.buttons}>
            <Button variant='contained' color='primary' component={Link} to='/login'>
              Login
            </Button>
            <Button variant='contained' color='secondary' component={Link} to='/signup'>
              Signup
            </Button>
          </div>
        </Paper>
      )) : (<p>loading...</p>);

    return profileMarkup;
  }
}

const mapStateToProps = (state) => ({
  user: state.user
});

const mapActionsToProps = { logoutUser }

Profile.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Profile))
