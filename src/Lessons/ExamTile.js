import Button from "@material-ui/core/Button";
import React, {useEffect, useState} from "react";
import {Redirect, useHistory} from "react-router-dom";
import {getExamExercises, getLessonExercises} from "../Communication/challenge_controller";
import ExerciseModel from "../Models/Exercise";

export default function ExamTile({data}) {
  const actualColor = localStorage.getItem('actualColor');
  const history = useHistory();
  const [exercises, setExercises] = useState([]);
  const [stop, setStop] = useState(false);
  useEffect(() => {
    async function loadChallenges() {
      if (exercises.length === 0 && !stop) {
        let exercises_to_load = await getExamExercises(data.id);
        let exercises_storage = ExerciseModel.getExercises(data.id);
        let exercises_to_save = {};
        if (localStorage.hasOwnProperty('exercises_to_saved')) {
          exercises_to_save = JSON.parse(localStorage.getItem('exercises_to_saved'));
        }
        if (exercises_to_load.length === 0 || exercises_storage.length > exercises_to_load.length) {
          setExercises(exercises_storage);
          exercises_to_save[data.id] = exercises_storage;
          localStorage.setItem("exercises_to_saved", JSON.stringify(exercises_to_save));
        } else {
          setExercises(exercises_to_load);
          exercises_to_save[data.id] = exercises_to_load;
          localStorage.setItem("exercises_to_saved", JSON.stringify(exercises_to_save));
        }
        setStop(true)
      }

    }

    loadChallenges()
  }, [exercises])

  const handleClick = async () => {
    localStorage.setItem("exercises", JSON.stringify(exercises));
    localStorage.setItem("lesson_or_exam", "Examen");
    localStorage.setItem("actualLesson", JSON.stringify(data));
    setStop(false);
    history.push('/exercise')
  };

  return (
    <div>
      {(exercises.length >= 0) ?
        <div style={{
          width: '95%',
          height: 80,
          backgroundColor: actualColor,
          borderRadius: 20,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          margin: '20px',
          paddingLeft: 20,
          paddingRight: 20
        }}>
          <h2 style={{fontFamily: 'Montserrat', color: '#203F58'}}>
            Examen Final
          </h2>
          <div style={{display: 'flex', alignItems: 'center'}}>
            <h4 style={{fontFamily: 'Montserrat', color: '#203F58', paddingRight: 20, paddingLeft: 20}}>
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
        </div>
        : ""}
    </div>
  )
}
