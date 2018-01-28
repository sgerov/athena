import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';

const styles = theme => ({
  root: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    marginTop: theme.spacing.unit * 3,
  }),
});

function PaperSheet(props) {
  const { classes, title, description } = props;
  return (
    <div>
      <div className={classes.root} elevation={4} square={true}>
        <Typography type="headline" component="h3" align="center" color="inherit">
					{ title }
        </Typography>
        <Typography component="p" align="center" color="inherit">
					{ description }
        </Typography>
				<br />
      </div>
    </div>
  );
}

PaperSheet.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PaperSheet);
