import React, {useState} from "react";
import TextField from "@material-ui/core/TextField";
import LessonTile from "./LessonTile";
import Button from "@material-ui/core/Button";
import ExamTile from "./ExamTile";
import {IconButton} from "@material-ui/core";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import {useHistory} from "react-router-dom";

export default function LessonScreen() {
  const actualColor = localStorage.getItem('actualColor');
  const actualData = JSON.parse(localStorage.getItem('actualData'));
  const actualUnitData = JSON.parse(localStorage.getItem('actualUnitData'));
  const [subtitle, setSubtitle] = useState(actualUnitData.name);
  const history = useHistory();
  const lessons = actualUnitData['lessons'];

  const onChangeSubtitle = (event) => {
    setSubtitle(event.target.value);
    actualUnitData.name = event.target.value;
    localStorage.setItem("actualUnitData", JSON.stringify(actualUnitData));
  }

  const handleBack = () => {
    history.push('/units')
  }


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
              Desafío {actualData['challenge_id'][1]} - {actualData.name}
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

  const addButtonBottom = () => {
    return (
      <Button variant={'contained'}
              style={{
                color: '#203F58',
                backgroundColor: actualColor,
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
          <ExamTile/>
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
      {addButtonBottom()}
    </div>
  );
}
