import Button from "@material-ui/core/Button";
import React, {useState} from "react";
import {Redirect, useHistory} from "react-router-dom";
import ChallengeModel from "../Models/Challenge";

export default function ChallengeTile({color, data}) {
  const history = useHistory();
  const [actualData, setActualData] = useState(new ChallengeModel(data["name"], data["units"], data["challenge_id"], data["published"]));
  const handleClick = () => {
    localStorage.setItem("actualColor", color);
    actualData.save()
    history.push('/units')
  };


  const publishButton = () => {
    if (actualData.published) {
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
      width: '97%',
      height: 80,
      backgroundColor: color,
      borderRadius: 20,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-around',
      margin: '20px'
    }}>
      <h2 style={{fontFamily: 'Montserrat', color: '#203F58', width: "60%"}}>
        Desafio {actualData.challenge_id[1]} - {actualData.name}
      </h2>
      <h4 style={{fontFamily: 'Montserrat', color: '#203F58'}}>
        {actualData.units.length} Unidades
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
