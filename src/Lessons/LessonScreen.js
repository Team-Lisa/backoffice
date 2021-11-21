import React, {useState} from "react";
import TextField from "@material-ui/core/TextField";
import LessonTile from "./LessonTile";
import Button from "@material-ui/core/Button";

export default function LessonScreen() {
  const actualColor = localStorage.getItem('actualColor');
  const actualData = JSON.parse(localStorage.getItem('actualData'));
  const actualUnitData = JSON.parse(localStorage.getItem('actualUnitData'));
  const [subtitle, setSubtitle] = useState(actualUnitData.name);
  console.log(actualData);
  const lessons = actualUnitData['lessons']

  const onChangeSubtitle = (event) => {
    setSubtitle(event.target.value);
    actualUnitData.name = event.target.value;
    localStorage.setItem("actualUnitData", JSON.stringify(actualUnitData));
  }


  const header = () => {
    return (
      <div style={{
        width: '100%',
        height: 80,
        paddingBottom: 20,
        marginLeft: 20,
        marginRight: 20,
        alignItems: 'center',
        position: 'fixed',
        top: 0,
        backgroundColor: 'rgba(255,255,255,0.9)'
      }}>
        <div style={{justifyContent: 'center', display: 'inline'}}>
          <h1 style={{fontFamily: 'Work Sans', color: '#203F58', fontSize: 42, marginBottom: 0}}>
            Desafío {actualData['challenge_id'][1]} - {actualData.name}
          </h1>
          <TextField
            style={{width: "30%", marginTop: 0}}
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
      <div style={{paddingBottom: 80, paddingTop: 100}}>
        {lessons.map((value, index) => {
          return (
            <LessonTile key={index} data={value}/>
          )
        })}
      </div>
      {header()}
      {addButtonBottom()}
    </div>
  );
}