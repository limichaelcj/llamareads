import React from "react";
import PropTypes from "prop-types";
import { compose } from "redux";
import { withState, withStateHandlers, branch, renderNothing } from "recompose";
import { withFirestore } from "react-redux-firebase";

// linked component
import Shelf from "./Shelf";

// css
import "../../../../stylesheets/css/base.css";

const ShelfList = ({ changeModal, sendBook, showStory }) => {
  return (
    <div className="ShelfList">
      <Shelf
        showStory={showStory}
        changeModal={changeModal}
        sendBook={sendBook}
      />
    </div>
  );
};

export default ShelfList;
