import React from "react";

const Analysis = () =>{
  let data = localStorage.getItem('data')
  data = JSON.parse(data)
  const renderdata = Object.keys(data).map((key) =>(
    <div key={key}>
      {key} : {data[key]}
    </div>
  ))
  return (<div >
    {renderdata}
  </div>)
}

export default Analysis