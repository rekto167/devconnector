import React from 'react'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'

const ProfileItem = ({profile: {
    user: {_id, name, avatar},
    status,
    company,
    location,
    skills
}}) => {
  return (
    <div className="profile bg-light">
        <img
            className="round-img"
            src={avatar}
            alt={name}
        />
        <div>
            <h2>{name}</h2>
            <p>{status} {company && <span> at {company}</span> }</p>
            <p className="my-1">{location && <span>{location}</span>}</p>
            <Link to={`/profile/${_id}`} className="btn btn-primary">View Profile</Link>
        </div>

        <ul>
            {skills.splice(0, 4).map((skill, index) =>
                (
                    <li className="text-primary" key={index}>
                        <FontAwesomeIcon icon={faCheck} />{'  '}
                        {skill}
                    </li>
                )
            )}
        </ul>
    </div>
  )
}

ProfileItem.propTypes = {
    profile: PropTypes.object.isRequired
}

export default ProfileItem