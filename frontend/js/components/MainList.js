import React from "react";
import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';
import { withStyles } from 'material-ui/styles';
import Book from './Book'
import Url from './Url'
import Title from './Title'
import NewBook from '../containers/NewBook'
import NewUrl from '../containers/NewUrl'
import Login from '../containers/Login'

const styles = theme => ({
  root: {
    flexGrow: 1,
    marginTop: 30,
  },
  paper: {
    padding: 16,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
});

function MainList(props) {
  const { urls, books, classes, onDelete, currentUser } = props;

  const renderBooks = books.map((book, i) => {
    return <Book 
      id={book.id} 
      title={book.title} 
      comment={book.comment} 
      cover={book.cover} 
      author={book.author} 
      published_at={book.published_at} 
      read_at={book.read_at} 
      onDelete={onDelete}
      currentUser={currentUser}
    />
  });

  const renderUrls = urls.map((url, i) => {
    return <Url 
      id={url.id}
      title={url.title}
      url={url.url}
      preview={url.preview}
      paragraph={(url.paragraph || "").substr(0, 220)}
      summary={url.summary}
      score={url.score}
      onDelete={onDelete}
      currentUser={currentUser}
    />
  });

  return (
    <div className="messages-container">
      <Grid container spacing={24}>
        <Grid item xs={12} sm={6}>
          <Title type="urls" title="Memory retention" description="Online resources for memory retention practice"/>
          {renderUrls}
          <br />
          { currentUser.user_id ? <NewUrl /> : null }
        </Grid>
        <Grid item xs={12} sm={6}>
          <Title type="books" title="Books" description="My reading list along with impressions"/>
          {renderBooks}
          <br /> 
          { currentUser.user_id ? <NewBook /> : null }
        </Grid>
      </Grid>
      <Login />
    </div>
  )
}

export default withStyles(styles)(MainList);
