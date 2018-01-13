import React from 'react';
import { connect } from "react-redux";
import { bookAutocomplete, bookChange, addBook } from "../actions/";
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import Input, { InputLabel, InputAdornment } from 'material-ui/Input';
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
		this.props.bookAutocomplete(event.target.value)
	}

	handleChange(event) {
		const target = event.target;
		const value = target.type === 'checkbox' ? target.checked : target.value;
		const name = target.name;

		this.props.bookChange(name, value)
	}

	handleSubmit(event) {
		this.props.addBook(this.props.book)
		this.setState({ open: false })
	}

  render() {
		const { book } = this.props

    return (
      <div>
        <Button raised onClick={this.handleClickOpen}>Add book</Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Add Book</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Paste Amazon link to the book for autocomplete
            </DialogContentText>
						<TextField
							margin="dense"
							id="url"
              name="url"
							label="Amazon Url"
							type="text"
							fullWidth
							onChange={this.handleAutocomplete}
						/>
            <TextField
              margin="dense"
              id="title"
              name="title"
							value={book.title}
              label="Title"
              type="text"
              fullWidth
							onChange={this.handleChange}
            />
						<TextField
							margin="dense"
							id="author"
              name="author"
							value={book.author}
							label="Author"
							type="text"
							fullWidth
							onChange={this.handleChange}
						/>
            <TextField
              margin="dense"
              name="read_at"
              label="Read at"
              type="date"
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
              onChange={this.handleChange}
            />
						<TextField
							margin="dense"
							id="published_at"
              name="published_at"
							label="Published at"
							type="date"
							fullWidth
							InputLabelProps={{
								shrink: true,
							}}
							onChange={this.handleChange}
						/>
            <FormControl
              aria-describedby="weight-helper-text"
            >
              <Input
                id="cover"
                name="cover"
                value={book.cover}
                onChange={this.handleChange}
                endAdornment={<InputAdornment position="end"><img src={book.cover} height="150" /></InputAdornment>}
              />
              <FormHelperText id="weight-helper-text">Book cover</FormHelperText>
            </FormControl>
						<FormControl disabled>
							<Input type="text" name="published_at_guess" value={book.published_at} onChange={this.handleChange} />
							<FormHelperText>Published at scraper guess</FormHelperText>
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

export const NewBookContainer = connect(
	function mapStateToProps(state) {
		return {
			book: state.newBook
		};
	},
	function mapDispatchToProps(dispatch) {
		return {
			bookAutocomplete: url => {
				dispatch(bookAutocomplete(url))
			},
			bookChange: (attr, value) => {
				dispatch(bookChange(attr, value))
			},
			addBook: book => {
				dispatch(addBook(book));
			},
		};
	}
)(FormDialog);

export default NewBookContainer;
