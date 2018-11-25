import React from "react";
import PropTypes from "prop-types";
import { compose } from "redux";
import { withHandlers, branch, renderNothing } from "recompose";
import { withFirestore } from "react-redux-firebase";

const ListEntry = props => {
  return (
    <div className="ListEntry">
      <div>{this.props.book.title}</div>
      <div>{this.props.book.author}</div>
      <div>{this.props.book.excerpt}</div>
    </div>
  );
};

export default ListEntry;
