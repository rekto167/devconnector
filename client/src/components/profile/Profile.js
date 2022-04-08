import React, { Fragment, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import PropTypes from "prop-types";
import { getProfileByUserId } from "../../actions/profile";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import ProfileTop from "./ProfileTop";
import ProfileAbout from "./ProfileAbout";
import ProfileExperience from "./ProfileExperience";
import ProfileEducation from "./ProfileEducation";

const Profile = ({ getProfileByUserId, auth, profile: { profile } }) => {
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
      {profile === null ? (
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
          <ProfileTop profile={profile} />
          <ProfileAbout profile={profile} />
          <div className="profile-exp bg-white p-2">
            <h2 className="text-primary">Experience</h2>
            {profile.experience.length > 0 ? (
              <Fragment>
                {profile.experience.map((exp) => (
                  <ProfileExperience key={exp._id} experience={exp} />
                ))}
              </Fragment>
            ) : (
              <h4>No Experience Credentials</h4>
            )}
          </div>
          <div className="profile-edu bg-white p-2">
            <h2 className="text-primary">Education</h2>
            {profile.education.length > 0 ? (
              <Fragment>
                {profile.education.map((edu) => (
                  <ProfileEducation key={edu._id} education={edu} />
                ))}
              </Fragment>
            ) : (
              <h4>No education credential</h4>
            )}
          </div>
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
