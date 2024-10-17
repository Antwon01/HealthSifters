    
function LoginInformation (props) {

    function handleChange(e) {
        props.getInfo(e.target.value); 
    }
    return (
        <>
            <label className={"poppinsFont " + props.labelStyle} htmlFor={props.type}><p>{props.text}</p></label>
            <input className={"poppinsFont " + props.inputStyle} type={props.type} name={props.type} id={props.type} onChange={handleChange}></input>
        </>
    )
}

LoginInformation.defaultProps = {
    text: "Email",         // Default label text
    type: "email",          // Default input type
    labelStyle: "",        // Default label style (empty string)
    inputStyle: "",        // Default input style (empty string)
    getInfo: () => {}      // Default no-op function
};

export default LoginInformation