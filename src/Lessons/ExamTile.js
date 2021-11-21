import Button from "@material-ui/core/Button";
import React from "react";
import {Redirect, useHistory} from "react-router-dom";

export default function ExamTile({data}) {
  const actualColor = localStorage.getItem('actualColor');
  const history = useHistory();

  const handleClick = () => {
    //localStorage.setItem("actualUnitData", JSON.stringify(data));
    history.push('/exercise')
  };

  return (
    <div style={{
      width: '97%',
      height: 80,
      backgroundColor: actualColor,
      borderRadius: 20,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-around',
      margin: '20px'
    }}>
      <h2 style={{fontFamily: 'Montserrat', color: '#203F58', width: "70%"}}>
        Examen Final
      </h2>
      <h4 style={{fontFamily: 'Montserrat', color: '#203F58'}}>
        {0} Ejercicios
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
  )
}