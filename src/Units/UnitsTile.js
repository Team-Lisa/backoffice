import Button from "@material-ui/core/Button";
import React from "react";
import {Redirect, useHistory} from "react-router-dom";

export default function UnitsTile({color, data}) {
  const history = useHistory();
  const handleClick = () => {
    localStorage.setItem("actualUnitData", JSON.stringify(data));
    history.push('/lessons')
  };

  return (
    <div style={{
      width: '95%',
      height: 80,
      backgroundColor: color,
      borderRadius: 20,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      margin: '20px',
      paddingLeft: 20,
      paddingRight: 20
    }}>
      <h2 style={{fontFamily: 'Montserrat', color: '#203F58'}}>
        {data.name}
      </h2>
      <div style={{display: 'flex', alignItems: 'center'}}>
        <h4 style={{fontFamily: 'Montserrat', color: '#203F58', paddingRight: 20, paddingLeft: 20}}>
          {data.lessons.length} Lecciones
        </h4>
        <div>
          <Button variant="contained" style={{
            color: '#203F58',
            backgroundColor: 'rgba(255,255,255,0.5)',
            borderRadius: 10,
            width: 150,
            fontFamily: 'Montserrat',
          }} onClick={handleClick}>
            Ver
          </Button>
        </div>
      </div>
    </div>
  )
}