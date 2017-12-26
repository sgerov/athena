import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import Icon from 'material-ui/Icon';
import GithubCircle from 'mdi-material-ui/GithubCircle'
import TwitterCircle from 'mdi-material-ui/TwitterCircle'
import Medium from 'mdi-material-ui/Medium'
import Avatar from 'material-ui/Avatar';

const styles = {
  root: {
    width: '100%',
  },
  flex: {
    flex: 1,
    marginLeft: 10,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

function SimpleAppBar(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Toolbar>
					<Avatar alt="Remy Sharp" src="https://media.licdn.com/mpr/mpr/shrinknp_200_200/AAEAAQAAAAAAAANmAAAAJDEzMjA2ZjVkLWQ2NzYtNDRhNC1hMDU4LWYzZTg1YWRlYzVlNQ.jpg" />

          <Typography type="title" color="inherit" className={classes.flex}>
           Sava 
          </Typography>
      <IconButton aria-label="Add an alarm">
				<GithubCircle />
      </IconButton>
      <IconButton aria-label="Add an alarm">
				<TwitterCircle />
      </IconButton>
      <IconButton aria-label="Add an alarm">
				<Medium />
      </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  );
}

SimpleAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleAppBar);
