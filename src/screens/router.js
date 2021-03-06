import React from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase'

import Dashboard from "./dashboard/Dashboard"
import Identity from "./identity/Identity"

import '../stylesheets/css/router.css'

export const Router = ({ firebase, auth }) => (
  <div>
      {
        !isLoaded(auth)
        ? <div className="loader"><div className="spinner-square"><div></div><div></div></div></div>
        : isEmpty(auth)
          ? <Identity />
          : <Dashboard />
      }
  </div>
)

Router.propTypes = {
  firebase: PropTypes.shape({
    login: PropTypes.func.isRequired
  }),
  auth: PropTypes.object
}

export default compose(
  firebaseConnect(),
  connect(({ firebase: { auth } }) => ({ auth }))
)(Router)
