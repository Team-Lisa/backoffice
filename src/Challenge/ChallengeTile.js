import Button from "@material-ui/core/Button";
import React from "react";
import {Redirect, useHistory} from "react-router-dom";

export default function ChallengeTile({color, data}) {
  const history = useHistory();
  const handleClick = () => {
    localStorage.setItem("actualColor", color);
    localStorage.setItem("actualData", JSON.stringify(data));
    history.push('/units')
  };


  const publishButton = () => {
    if (data.publish) {
      return (
        <Button variant="contained" style={{
          color: '#203F58',
          backgroundColor: 'rgba(255,255,255,0.5)',
          borderRadius: 10,
          width: 150,
          fontFamily: 'Montserrat',
        }}>
          Publicado
        </Button>
      )
    } else {
      return (
        <Button variant="contained" style={{
          color: '#CEEDE8',
          backgroundColor: '#203F58',
          borderRadius: 10,
          width: 150,
          fontFamily: 'Montserrat'
        }}>
          Publicar
        </Button>)
    }
  }

  return (
    <div style={{
      width: '100%',
      height: 80,
      backgroundColor: color,
      borderRadius: 20,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-around',
      margin: '20px'
    }}>
      <h2 style={{fontFamily: 'Montserrat', color: '#203F58', width: "60%"}}>
        Desafio {data['challenge_id'][1]} - {data.name}
      </h2>
      <h4 style={{fontFamily: 'Montserrat'}}>
        {data.units.length} Unidades
      </h4>
      <div>
        <Button variant="contained" style={{
          color: '#203F58',
          backgroundColor: 'rgba(255,255,255,0.5)',
          borderRadius: 10,
          fontFamily: 'Montserrat',
          width: 150,
          marginRight: 20
        }} onClick={handleClick}>
          Ver
        </Button>
        {publishButton()}
      </div>
    </div>
  )
}