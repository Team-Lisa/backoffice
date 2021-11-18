import Button from "@material-ui/core/Button";
import React from "react";

export default function LessonTile({data}) {
  const color = data["exercise_type"] === 'TranslateToOriginal' ? '#CAA7F3' : data["exercise_type"] === 'TranslateToNew' ? '#C4FEAC' : data["exercise_type"] === 'Listening' ? '#FED178' : '#93D9F8';


  return (
    <div style={{
      width: '100%',
      height: 80,
      backgroundColor: color,
      borderRadius: 20,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-around',
      margin: '20px'
    }}>
      <h2 style={{fontFamily: 'Montserrat', color: '#203F58', width: "70%"}}>
        {data.question}
      </h2>
      <h4 style={{fontFamily: 'Montserrat'}}>
        {data.options.length} opciones
      </h4>
      <div>
      </div>
    </div>
  )
}