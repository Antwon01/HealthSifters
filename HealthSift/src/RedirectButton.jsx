import { Link } from "react-router-dom";

  function RedirectButton(props) {
    return (

      <Link to={"/" + props.location}>
        <button className={"poppinsFont " + props.style}>{props.title}</button>
      </Link>

    )
}

RedirectButton.defaultProps = {
  location: "",
  style: "",
  title: "Tittle"
};

export default RedirectButton