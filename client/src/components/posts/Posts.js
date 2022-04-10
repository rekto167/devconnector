import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import PostItem from "./PostItem";
import { getPosts } from "../../actions/post";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

const Posts = ({ getPosts, post: { posts, loading } }) => {
  useEffect(() => {
    getPosts();
  }, [getPosts]);

  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <section className="container">
        <h1 className="large text-primary">Posts</h1>
        <p className="lead">
          <FontAwesomeIcon icon={faUser} /> Welcome to the community!
        </p>

        <div className="post-form">
          <div className="bg-primary p">
            <h3>Say Something...</h3>
          </div>
          <form className="form my-1">
            <textarea
              name="text"
              cols="30"
              rows="5"
              placeholder="Create a post"
              required
            ></textarea>
            <input type="submit" className="btn btn-dark my-1" value="Submit" />
          </form>
        </div>

        {posts.map((post) => (
          <div className="posts">
            <div className="post bg-white p-1 my-1">
              <PostItem post={post} />
            </div>
          </div>
        ))}
      </section>
    </Fragment>
  );
};

Posts.propTypes = {
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
});

export default connect(mapStateToProps, { getPosts })(Posts);
