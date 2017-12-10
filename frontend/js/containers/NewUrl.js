import React, { Component } from "react";
import { connect } from "react-redux";
import { urlAutocomplete, urlChange, addUrl } from "../actions/";

class NewUrl extends Component {
  constructor(props) {
    super(props)

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleAutocomplete = this.handleAutocomplete.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.props.urlChange(name, value)
  }

  handleAutocomplete(event) {
    this.props.urlAutocomplete(event.target.value)
  }

  handleSubmit(event) {
    this.props.addUrl(this.props.url)
    event.preventDefault()
  }

  render() {
    const { url } = this.props
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
        <input type="text" name="preview" onChange={this.handleChange} value={url.preview}/>
        <input type="text" name="title" onChange={this.handleChange} value={url.title} />
        <input type="text" name="url" onChange={this.handleChange} value={url.url} />
        <input type="text" onChange={this.handleAutocomplete} />
        <input type="submit" value="Send" />
        </form>
      </div>
    )
  }
}

export const NewUrlContainer = connect(
  function mapStateToProps(state) {
    return {
      url: state.newUrl
    };
  },
  function mapDispatchToProps(dispatch) {
    return {
      urlAutocomplete: url => {
        dispatch(urlAutocomplete(url))
      },
      urlChange: (attr, value) => {
        dispatch(urlChange(attr, value))
      },
      addUrl: url => {
        dispatch(addUrl(url));
      },
    };
  }
)(NewUrl);

export default NewUrlContainer;
