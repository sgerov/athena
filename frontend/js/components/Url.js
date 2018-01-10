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
import { LinearProgress } from 'material-ui/Progress';
import Tooltip from 'material-ui/Tooltip';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: 10,
  },
  linear: {
    width: '100%',
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

function Url(props) {
  const { classes, title, url, preview, score } = props;

  return (
    <div className={classes.root}>
      <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className={classes.heading}>{title}</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className={classes.details}>
          <div className={classes.column}>
						<img src={preview} width='100' />
          </div>
          <div className={classes.helper}>
            <Typography type="caption">
              - missing description -
            </Typography>
          </div>
        </ExpansionPanelDetails>
        <Divider />
        <ExpansionPanelActions>
          <div className={classes.linear}>
            <Tooltip id="tooltip-icon" title="How much I retained from first read" placement="bottom">
							<LinearProgress mode="determinate" value={score} color="accent"/>
            </Tooltip>
          </div>
          <Button dense href={url}>
            Read
          </Button>

        </ExpansionPanelActions>
      </ExpansionPanel>
    </div>
  );
}

Url.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Url);
