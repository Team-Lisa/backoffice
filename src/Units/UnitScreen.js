import React, {useEffect, useState} from "react";
import UnitsTile from "./UnitsTile";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import {IconButton} from "@material-ui/core";
import {useHistory} from "react-router-dom";
import {Add} from "@material-ui/icons";
import SaveIcon from "@mui/icons-material/Save";
import ChallengeModel from "../Models/Challenge";
import {createChallenge, saveChallenge} from "../Communication/challenge_controller";
import ExerciseModel from "../Models/Exercise";
import {createExercise} from "../Communication/exercises_controller";

export default function UnitScreen() {
  const actualColor = localStorage.getItem('actualColor');
  const [actualData, setActualData] = useState(ChallengeModel.getActualChallenge);
  const [subtitle, setSubtitle] = useState(actualData.name);
  const units = actualData.units;
  const history = useHistory();

  const onChangeSubtitle = (event) => {
    setSubtitle(event.target.value);
    actualData.name = event.target.value;
    actualData.save();
  }

  const handleBack = () => {
    localStorage.removeItem("actualChallenge");
    localStorage.removeItem("exercises_to_saved");
    localStorage.removeItem("new_unit");
    localStorage.removeItem("actualLesson");
    localStorage.removeItem("challenge_is_new");
    localStorage.removeItem("actualColor");
    history.push('/content')
  }

  useEffect(
      () => {
        actualData.save()
      }, [actualData]
  )

  const header = () => {
    return (
      <div style={{
        width: '100%',
        height: 80,
        paddingBottom: 20,
        position: 'fixed',
        top: 0,
        backgroundColor: 'rgba(255,255,255,0.9)'
      }}>
        <div>
          <div style={{display: 'flex', alignItems: 'center'}}>
            <div style={{paddingTop: 20}}>
              <IconButton style={{padding: 0, margin: 0}} onClick={handleBack}>
                <ChevronLeftIcon fontSize="inherit" style={{height: 50, width: 50, color: '#203F58'}}/>
              </IconButton>
            </div>
            <h1 style={{fontFamily: 'Work Sans', color: '#203F58', fontSize: 42, marginBottom: 0, paddingBottom: 10}}>
              Desafío {actualData.challenge_id.slice(1)} -
            </h1>
            <TextField
              style={{width: "30%", marginTop: 30, alignItems: 'flex-start'}}
              inputProps={{style: {fontFamily: 'Work Sans', color: '#203F58', fontSize: 42, fontWeight: 700}}}
              InputLabelProps={{style: {fontFamily: 'Work Sans', color: '#203F58', fontSize: 42, fontWeight: 700}}}
              size="small"
              variant="outlined"
              margin="normal"
              value={subtitle}
              onChange={onChangeSubtitle}
            />
          </div>
        </div>
      </div>
    )
  }

  const addButtonButton = () => {
    return (
      <IconButton
        style={{padding: 15, margin: 15, position: 'fixed', bottom: 10, right: 10, backgroundColor: actualColor}}
        onClick={()=>{
          let next_id = actualData.challenge_id + "U" + (actualData.units.length + 1).toString()
          let new_unit = {
             name: "Nueva Unidad",
             id: next_id,
             lessons: [],
             exam: {
               id: next_id + "X",
               duration: 960
             }
          }
          actualData.units.push(new_unit)
          actualData.save();
          localStorage.setItem("actualUnitData", JSON.stringify(new_unit));
          history.push('/lessons')
        }
        }
      >
        <Add fontSize="inherit" style={{height: 30, width: 30, color: '#203F58'}}/>
      </IconButton>
    )
  }

  const saveButton = () => {
    return (
      <IconButton
        style={{padding: 15, margin: 15, position: 'fixed', bottom: 80, right: 10, backgroundColor: actualColor}}
        onClick={
            async () => {
                let challenge_to_save = ChallengeModel.getActualChallengeJSON();
                let new_challenge = localStorage.getItem("challenge_is_new");
                if (new_challenge !== "true"){
                    let response = await saveChallenge(challenge_to_save["id"], challenge_to_save);
                    if (response){
                        console.log("challenge created")
                        handleBack();
                    }else{
                        console.log("error")
                    }

                }else{
                    let response = await createChallenge(challenge_to_save);
                    if (response){
                        console.log("challenge created")
                    }else{
                        console.log("error")
                    }

                    let exercises = await ExerciseModel.getExercisesToSave();
                    for (const lesson_id in exercises) {
                        let exercises_i = exercises[lesson_id];
                        for (let i = 0; i < exercises_i.length; i++) {
                            let exercise = exercises_i[i]
                            delete exercise["exercise_id"];
                            let response_exercise = await createExercise(exercise);
                            if (response_exercise){
                                console.log("exercise created")
                            }else{
                                console.log("error exercise")
                            }
                        }
                    handleBack();
                    }
                }


            }
        }>
        <SaveIcon fontSize="inherit" style={{height: 30, width: 30, color: '#203F58'}}/>
      </IconButton>
    )
  }

  return (
    <div>
      <div style={{paddingBottom: 80, paddingTop: 100}}>
        {units.map((value, index) => {
          return (
            <div>
              <UnitsTile key={index} data={value} color={actualColor}/>
            </div>
          )
        })}
      </div>
      {header()}
      {addButtonButton()}
      {saveButton()}
    </div>
  );
}
