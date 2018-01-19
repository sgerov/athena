import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import ExpansionPanel, {
  ExpansionPanelSummary,
  ExpansionPanelDetails,
	ExpansionPanelActions,
} from 'material-ui/ExpansionPanel';
import Typography from 'material-ui/Typography';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';
import Button from 'material-ui/Button';
import Divider from 'material-ui/Divider';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: 10,
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  icon: {
    verticalAlign: 'bottom',
    height: 20,
    width: 20,
  },
  details: {
    alignItems: 'center',
  },
  column: {
    flexBasis: '33.3%',
    marginRight: 15,
  },
  helper: {
    borderLeft: `2px solid ${theme.palette.text.lightDivider}`,
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
  },
  link: {
    color: theme.palette.primary[500],
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
});

function Book(props) {
  const { classes, title, cover, author, published_at, read_at, comment, id, onDelete } = props;

  return (
    <div className={classes.root}>
      <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className={classes.heading}>{title}</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className={classes.details}>
          <div className={classes.column}>
						<img src={cover} width='100' />
          </div>
          <div className={classes.helper}>
            <Typography type="caption">
              {comment}
            </Typography>
            <br />
            <br />
            <Button raised color="accent" onClick={() => onDelete(id, "books")}>
              Delete
            </Button>
          </div>
        </ExpansionPanelDetails>
        <Divider />
        <ExpansionPanelActions>
					<Button dense disabled>Author: {author}</Button>
          <Button dense disabled>Published: {published_at}</Button>
					<Button dense disabled>Read: {read_at}</Button>
        </ExpansionPanelActions>
      </ExpansionPanel>
    </div>
  );
}

Book.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Book);
