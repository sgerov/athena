import React from 'react';
import { connect } from "react-redux";
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';
import { login, logout } from "../actions/";

class LoginDialog extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      open: false,
    }

    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleClickOpen() {
    if(this.props.currentUser.user_id) {
      this.props.logout()
    } else {
      this.setState({ open: true });
    }
  };

  handleClose() {
    this.setState({ open: false });
  };

  handleChange(event) {
    this.setState({ password: event.target.value })
  }

  handleSubmit(event) {
    this.props.login(this.state.password)

    this.setState({ open: false })
  }

  render() {
    return (
      <div>
        <Button raised onClick={this.handleClickOpen}>{this.props.currentUser.user_id ? 'Logout' : 'Login'}</Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Login</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please enter your password below
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="password"
              label="Password"
              type="password"
              fullWidth
              onChange={this.handleChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleSubmit} color="primary">
              Login
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export const LoginContainer = connect(
  function mapStateToProps(state) {
    return {
      currentUser: state.currentUser,
    };
  },

  function mapDispatchToProps(dispatch) {
    return {
      login: password => {
        dispatch(login(password));
      },
      logout: () => {
        dispatch(logout());
      },
    };
  }
)(LoginDialog);

export default LoginContainer;
