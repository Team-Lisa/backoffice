import React, {useEffect, useState} from "react";
import Button from "@material-ui/core/Button";
import ChallengeTile from "../../Challenge/ChallengeTile";
import {getChallenges} from "../../Communication/challenge_controller";
import Loader from "react-loader-spinner";
import Loading from "../../Loading/Loading";
import SaveIcon from "@mui/icons-material/Save";
import {IconButton} from "@material-ui/core";
import {Add} from "@material-ui/icons";


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

  const addButtonButton = () => {
    return (
      <IconButton
        style={{padding: 15, margin: 15, position: 'fixed', bottom: 10, right: 10, backgroundColor: '#203F58'}}>
        <Add fontSize="inherit" style={{height: 30, width: 30, color: '#CEEDE8'}}/>
      </IconButton>
    )
  }

  const saveButton = () => {
    return (
      <IconButton
        style={{padding: 15, margin: 15, position: 'fixed', bottom: 80, right: 10, backgroundColor: '#203F58'}}>
        <SaveIcon fontSize="inherit" style={{height: 30, width: 30, color: '#CEEDE8'}}/>
      </IconButton>
    )
  }

  const colors = ['#FED178', '#CAA7F3', '#C4FEAC', '#93D9F8'];

  useEffect(() => {
    async function loadChallenges() {
      if (challenges.length === 0) {
        let challenges_to_load = await getChallenges();
        setChallenges(challenges_to_load);
      }

    }

    loadChallenges()
  }, [challenges])

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
      {(challenges.length > 0) ?
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
        : <Loading color={'#203F58'}/>}

      {header()}
      {addButtonButton()}
      {saveButton()}
    </div>
  )
}


export default ContentManager;


