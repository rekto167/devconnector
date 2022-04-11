import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import PostItem from "../posts/PostItem";
import { getPost } from "../../actions/post";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import CommentForm from "./CommentForm";

const Post = ({ getPost, post: { post, loading } }) => {
  const { id } = useParams();
  useEffect(() => {
    getPost(id);
  }, [getPost]);
  return loading || post === null ? (
    <Spinner />
  ) : (
    <section className="container">
      <Link to="/posts" className="btn btn-light">
        Back
      </Link>
      <PostItem post={post} showActions={false} />
      <CommentForm postId={post._id} />
    </section>
  );
};

Post.propTypes = {
  post: PropTypes.object.isRequired,
  getPost: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
});

export default connect(mapStateToProps, { getPost })(Post);
