import React, {useEffect, useState} from "react";
import UnitsTile from "./UnitsTile";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import {IconButton} from "@material-ui/core";
import {useHistory} from "react-router-dom";
import {Add, CheckCircle, Close, Error} from "@material-ui/icons";
import SaveIcon from "@mui/icons-material/Save";
import ChallengeModel from "../Models/Challenge";
import {createChallenge, saveChallenge} from "../Communication/challenge_controller";
import ExerciseModel from "../Models/Exercise";
import {createExercise} from "../Communication/exercises_controller";
import Modal from "react-modal";

export default function UnitScreen() {
  const actualColor = localStorage.getItem('actualColor');
  const [actualData, setActualData] = useState(ChallengeModel.getActualChallenge);
  const [subtitle, setSubtitle] = useState(actualData.name);
  const units = actualData.units;
  const id = actualData['challenge_id'];
  const challenges = JSON.parse(localStorage.getItem("challenges"));
  let new_challenge = localStorage.getItem("challenge_is_new");

  const checkChallengesName = (name) => {
    for (let i = 0; i < challenges.length; i++) {
      if (id !== challenges[i]['challenge_id']) {
        if (challenges[i]['name'].toLowerCase().localeCompare(name.toLowerCase()) === 0) {
          return true;
        }
      }
    }
    return false;
  }

  const [label, setLabel] = useState(actualData.name.length <= 0 ? "Nombre del desafío vacio" : checkChallengesName(actualData.name) ? "Nombre del desafío repetido" : "Nombre del desafío");
  const [openMsgModal, setOpenMsgModal] = useState(false);
  const [msgCorrect, setMsgCorrect] = useState(true);
  const [message, setMessage] = useState("El nombre del desafío no puede estar vacio")

  const history = useHistory();

  const onChangeSubtitle = (event) => {
    setSubtitle(event.target.value);
    actualData.name = event.target.value;
    if (checkChallengesName(event.target.value)) {
      setLabel("Nombre del desafío repetido");
    } else {
      if (event.target.value.length <= 0) {
        setLabel("Nombre del desafío vacio");
      } else {
        setLabel("Nombre del desafío");
      }
    }
    actualData.save();
  }

  useEffect(() => {
    if (openMsgModal) {
      setTimeout(() => {
        setOpenMsgModal(false);
      }, 5000)
    }
  }, [openMsgModal])

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

  const modalResponse = () => {
    if (msgCorrect) {
      return (
        <Modal isOpen={openMsgModal} centered style={{
          content: {
            height: 40,
            width: '60%',
            borderRadius: 20,
            backgroundColor: '#C4FEAC',
            top: '5%',
            left: '20%',
            right: 'auto',
            bottom: 'auto',
            alignItems: 'center'
          }
        }}>
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
            <div
              style={{display: 'flex', alignItems: 'center', fontFamily: 'Montserrat', fontSize: 26, color: '#203F58'}}>
              <CheckCircle fontSize="inherit" style={{height: 30, width: 30, color: '#203F58', marginRight: 10}}/>
              Guardado exitoso
            </div>
            <IconButton
              onClick={() => {
                setOpenMsgModal(false);
              }}>
              <Close fontSize="inherit" style={{height: 15, width: 15, color: '#203F58'}}/>
            </IconButton>
          </div>
        </Modal>
      )
    } else {
      return (
        <Modal isOpen={openMsgModal} centered style={{
          content: {
            height: 40,
            width: '60%',
            borderRadius: 20,
            backgroundColor: '#ff3939',
            top: '5%',
            left: '20%',
            right: 'auto',
            bottom: 'auto',
            alignItems: 'center'
          }
        }}>
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
            <div
              style={{display: 'flex', alignItems: 'center', fontFamily: 'Montserrat', fontSize: 26, color: 'white'}}>
              <Error fontSize="inherit" style={{height: 30, width: 30, color: 'white', marginRight: 10}}/>
              {message}
            </div>

            <IconButton
              onClick={() => {
                setOpenMsgModal(false);
              }}>
              <Close fontSize="inherit" style={{height: 15, width: 15, color: 'white'}}/>
            </IconButton>
          </div>
        </Modal>
      )
    }
  }

  const headerSubtitle = () => {
    if (!actualData.published) {
      return (
        <TextField
          required
          label={label}
          error={subtitle.length <= 0 ? true : checkChallengesName(subtitle)}
          style={{width: "30%", marginTop: 30, alignItems: 'flex-start'}}
          inputProps={{style: {fontFamily: 'Work Sans', color: '#203F58', fontSize: 42, fontWeight: 700}}}
          size="small"
          variant="outlined"
          margin="normal"
          value={subtitle}
          onChange={onChangeSubtitle}
        />
      )
    }
  }

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
            <div style={{paddingTop: actualData.published ? 30 : 20}}>
              <IconButton style={{padding: 0, margin: 0}} onClick={handleBack}>
                <ChevronLeftIcon fontSize="inherit" style={{height: 50, width: 50, color: '#203F58'}}/>
              </IconButton>
            </div>
            <h1 style={{
              fontFamily: 'Work Sans',
              color: '#203F58',
              fontSize: 42,
              marginBottom: 0,
              paddingBottom: actualData.published ? 0 : 10
            }}>
              Desafío {actualData.challenge_id.slice(1)} -{actualData.published ? " " + subtitle : ""}
            </h1>
            {headerSubtitle()}
          </div>
        </div>
      </div>
    )
  }

  const addButtonButton = () => {
    return (
      <IconButton
        style={{padding: 15, margin: 15, position: 'fixed', bottom: 10, right: 10, backgroundColor: actualColor}}
        onClick={() => {
          if (label.localeCompare("Nombre del desafío") !== 0) {
            setMsgCorrect(false);
            setMessage(subtitle.length === 0 ? "El nombre del desafío no puede estar vacio" : "El nombre del desafío no puede repetirse");
            setOpenMsgModal(true);
            return;
          }
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
        style={{
          padding: 15,
          margin: 15,
          position: 'fixed',
          bottom: actualData.published ? 10 : 80,
          right: 10,
          backgroundColor: actualColor
        }}
        onClick={
          async () => {
            if (label.localeCompare("Nombre del desafío") !== 0) {
              setMsgCorrect(false);
              setMessage(subtitle.length === 0 ? "El nombre del desafío no puede estar vacio" : "El nombre del desafío no puede repetirse");
              setOpenMsgModal(true);
              return;
            }
            let challenge_to_save = ChallengeModel.getActualChallengeJSON();
            let new_challenge = localStorage.getItem("challenge_is_new");
            if (new_challenge !== "true") {
              let response = await saveChallenge(challenge_to_save["id"], challenge_to_save);
              if (response) {
                console.log("challenge created")
                setMsgCorrect(true);
                setOpenMsgModal(true);
                // handleBack();
              } else {
                console.log("error")
                setMsgCorrect(false);
                setMessage("Algo Salio Mal")
                setOpenMsgModal(true);
              }

            } else {
              let response = await createChallenge(challenge_to_save);
              if (response) {
                console.log("challenge created")
                setMsgCorrect(true);
                setOpenMsgModal(true);
              } else {
                console.log("error")
                setMsgCorrect(false);
                setMessage("Algo Salio Mal")
                setOpenMsgModal(true);
              }

              let exercises = await ExerciseModel.getExercisesToSave();
              for (const lesson_id in exercises) {
                let exercises_i = exercises[lesson_id];
                for (let i = 0; i < exercises_i.length; i++) {
                  let exercise = exercises_i[i]
                  delete exercise["exercise_id"];
                  let response_exercise = await createExercise(exercise);
                  if (response_exercise) {
                    console.log("exercise created")
                    setMsgCorrect(true);
                    setOpenMsgModal(true);
                  } else {
                    console.log("error exercise")
                    setMsgCorrect(false);
                    setMessage("Algo Salio Mal")
                    setOpenMsgModal(true);
                  }
                }
                // handleBack();
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
      {!actualData.published && addButtonButton()}
      {saveButton()}
      {modalResponse()}
    </div>
  );
}
