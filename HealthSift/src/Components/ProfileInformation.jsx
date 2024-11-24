function profileInformation({title = "Title", information = "Description", titleStyle="", desStyle="", containerStyle=""}) {
  return (

    <div className={containerStyle}>

        <div className={"poppinsFont" + titleStyle}>{title}</div>

        <div className={"poppinsFont" + desStyle}>{information}</div>
   
    </div>

  )
}

export default profileInformation