    
function LoginInformation (props) {

    function handleChange(e) {
        props.getInfo(e.target.value); 
    }
    return (
        <>
            <label className="loginLabel poppinsFont" htmlFor={props.type}><p>{props.type}</p></label>
            <input className="loginInformation poppinsFont" type={props.type === "Password" ? "password" : props.type} name={props.type} id={props.type} onChange={handleChange}></input>
        </>
    )
}

export default LoginInformation