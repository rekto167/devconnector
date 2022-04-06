import React, {Fragment, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {getCurrentProfile, deleteAccount} from '../actions/profile'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faUserMinus} from '@fortawesome/free-solid-svg-icons'
import {connect} from 'react-redux'
import Spinner from './layout/Spinner'
import DashboardActions from './DashboardActions'
import Experience from './Experience'
import Education from './Education'

const Dashboard = ({getCurrentProfile, deleteAccount, auth: {user}, profile:{profile, loading}}) => {
  useEffect(() => {
    getCurrentProfile()
  }, [getCurrentProfile]);

  return (
    <div className="container">
      {loading && profile === null ? (
        <Spinner />
      ) : (
        <Fragment>
          <h1 className="large text-primary">Dashboard</h1>
          <p className="lead">
            <i className="fa fa-user"></i>
            Welcome {user && user.name}
          </p>
          {profile !== null ?
            (<Fragment>
              <DashboardActions />
              <Experience experience={profile.experience} />
              <Education education={profile.education} />

              <button className="btn btn-danger my-2" onClick={() => deleteAccount()} >
                <FontAwesomeIcon icon={faUserMinus} /> {'  '}
                Delete Account
              </button>
            </Fragment>) : (
              <Fragment>
                <p>You have not yet setup profile, please add some info</p>
                <Link to='/create-profile' className="btn btn-primary my-1">Create Profile</Link>
              </Fragment>
            )
          }
        </Fragment>
      )}
    </div>
  )
}

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile,
})

export default connect(mapStateToProps, {getCurrentProfile, deleteAccount})(Dashboard)