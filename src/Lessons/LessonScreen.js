import React, {useEffect, useState} from "react";
import TextField from "@material-ui/core/TextField";
import LessonTile from "./LessonTile";
import Button from "@material-ui/core/Button";
import ExamTile from "./ExamTile";
import {IconButton} from "@material-ui/core";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import {useHistory} from "react-router-dom";
import Loading from "../Loading/Loading";
import {Add} from "@material-ui/icons";
import SaveIcon from "@mui/icons-material/Save";
import ChallengeModel from "../Models/Challenge";
import ExerciseModel from "../Models/Exercise";
import {createChallenge, saveChallenge} from "../Communication/challenge_controller";
import {createExercise} from "../Communication/exercises_controller";

export default function LessonScreen() {
  const actualColor = localStorage.getItem('actualColor');
  const actualData = ChallengeModel.getActualChallenge();
  const [actualUnitData, setActualUnitData] = useState(JSON.parse(localStorage.getItem('actualUnitData')));
  console.log(actualUnitData);
  const [subtitle, setSubtitle] = useState(actualUnitData.name);
  const history = useHistory();
  const lessons = actualUnitData['lessons'];
  const exam = actualUnitData["exam"]
  const onChangeSubtitle = (event) => {
    setSubtitle(event.target.value);
    actualUnitData.name = event.target.value;
    actualData.updateUnitName(actualUnitData.id, event.target.value);
    localStorage.setItem("actualUnitData", JSON.stringify(actualUnitData));
  }

  const handleBack = () => {
    history.push('/units')
  }

  useEffect(
      () => {
        localStorage.setItem("new_unit", JSON.stringify(actualUnitData));
      }, [actualUnitData]
  )

  const header = () => {
    return (
      <div style={{
        width: '100%',
        height: 80,
        paddingBottom: 20,
        alignItems: 'center',
        position: 'fixed',
        top: 0,
        backgroundColor: 'rgba(255,255,255,0.9)'
      }}>
        <div style={{justifyContent: 'center', display: 'inline'}}>
          <div style={{display: 'flex'}}>
            <div style={{paddingTop: 30}}>
              <IconButton style={{padding: 0, margin: 0}} onClick={handleBack}>
                <ChevronLeftIcon fontSize="inherit" style={{height: 50, width: 50, color: '#203F58'}}/>
              </IconButton>
            </div>
            <h1 style={{fontFamily: 'Work Sans', color: '#203F58', fontSize: 42, marginBottom: 0}}>
              Desafío {actualData.challenge_id[1]} - {actualData.name}
            </h1>
          </div>
          <TextField
            style={{width: "30%", marginTop: 0, paddingLeft: 50}}
            inputProps={{style: {fontFamily: 'Montserrat', color: '#203F58', fontWeight: 700}}}
            InputLabelProps={{style: {fontFamily: 'Montserrat', color: '#203F58', fontWeight: 700}}}
            size="small"
            variant="outlined"
            margin="normal"
            value={subtitle}
            onChange={onChangeSubtitle}
          />
        </div>
      </div>
    )
  }

  const addButtonButton = () => {
    return (
      <IconButton
        style={{padding: 15, margin: 15, position: 'fixed', bottom: 10, right: 10, backgroundColor: actualColor}}
        onClick={()=>{
          let next_id = "";
          if (actualUnitData["lessons"].length === 0 ){
            next_id = actualData.challenge_id + "U" + (actualData.units.length).toString() + "L1";
          }else{
            next_id = actualData.challenge_id + "U" + (actualData.units.length).toString() + "L" + (actualUnitData["lessons"].length + 1).toString();
          }

          let new_lesson = {
            name: "Lección " + next_id.split("L")[1],
            id: next_id,
          }
          actualData.updateLessons(actualUnitData.id, new_lesson);
          let update_unit = {...actualUnitData};
          update_unit["lessons"].push(new_lesson);
          setActualUnitData(update_unit);
          let exercises = ExerciseModel.getExercisesToSave();
          exercises[next_id] = [];
          localStorage.setItem("actualUnitData", JSON.stringify(update_unit));
          localStorage.setItem("exercises_to_saved", JSON.stringify(exercises));
          localStorage.setItem("actualLesson", JSON.stringify(new_lesson));
          localStorage.setItem("lesson_or_exam", new_lesson["name"]);
          history.push('/exercise')

        }
        }>
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
        }
      >
        <SaveIcon fontSize="inherit" style={{height: 30, width: 30, color: '#203F58'}}/>
      </IconButton>
    )
  }

  return (
    <div>
      <div style={{paddingBottom: 80, paddingTop: 120}}>
        <div>
          <h2 style={{
            fontFamily: 'Work Sans',
            color: '#203F58',
            fontSize: 26,
            marginBottom: 0,
            paddingLeft: 20,
            paddingRight: 20
          }}>
            Examen
          </h2>
          <ExamTile data={exam}/>
        </div>
        <div>
          <h2 style={{
            fontFamily: 'Work Sans',
            color: '#203F58',
            fontSize: 26,
            marginBottom: 0,
            paddingLeft: 20,
            paddingRight: 20
          }}>
            Lecciones
          </h2>
          {lessons.map((value, index) => {
            return (
              <LessonTile key={index} data={value}/>
            )
          })}
        </div>
      </div>
      {header()}
      {addButtonButton()}
      {saveButton()}
    </div>
  );
}
