import Button from "@material-ui/core/Button";
import React, {useState} from "react";
import {Redirect, useHistory} from "react-router-dom";
import ChallengeModel from "../Models/Challenge";
import {saveChallenge} from "../Communication/challenge_controller";

export default function ChallengeTile({color, data, update}) {
  const history = useHistory();
  const [actualData, setActualData] = useState(new ChallengeModel(data["name"], data["units"], data["challenge_id"], data["published"]));
  const handleClick = () => {
    localStorage.setItem("challenge_is_new", "false");
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
        }}
        >
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
        }}
                onClick={
                  async () => {
                    actualData.publish();
                    let data = ChallengeModel.getActualChallengeJSON()
                    let response = await saveChallenge(actualData.challenge_id, data);
                    if (!response) {
                      console.log("error al publicar");
                    }
                    setActualData(actualData);
                    update();
                  }
                }>
          Publicar
        </Button>)
    }
  }

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
        Desafio {actualData.challenge_id[1]} - {actualData.name}
      </h2>
      <div style={{display: 'flex', alignItems: 'center'}}>
        <h4 style={{fontFamily: 'Montserrat', color: '#203F58', paddingRight: 20, paddingLeft: 20}}>
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
    </div>
  )
}
