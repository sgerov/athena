import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { connect } from "react-redux";
import MobileStepper from 'material-ui/MobileStepper';
import Button from 'material-ui/Button';
import KeyboardArrowLeft from 'material-ui-icons/KeyboardArrowLeft';
import KeyboardArrowRight from 'material-ui-icons/KeyboardArrowRight';
import { fetchBooks, fetchUrls } from "../actions/";

const styles = {
  root: {
    flexGrow: 1,
  },
};

class Pages extends React.Component {
	constructor(props) {
		super(props)

		this.handlePage = this.handlePage.bind(this);
		this.handleNext = this.handleNext.bind(this);
		this.handleBack = this.handleBack.bind(this);
		this.currentPage = this.currentPage.bind(this);
	}

	currentPage() {
		if(this.props.type == "books") {
			return this.props.booksPage
		} else {
			return this.props.urlsPage
		}
	}

	handlePage(page) {
		if(this.props.type == "books") {
			this.props.fetchBooks(page);
		} else {
			this.props.fetchUrls(page);
		}
	}
  
  handleNext() {
    this.handlePage(this.currentPage() + 1)
  };

  handleBack() {
		this.handlePage(this.currentPage() - 1)
  };

  render() {
    const { classes, theme } = this.props;

    return (
      <MobileStepper
        type="progress"
        steps={10}
        position="static"
        activeStep={this.currentPage()}
        className={classes.root}
        nextButton={
          <Button dense onClick={this.handleNext} disabled={this.currentPage() === 10}>
            Next
            {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
          </Button>
        }
        backButton={
          <Button dense onClick={this.handleBack} disabled={this.currentPage() === 1}>
            {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            Back
          </Button>
        }
      />
    );
  }
}

Pages.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};


const PagesContainer = connect(
	function mapStateToProps(state) {
		return {
			urlsPage: state.urlAsyncStatus.page,
			booksPage: state.bookAsyncStatus.page,
		};
	},
	function mapDispatchToProps(dispatch) {
		return {
			fetchBooks: (page) => {
				dispatch(fetchBooks(page));
			},
			fetchUrls: (page) => {
				dispatch(fetchUrls(page));
			}
		};
	}
)(Pages);

export default withStyles(styles, { withTheme: true })(PagesContainer);
