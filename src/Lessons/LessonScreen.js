import React, {useState} from "react";
import TextField from "@material-ui/core/TextField";
import LessonTile from "./LessonTile";

export default function LessonScreen() {
  const actualColor = localStorage.getItem('actualColor');
  const actualData = JSON.parse(localStorage.getItem('actualData'));
  const actualUnitData = JSON.parse(localStorage.getItem('actualUnitData'));
  const [subtitle, setSubtitle] = useState(actualUnitData.name);
  console.log(actualData);

  const onChangeSubtitle = (event) => {
    setSubtitle(event.target.value);
  }

  const data = [
    {
      "lesson_id": "L1",
      "exercise_type": "TranslateToOriginal",
      "question": "The cat is under the table",
      "options": [
        "El gato está arriba de la mesa",
        "El perro está debajo de la mesa",
        "El gato está debajo de la tabla",
        "El gato está debajo de la mesa",
        "El perro está arriba de la mesa",
        "El gato está arriba de la tabla"
      ],
      "correct_answer": "El gato está debajo de la mesa",
      "exercise_id": "0"
    },
    {
      "lesson_id": "L1",
      "exercise_type": "TranslateToNew",
      "question": "Joana y Pedro están estudiando juntos",
      "options": [
        "Joana and Pedro are eating together",
        "Joana and Pedro are playing together",
        "Joana and Pedro are studying together",
        "Joana and Pedro is studying together",
        "Joana or Pedro is studying together",
        "Joana and Pedro are cooking together"
      ],
      "correct_answer": "Joana and Pedro are studying together",
      "exercise_id": "1"
    },
    {
      "lesson_id": "L1",
      "exercise_type": "Complete",
      "question": "I love ________ apples, they are my favorite ________",
      "options": [
        "Drinking/Fruit",
        "Eating/Fruit",
        "Eating/Vegetable",
        "Eating/Fruits"
      ],
      "correct_answer": "Eating/Fruit",
      "exercise_id": "2"
    },
    {
      "lesson_id": "L1",
      "exercise_type": "Listening",
      "question": "https://www.book2.nl/book2/EN/SOUND/0703.mp3",
      "options": [
        "Where is the bus stop?",
        "Where is the buzz stop?",
        "Were is the bus stop?",
        "Here is the bus stop?",
        "Where is the bass stop?",
        "When is the bus stop?"
      ],
      "correct_answer": "Where is the bus stop?",
      "exercise_id": "3"
    }
  ]


  const header = () => {
    return (
      <div style={{width: '100%', height: 120, paddingBottom: 20, alignItems: 'center', marginLeft: 20, marginRight: 20, paddingTop: 10}}>
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

  // console.log(lessons);

  return (
    <div>
      {header()}
      {data.map((value, index) => {
        return (
          <LessonTile key={index} data={value}/>
        )
      })}
    </div>
  );
}