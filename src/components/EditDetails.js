import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import MyButton from '../utilities/MyButton';
// redux stuff
import { connect } from 'react-redux';
import { editUserDetails } from '../redux/actions/userActions';

// mui stuff
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
// icons
import EditIcon from '@material-ui/icons/Edit';

const styles = (theme) => ({
  ...theme.spreadThis
})

class EditDetails extends Component {
  state = {
    goal: 0,
    open: false
  };
  mapUserDetailsToState = (credentials) => {
    this.setState({
      goal: credentials.goal ? credentials.goal : null
    });
  }
  handleOpen = () => {
    this.setState({ open: true });
    this.mapUserDetailsToState(this.props.credentials);
  }
  handleClose = () => {
    this.setState({ open: false })
  }
  componentDidMount() {
    const { credentials } = this.props;
    this.mapUserDetailsToState(credentials);
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }
  handleSubmit = () => {
    const userDetails = {
      goal: this.state.goal
    }
    this.props.editUserDetails(userDetails);
    this.handleClose();
  }
  render() {
    const { classes } = this.props;
    return (
      <Fragment>
        <MyButton tip="Edit details" onClick={this.handleOpen} btnClassName={classes.button}>
          <EditIcon color="primary" />
        </MyButton>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm">
          <DialogTitle>Edit your details</DialogTitle>
          <DialogContent>
            <form>
              <TextField
                name="goal"
                type="number"
                label="Goal"
                placeholder="Enter your target networth"
                className={classes.textField}
                value={this.state.goal}
                onChange={this.handleChange}
                fullWidth
              />
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleSubmit} color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    )
  }
}

const mapStateToProps = (state) => ({
  credentials: state.user.credentials
})

EditDetails.propTypes = {
  editUserDetails: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired
}

export default connect(mapStateToProps, { editUserDetails })(withStyles(styles)(EditDetails));
