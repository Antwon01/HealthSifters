function Error(props) {
  return (
    // diplays a container (div) that show what is the error. Specifically for the login. 
    <div className= {props.setError ? "poppinsFont errorMessage" : "unvisible poppinsFont errorMessage"}>
        {props.message}
    </div>
  )
}

export default Error