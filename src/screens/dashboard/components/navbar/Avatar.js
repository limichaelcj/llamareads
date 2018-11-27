import React from "react";
import PropTypes from "prop-types";
import { compose } from "redux";
import { connect } from "react-redux";
import {
  withProps,
  withHandlers,
  branch,
  renderNothing,
  withState,
  withStateHandlers
} from "recompose";
import { firebaseConnect, isLoaded, isEmpty } from "react-redux-firebase";

// css
import "../../../../stylesheets/css/base.css";

const enhance = compose(
  firebaseConnect(),
  connect(({ firebase: { auth } }) => ({ auth }))
);

const Avatar = ({auth}) => {
  return <img  className="Avatar" src={auth.photoURL}></img>
};

export default enhance(Avatar);
