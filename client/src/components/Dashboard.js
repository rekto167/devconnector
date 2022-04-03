import React, {useEffect} from 'react'
import {getCurrentProfile} from '../actions/profile'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

const Dashboard = ({getCurrentProfile, auth, profile}) => {
  useEffect(() => {
    getCurrentProfile()
  }, []);
  return (
    <div className="container">
        <h1>Dashboard</h1>
    </div>
  )
}

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
})

export default connect(mapStateToProps, {getCurrentProfile})(Dashboard)