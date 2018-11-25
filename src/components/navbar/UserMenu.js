import React from "react";
import PropTypes from "prop-types";
import { compose } from "redux";
import { withHandlers, branch, renderNothing } from "recompose";
import { withFirestore } from "react-redux-firebase";

// linked components
import Inbox from "./inbox";
import Avatar from "./avatar";

const UserMenu = props => {
  render() {
    return (
      <div className="UserMenu">
        <Inbox inbox={this.props.user.inbox} />
        <Avatar />
      </div>
    )
  }
};

export default UserMenu;
