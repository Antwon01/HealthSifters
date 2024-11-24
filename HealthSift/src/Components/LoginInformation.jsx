    
function LoginInformation (props) {
    
    // this function will send the value of the input to the parent class for processing.
    function handleChange(e) {
        props.getInfo(e.target.value); 
    }
    return (
        <>
            {/* set a label describing what the input is. the input can be either email or password. */}
            <label className={"poppinsFont " + props.labelStyle} htmlFor={props.type}><p>{props.text}</p></label>
            <input className={"poppinsFont " + props.inputStyle} type={props.type} name={props.type} id={props.type} onChange={handleChange}></input>
        </>
    )
}


// makes sure that the prop have default values when not specified by the parent
LoginInformation.defaultProps = {
    text: "Email",         // Default label text
    type: "email",          // Default input type
    labelStyle: "",        // Default label style (empty string)
    inputStyle: "",        // Default input style (empty string)
    getInfo: () => {}      // Default no-op function
};

export default LoginInformation