import React, {useEffect, useState} from "react";
import Button from "@material-ui/core/Button";
import ChallengeTile from "../../Challenge/ChallengeTile";
import {getChallenges} from "../../Communication/challenge_controller";


const ContentManager = () => {
  const [challenges, setChallenges] = useState([]);

  const header = () => {
    return (
      <div style={{
        width: '100%',
        height: 80,
        paddingBottom: 20,
        marginLeft: 20,
        marginRight: 20,
        position: 'fixed',
        top: 0,
        backgroundColor: 'rgba(255,255,255,0.9)'
      }}>
        <div>
          <h1 style={{fontFamily: 'Work Sans', color: '#203F58', fontSize: 42, marginBottom: 0, paddingTop: 10}}>
            Desafíos
          </h1>
        </div>
      </div>
    )
  }

  const addButtonBottom = () => {
    return (
      <Button variant={'contained'}
              style={{
                color: '#CEEDE8',
                backgroundColor: '#203F58',
                borderRadius: 50,
                width: 60,
                height: 62,
                fontSize: 35,
                fontFamily: 'Montserrat',
                position: 'fixed',
                bottom: 20,
                right: 20
              }}>
        +
      </Button>
    )
  }

  const colors = ['#FED178', '#CAA7F3', '#C4FEAC', '#93D9F8'];

  useEffect(() => {
    async function loadChallenges(){
      let challenges_to_load = await getChallenges();
      setChallenges(challenges_to_load);
    }
    loadChallenges()
  }, [challenges])
  console.log(challenges);
  let data = [
    {
      "name": "Básico 1.0",
      "units": [
        {
          "name": "Introducción",
          "exam": {
            "id": "E1",
            "duration": 960
          },
          "lessons": [
            {
              "name": "Lección 1",
              "id": "L1"
            }
          ],
          "id": "U1"
        }
      ],
      "challenge_id": "D1"
    },
    {
      "name": "Básico 2.0",
      "units": [
        {
          "name": "Comparativo/Superlativo",
          "exam": {
            "id": "E2",
            "duration": 5
          },
          "lessons": [
            {
              "name": "Lección 1",
              "id": "L2"
            }
          ],
          "id": "U2"
        }
      ],
      "challenge_id": "D2"
    },
    {
      "name": "Intermedio",
      "units": [
        {
          "name": "Condicional 1",
          "exam": {
            "id": "E3",
            "duration": 960
          },
          "lessons": [
            {
              "name": "Lección 1",
              "id": "L3"
            }
          ],
          "id": "U3"
        }
      ],
      "challenge_id": "D3"
    }
  ]

  const YELLOW = '#FED178';
  const PURPLE = '#CAA7F3';
  const GREEN = '#C4FEAC';
  const BLUE = '#93D9F8';

  let actualColor = YELLOW;
  const getColor = (actual) => {
    if (actual === YELLOW) {
      actualColor = PURPLE
    } else if (actual === PURPLE) {
      actualColor = BLUE
    } else if (actual === BLUE) {
      actualColor = GREEN
    } else {
      actualColor = YELLOW
    }
    return actualColor;
  }


  return (
    <div>
      {(challenges.length > 0)?
          <div style={{paddingBottom: 80, paddingTop: 100}}>
            {challenges.map((value, index) => {
              let color = actualColor;
              if (index !== 0) {
                color = getColor(color);
              }
              return (
                  <div>
                    <ChallengeTile color={color} key={index} data={value}/>
                  </div>
              )
            })}
          </div>
          :""}

      {header()}
      {addButtonBottom()}
    </div>

  )
}


export default ContentManager;


