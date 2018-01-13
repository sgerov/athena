import React from "react";
import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';
import { withStyles } from 'material-ui/styles';
import Book from './Book'
import Url from './Url'
import Title from './Title'
import NewBook from '../containers/NewBook'
import NewUrl from '../containers/NewUrl'

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
        paragraph={(url.paragraph || "").substr(0, 220)}
        summary={url.summary}
        score={url.score}
      />
		});

    return (
	  	<div className="messages-container">
				<Grid container spacing={24}>
					<Grid item xs={12} sm={6}>
						<Title type="urls" title="Memory retention" description="Online resources for memory retention practice"/>
						{renderUrls}
						<br />
						<NewUrl />
					</Grid>
					<Grid item xs={12} sm={6}>
						<Title type="books" title="Books" description="My reading list along with impressions"/>
		        {renderBooks}
						<br />
						<NewBook />
					</Grid>
				</Grid>
			</div>
		)
}

export default withStyles(styles)(MainList);
