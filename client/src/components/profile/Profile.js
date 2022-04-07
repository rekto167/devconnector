import React, { Fragment, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import PropTypes from "prop-types";
import { getProfileByUserId } from "../../actions/profile";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";

const Profile = ({
  getProfileByUserId,
  auth,
  profile: { profile, loading },
}) => {
  const { id } = useParams();
  useEffect(() => {
    getProfileByUserId(id);
  }, [getProfileByUserId]);

  const not = (
    <Link to="/profiles" className="btn btn-light">
      Back
    </Link>
  );

  const yes = (
    <Fragment>
      <Link to="/profiles" className="btn btn-light">
        Back
      </Link>
      <Link to="/profiles" className="btn btn-dark">
        Edit Profile
      </Link>
    </Fragment>
  );

  return (
    <section className="container">
      {profile === null && loading === false ? (
        <Spinner />
      ) : (
        <Fragment>
          <Link to="/profiles" className="btn btn-light">
            Back
          </Link>
          {auth.isAuthenticated &&
            auth.loading === false &&
            auth.user._id === profile.user._id && (
              <Link to="/profiles" className="btn btn-dark">
                Edit Profile
              </Link>
            )}
        </Fragment>
      )}
    </section>
  );
};

Profile.propTypes = {
  getProfileByUserId: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, { getProfileByUserId })(Profile);
