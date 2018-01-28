import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { connect } from "react-redux";
import MobileStepper from 'material-ui/MobileStepper';
import Button from 'material-ui/Button';
import KeyboardArrowLeft from 'material-ui-icons/KeyboardArrowLeft';
import KeyboardArrowRight from 'material-ui-icons/KeyboardArrowRight';
import { fetchBooks, fetchUrls } from "../actions/";
import Tooltip from 'material-ui/Tooltip';

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
			return this.props.booksPage || 1
		} else {
			return this.props.urlsPage || 1
		}
	}

	total() {
		if(this.props.type == "books") {
			return Math.ceil(this.props.booksTotal / 5) || 1
		} else {
			return Math.ceil(this.props.urlsTotal / 5) || 1
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
      <Tooltip id="tooltip-icon" title="Switch current page" placement="bottom">
        <MobileStepper
          type="progress"
          steps={this.total()}
          position="static"
          activeStep={this.currentPage() - 1}
          className={classes.root}
          square={false}
          nextButton={
            <Button dense onClick={this.handleNext} disabled={this.currentPage() === this.total()}>
              Next
              {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
            </Button>
          }
          backButton={
            <Button dense onClick={this.handleBack} disabled={this.currentPage() === 1}>
              {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
              Prev
            </Button>
          }
        />
      </Tooltip>
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
			booksTotal: state.books.total,
			urlsTotal: state.urls.total,
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
