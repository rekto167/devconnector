import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";
import {
  faTwitter,
  faFacebook,
  faLinkedin,
  faInstagram,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import PropTypes from "prop-types";

const ProfileTop = ({
  profile: {
    user: { name, avatar },
    status,
    company,
    location,
    website,
    social,
  },
}) => {
  return (
    <div className="profile-top bg-primary p-2 my-2">
      <img className="round-img my-1" src={avatar} alt="" />
      <h1 className="large">{name}</h1>
      <p className="lead">
        {status} {company && <span> at {company} </span>}
      </p>
      {location && <p>{location}</p>}
      <div className="icons my-1">
        {website && (
          <a href={website} target="_blank">
            <FontAwesomeIcon icon={faGlobe} />
          </a>
        )}

        {social !== undefined && (
          <Fragment>
            {social.twitter && (
              <a
                href={social.twitter}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon icon={faTwitter} />
              </a>
            )}
            {social.facebook && (
              <a
                href={social.facebook}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon icon={faFacebook} />
              </a>
            )}
            {social.linkedin && (
              <a
                href={social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon icon={faLinkedin} />
              </a>
            )}
            {social.youtube && (
              <a
                href={social.youtube}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon icon={faYoutube} />
              </a>
            )}
            {social.instagram && (
              <a
                href={social.instagram}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon icon={faInstagram} />
              </a>
            )}
          </Fragment>
        )}
      </div>
    </div>
  );
};

ProfileTop.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileTop;
