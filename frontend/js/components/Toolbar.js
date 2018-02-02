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
import YoutubePlay from 'mdi-material-ui/YoutubePlay'
import LinkedinBox from 'mdi-material-ui/LinkedinBox'
import Avatar from 'material-ui/Avatar';
import Login from '../containers/Login'
import Tooltip from 'material-ui/Tooltip';

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
          <Avatar alt="Sava Gerov" src="https://media.licdn.com/mpr/mpr/shrinknp_200_200/AAEAAQAAAAAAAANmAAAAJDEzMjA2ZjVkLWQ2NzYtNDRhNC1hMDU4LWYzZTg1YWRlYzVlNQ.jpg" />

          <Tooltip id="tooltip-main" title="This is a personal app which goal is to measure and train reading effectiveness" placement="bottom" className={classes.flex}         enterDelay={300}
                  leaveDelay={300}>
            <Typography type="title" color="inherit">
              SG
            </Typography>
          </Tooltip>
          <a href="https://github.com/sgerov" target="_blank">
            <IconButton>
              <GithubCircle />
            </IconButton>
          </a>
          <a href="https://twitter.com/sgerov" target="_blank">
            <IconButton>
              <TwitterCircle />
            </IconButton>
          </a>
          <a href="https://linkedin.com/in/savagerov/" target="_blank">
            <IconButton>
              <LinkedinBox />
            </IconButton>
          </a>
          <a href="https://medium.com/@sgerov" target="_blank">
            <IconButton>
              <Medium />
            </IconButton>
          </a>
          <a href="https://www.youtube.com/channel/UC990Eo29-pxZrARW4UErVWg" target="_blank">
            <IconButton>
              <YoutubePlay />
            </IconButton>
          </a>
          <Login />
        </Toolbar>
      </AppBar>
    </div>
  );
}

SimpleAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleAppBar);
