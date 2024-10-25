import { Link } from "react-router-dom";

  function RedirectButton(props) {
    return (
      // links the burron to a spefic route established by App.jsx
      <Link to={"/" + props.location}>
        <button className={"poppinsFont " + props.style}>{props.title}</button>
      </Link>

    )
}

// set default value to the props in case the parent does not provide any values 
RedirectButton.defaultProps = {
  location: "",    // Default empty string
  style: "",      // Default empty string
  title: "Title"  // Default set to title. 
};

export default RedirectButton