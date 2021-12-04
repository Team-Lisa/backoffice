import Button from "@material-ui/core/Button";
import React from "react";

export default function ExerciseTile({data, edit}) {
  const color = data["exercise_type"] === 'TranslateToOriginal' ? '#CAA7F3' : data["exercise_type"] === 'TranslateToNew' ? '#C4FEAC' : data["exercise_type"] === 'Listening' ? '#FED178' : '#93D9F8';

  const handleClick = () => {
    edit(data)
  };

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
        {(data["exercise_type"] === 'Listening') ? "Audio" : data.question}
      </h2>
      <div style={{display: 'flex', alignItems: 'center'}}>
        <h4 style={{fontFamily: 'Montserrat', color: '#203F58', paddingRight: 20, paddingLeft: 20}}>
          {data.options.length} opciones
        </h4>
        <div>
          <Button variant="contained" style={{
            color: '#203F58',
            backgroundColor: 'rgba(255,255,255,0.5)',
            borderRadius: 10,
            width: 150,
            fontFamily: 'Montserrat',
          }} onClick={handleClick}>
            Editar
          </Button>
        </div>
      </div>
    </div>
  )
}
