import React from 'react'
import PropTypes from 'prop-types'
import { Link } from "react-router-dom";

function RedirectButton(props) {
  return (
    <Link to={"/" + props.location}>
                <button className={"poppinsFont " + props.style}>{props.title}</button>
    </Link>
  )
}


export default RedirectButton