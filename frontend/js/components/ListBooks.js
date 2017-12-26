import React from "react";
import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';
import { withStyles } from 'material-ui/styles';
import Book from './Book'
import Url from './Url'
import Typography from 'material-ui/Typography';

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

function ListBooks(props) {
    const { urls, books, classes } = props;

		const renderBooks = books.map((book, i) => {
      return <Book 
        title={book.title} 
        comment={book.comment} 
        cover={book.cover} 
        author={book.author} 
        published_at={book.published_at} 
        read_at={book.read_at} 
      />
		});

		const renderUrls = urls.map((url, i) => {
      return <Url 
        title={url.title}
        url={url.url}
        preview={url.preview}
        score={url.score}
      />
		});

    return (
	  	<div className="messages-container">
				<Grid container spacing={24}>
					<Grid item xs={12} sm={6}>
            <Typography type="display3" gutterBottom align="center" color="inherit">
              Retention training 
            </Typography>
						{renderUrls}
					</Grid>
					<Grid item xs={12} sm={6}>
            <Typography type="display3" gutterBottom align="center" color="inherit">
              Books
            </Typography>
		        {renderBooks}
					</Grid>
				</Grid>
			</div>
		)
}

export default withStyles(styles)(ListBooks);
