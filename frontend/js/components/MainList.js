import React from "react";
import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';
import { withStyles } from 'material-ui/styles';
import Book from './Book'
import Graph from './Graph'
import Url from './Url'
import Title from './Title'
import NewBook from '../containers/NewBook'
import NewUrl from '../containers/NewUrl'
import Pages from '../containers/Pages'

const styles = theme => ({
  graph: {
    margin: "0 auto"
  },
});

function MainList(props) {
  const { urls, books, classes, onDelete, currentUser, urlGraph, bookGraph } = props;

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
          <Title title="Memory retention" description="Daily readings collection tied to retention score"/>
          <Graph className={classes.graph} data={urlGraph} x="day" y1="urls" y2="score"/>
          <Pages type="urls"/>
          {renderUrls}
          { currentUser.user_id ? <NewUrl /> : null }
        </Grid>
        <Grid item xs={12} sm={6}>
          <Title title="Books" description="Reading list along with personal impressions"/>
          <Graph className={classes.graph} data={bookGraph} x="month" y1="books" y2="pages"/>
          <Pages type="books"/>
          {renderBooks}
          { currentUser.user_id ? <NewBook /> : null }
        </Grid>
      </Grid>
    </div>
  )
}

export default withStyles(styles)(MainList);
