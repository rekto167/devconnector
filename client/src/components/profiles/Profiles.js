import React, { useEffect, Fragment } from "react";
import Spinner from "../layout/Spinner";
import ProfileItem from "./ProfileItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faConnectdevelop } from "@fortawesome/free-brands-svg-icons";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";
import { getAllProfile } from "../../actions/profile";
import PropTypes from "prop-types";

const Profiles = ({ getAllProfile, profile: { profiles, loading } }) => {
  useEffect(() => {
    getAllProfile();
  }, [getAllProfile]);

  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <section className="container">
            <h1 className="large text-primary">Developers</h1>
            <p className="lead">
              <FontAwesomeIcon icon={faConnectdevelop} /> Browse and connect
              with developers
            </p>
            <div className="profiles">
              {profiles.length > 0 ? (
                profiles.map((profile) => (
                  <ProfileItem key={profile._id} profile={profile} />
                ))
              ) : (
                <h4>No Profile found...</h4>
              )}
            </div>
          </section>
        </Fragment>
      )}
    </Fragment>
  );
};

Profiles.propTypes = {
  getAllProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { getAllProfile })(Profiles);
