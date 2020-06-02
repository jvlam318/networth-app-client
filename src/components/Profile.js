import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import { Link } from 'react-router-dom';
// MUI stuff

import MuiLink from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
// redux stuff
import { connect } from 'react-redux';

const styles = (theme) => ({
  ...theme.spreadThis
})

class Profile extends Component {
  render() {
    const { classes, user: { credentials: { userName, goal }, loading } } = this.props
    let profileMarkup = !loading ? (
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

        </div>
      </Paper>
    ) : (<p>loading...</p>);

    return profileMarkup;
  }
}

const mapStateToProps = (state) => ({
  user: state.user
});

Profile.propTypes = {
  user: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
}

export default connect(mapStateToProps)(withStyles(styles)(Profile))
