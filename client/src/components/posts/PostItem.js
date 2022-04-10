import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faThumbsUp,
  faThumbsDown,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";

const PostItem = ({
  auth,
  post: { _id, text, name, avatar, user, likes, comments, date },
}) => {
  return (
    <Fragment>
      <div>
        <a href="profile.html">
          <img className="round-img" src={avatar} alt="" />
          <h4>{name}</h4>
        </a>
      </div>
      <div>
        <p className="my-1">{text}</p>
        <p className="post-date">
          Posted on <Moment format="YYYY/MM/DD">{date}</Moment>
        </p>
        <button type="button" className="btn btn-light">
          <FontAwesomeIcon icon={faThumbsUp} />
          {likes.length === 0 ? "" : <span>{likes.length}</span>}
        </button>
        <button type="button" className="btn btn-light">
          <FontAwesomeIcon icon={faThumbsDown} />
        </button>
        <a href="post.html" className="btn btn-primary">
          Discussion <span className="comment-count">{comments.length}</span>
        </a>
        {user === auth.user._id && (
          <button type="button" className="btn btn-danger">
            <FontAwesomeIcon icon={faTimes} />
          </button>
        )}
      </div>
    </Fragment>
  );
};

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {})(PostItem);
