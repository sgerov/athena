import React from 'react';
import { connect } from "react-redux";
import { urlAutocomplete, urlChange, addUrl } from "../actions/";
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import Input, { InputLabel, InputAdornment } from 'material-ui/Input';
import AddIcon from 'material-ui-icons/Add';
import { FormControl, FormHelperText } from 'material-ui/Form';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';

class FormDialog extends React.Component {
  constructor(props) {
    super(props)

    this.handleAutocomplete = this.handleAutocomplete.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.state = {
      open: false,
    };
  }

  handleClickOpen() {
    this.setState({ open: true });
  };

  handleClose() {
    this.setState({ open: false });
  };

  handleAutocomplete(event) {
    this.props.urlAutocomplete(event.target.value)
  }

  handleChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.props.urlChange(name, value)
  }

  handleSubmit(event) {
    this.props.addUrl(this.props.url)
    this.setState({ open: false })
  }

  render() {
    const { url } = this.props

    return (
      <div>
        <br />
        <Button fab mini color="default" aria-label="add" onClick={this.handleClickOpen}>
          <AddIcon />
        </Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Add online resource</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Paste the url below for autocomplete
            </DialogContentText>
            <DialogContentText>
            </DialogContentText>
            <TextField
              margin="dense"
              id="url"
              name="url"
              label="Url"
              type="text"
              fullWidth
              onChange={this.handleAutocomplete}
            />
            <TextField
              margin="dense"
              id="summary"
              name="summary"
              value={url.summary}
              label="Summary"
              type="text"
              fullWidth
              onChange={this.handleChange}
            />
            <TextField
              margin="dense"
              id="score"
              name="score"
              value={url.score}
              label="Score"
              type="number"
              fullWidth
              onChange={this.handleChange}
            />
            <TextField
              margin="dense"
              id="title"
              name="title"
              value={url.title}
              label="Title"
              type="text"
              fullWidth
              onChange={this.handleChange}
            />
            <TextField
              margin="dense"
              id="paragraph"
              name="paragraph"
              value={url.paragraph}
              label="First paragraph"
              type="text"
              fullWidth
              onChange={this.handleChange}
            />
            <FormControl
              aria-describedby="weight-helper-text"
            >
              <Input
                id="preview"
                name="preview"
                value={url.preview}
                onChange={this.handleChange}
                endAdornment={<InputAdornment position="end"><img src={url.preview} width="200" /></InputAdornment>}
              />
              <FormHelperText id="weight-helper-text">Preview</FormHelperText>
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="secondary">
              Cancel
            </Button>
            <Button onClick={this.handleSubmit} color="secondary">
              Add
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export const NewUrlContainer = connect(
  function mapStateToProps(state) {
    return {
      url: state.newUrl
    };
  },
  function mapDispatchToProps(dispatch) {
    return {
      urlAutocomplete: url => {
        dispatch(urlAutocomplete(url))
      },
      urlChange: (attr, value) => {
        dispatch(urlChange(attr, value))
      },
      addUrl: url => {
        dispatch(addUrl(url));
      },
    };
  }
)(FormDialog);

export default NewUrlContainer;
