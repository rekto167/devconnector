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
import { addLike, removeLike } from "../../actions/post";

const PostItem = ({
  addLike,
  removeLike,
  auth,
  post: { _id, text, name, avatar, user, likes, comments, date },
}) => (
  <div className="post bg-white p-1 my-1">
    <div>
      <Link to="/profile">
        <img className="round-img" src={avatar} alt="" />
        <h4>{name}</h4>
      </Link>
    </div>
    <div>
      <p className="my-1">{text}</p>
      <p className="post-date">
        Posted on <Moment format="YYYY/MM/DD">{date}</Moment>
      </p>
      <button
        onClick={() => addLike(_id)}
        type="button"
        className="btn btn-light"
      >
        <FontAwesomeIcon icon={faThumbsUp} />
        {likes.length === 0 ? "" : <span>{likes.length}</span>}
      </button>
      <button
        onClick={() => removeLike(_id)}
        type="button"
        className="btn btn-light"
      >
        <FontAwesomeIcon icon={faThumbsDown} />
      </button>
      <Link to="/post" className="btn btn-primary">
        Discussion <span className="comment-count">{comments.length}</span>
      </Link>
      {user === auth.user._id && (
        <button type="button" className="btn btn-danger">
          <FontAwesomeIcon icon={faTimes} />
        </button>
      )}
    </div>
  </div>
);

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { addLike, removeLike })(PostItem);
