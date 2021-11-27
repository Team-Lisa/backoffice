import Button from "@material-ui/core/Button";
import React, {useEffect, useState} from "react";
import {Redirect, useHistory} from "react-router-dom";
import {getChallenges, getLessonExercises} from "../Communication/challenge_controller";
import ExerciseModel from "../Models/Exercise";

export default function LessonTile({data}) {
  const actualColor = localStorage.getItem('actualColor');
  const history = useHistory();
  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    async function loadChallenges(){
      if (exercises.length === 0){
        let exercises_to_load = await getLessonExercises(data.id);
        let exercises_storage = ExerciseModel.getExercises(data.id);
         if (exercises_to_load.length === 0 || exercises_storage.length > exercises_to_load.length){
           setExercises(exercises_storage);
        }else{
           setExercises(exercises_to_load);
         }
      }

      }
      loadChallenges()
  }, [exercises])

  const handleClick = async () => {
    localStorage.setItem("exercises_to_saved", JSON.stringify(exercises));
    let number = data.id.split("L")[1];
    localStorage.setItem("lesson_or_exam", "Lección " + number);
    history.push('/exercise')
  };

  return (
    <div>
      {(exercises.length >= 0) ?
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
                  {data.name}
              </h2>
              <h4 style={{fontFamily: 'Montserrat', color: '#203F58'}}>
                  {exercises.length} Ejercicios
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
          :"" }
    </div>
  )
}
