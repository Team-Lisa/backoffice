import React, {useState} from "react";
import Button from "@material-ui/core/Button";
import ExerciseTile from "./ExerciseTile";
import Modal from "react-modal";
import {ButtonGroup, IconButton} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import {useHistory} from "react-router-dom";

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

export default function ExercisesScreen() {
  const history = useHistory();
  const actualData = JSON.parse(localStorage.getItem('actualData'));
  const actualUnitData = JSON.parse(localStorage.getItem('actualUnitData'));
  const [completeButton, setCompleteButton] = useState('white');
  const [toNewButton, setToNew] = useState('white');
  const [toOriginalButton, setToOriginal] = useState('#CAA7F3');
  const [audioButton, setAudio] = useState('white');
  const [question, setQuestion] = useState('');
  const [answerOne, setAnswerOne] = useState('');
  const [answerTwo, setAnswerTwo] = useState('');
  const [answerThree, setAnswerThree] = useState('');
  const [answerFour, setAnswerFour] = useState('');
  const [answerFive, setAnswerFive] = useState('');
  const [answerSix, setAnswerSix] = useState('');
  const [correct, setCorrect] = useState(1);
  const [openModal, setOpenModal] = useState(false);

  const buttonHandle = (number) => {
    setCorrect(number);
  }

  const onChangeQuestion = (event) => {
    setQuestion(event.target.value);
  }

  const onChangeAnswerOne = (event) => {
    setAnswerOne(event.target.value);
  }

  const onChangeAnswerTwo = (event) => {
    setAnswerTwo(event.target.value);
  }

  const onChangeAnswerThree = (event) => {
    setAnswerThree(event.target.value);
  }

  const onChangeAnswerFour = (event) => {
    setAnswerFour(event.target.value);
  }

  const onChangeAnswerFive = (event) => {
    setAnswerFive(event.target.value);
  }

  const onChangeAnswerSix = (event) => {
    setAnswerSix(event.target.value);
  }

  const completeHandle = () => {
    setCompleteButton('#93D9F8');
    setAudio('white');
    setToNew('white');
    setToOriginal('white')
    if (correct > 4) {
      setCorrect(4);
    }
  }

  const toNewHandle = () => {
    setCompleteButton('white');
    setAudio('white');
    setToNew('#C4FEAC');
    setToOriginal('white')
  }

  const toOriginalHandle = () => {
    setCompleteButton('white');
    setAudio('white');
    setToNew('white');
    setToOriginal('#CAA7F3')
  }

  const audioHandle = () => {
    setCompleteButton('white');
    setAudio('#FED178');
    setToNew('white');
    setToOriginal('white')
  }

  const handleBack = () => {
    history.push('/lessons')
  }

  const header = () => {
    return (
      <div style={styles.headerDiv}>
        <div style={{display: 'flex'}}>
          <div style={{paddingTop: 30}}>
            <IconButton style={{padding: 0, margin: 0}} onClick={handleBack}>
              <ChevronLeftIcon fontSize="inherit" style={{height: 50, width: 50, color: '#203F58'}}/>
            </IconButton>
          </div>
          <h1 style={styles.headerTitle}>
            Desafío {actualData['challenge_id'][1]} - {actualData.name}
          </h1>
        </div>
        <h3 style={styles.headerSubtitle}>
          {actualUnitData.name} - Lección {1}
        </h3>
      </div>
    )
  }

  const options = () => {
    if (completeButton !== '#93D9F8') {
      return (
        <div>
          <div style={styles.optionView}>
            <TextField
              style={styles.textFieldStyle}
              inputProps={styles.inputProps}
              InputLabelProps={styles.inputProps}
              size="small"
              variant="outlined"
              margin="normal"
              value={answerFive}
              onChange={onChangeAnswerFive}
            />
            <Button variant="contained" style={{
              ...styles.correctButtons,
              color: correct === 5 ? '#CEEDE8' : '#203F58',
              backgroundColor: correct === 5 ? '#203F58' : 'white'
            }}
                    onClick={() => {
                      buttonHandle(5)
                    }}>
              Correcta
            </Button>
          </div>
          <div style={styles.optionView}>
            <TextField
              style={styles.textFieldStyle}
              inputProps={styles.inputProps}
              InputLabelProps={styles.inputProps}
              size="small"
              variant="outlined"
              margin="normal"
              value={answerSix}
              onChange={onChangeAnswerSix}
            />
            <Button variant="contained" style={{
              ...styles.correctButtons,
              color: correct === 6 ? '#CEEDE8' : '#203F58',
              backgroundColor: correct === 6 ? '#203F58' : 'white'
            }}
                    onClick={() => {
                      buttonHandle(6)
                    }}>
              Correcta
            </Button>
          </div>
        </div>
      )
    }
  }

  const newExercise = () => {
    return (
      <Modal isOpen={openModal} centered style={styles.modalContent}>
        <div style={styles.modalView}>
          <div style={styles.modal}>
            <div style={styles.optionView}>
              <h2 style={{...styles.title, paddingLeft: 30}}>
                Tipo de ejericio
              </h2>
              <Button variant="text" style={styles.closeButton}
                      onClick={() => {
                        setOpenModal(false);
                      }}>
                X
              </Button>
            </div>
            <div style={{display: 'flex', justifyContent: 'center', width: '100%'}}>
              <ButtonGroup aria-label="outlined button group">
                <Button variant="contained" style={{...styles.typeButton, backgroundColor: toOriginalButton}}
                        onClick={toOriginalHandle}>
                  Translate to Original
                </Button>
                <Button variant="contained" style={{...styles.typeButton, backgroundColor: toNewButton}}
                        onClick={toNewHandle}>
                  Translate to New
                </Button>
                <Button variant="contained" style={{...styles.typeButton, backgroundColor: completeButton}}
                        onClick={completeHandle}>
                  Complete
                </Button>
                <Button variant="contained" style={{...styles.typeButton, backgroundColor: audioButton}}
                        onClick={audioHandle}>
                  Listening
                </Button>
              </ButtonGroup>
            </div>
            <div style={styles.optionsView}>
              <h2 style={styles.title}>
                Pregunta
              </h2>
              <TextField
                style={{...styles.textFieldStyle, width: '100%'}}
                inputProps={styles.inputProps}
                InputLabelProps={styles.inputProps}
                size="small"
                variant="outlined"
                margin="normal"
                value={question}
                onChange={onChangeQuestion}
              />
              <h2 style={styles.title}>
                Opciones
              </h2>
              <div>
                <div style={styles.optionView}>
                  <TextField
                    style={styles.textFieldStyle}
                    inputProps={styles.inputProps}
                    InputLabelProps={styles.inputProps}
                    size="small"
                    variant="outlined"
                    margin="normal"
                    value={answerOne}
                    onChange={onChangeAnswerOne}
                  />
                  <Button variant="contained" style={{
                    ...styles.correctButtons,
                    color: correct === 1 ? '#CEEDE8' : '#203F58',
                    backgroundColor: correct === 1 ? '#203F58' : 'white'
                  }}
                          onClick={() => {
                            buttonHandle(1)
                          }}>
                    Correcta
                  </Button>
                </div>
                <div style={styles.optionView}>
                  <TextField
                    style={styles.textFieldStyle}
                    inputProps={styles.inputProps}
                    InputLabelProps={styles.inputProps}
                    size="small"
                    variant="outlined"
                    margin="normal"
                    value={answerTwo}
                    onChange={onChangeAnswerTwo}
                  />
                  <Button variant="contained" style={{
                    ...styles.correctButtons,
                    color: correct === 2 ? '#CEEDE8' : '#203F58',
                    backgroundColor: correct === 2 ? '#203F58' : 'white'
                  }}
                          onClick={() => {
                            buttonHandle(2)
                          }}>
                    Correcta
                  </Button>
                </div>
                <div style={styles.optionView}>
                  <TextField
                    style={styles.textFieldStyle}
                    inputProps={styles.inputProps}
                    InputLabelProps={styles.inputProps}
                    size="small"
                    variant="outlined"
                    margin="normal"
                    value={answerThree}
                    onChange={onChangeAnswerThree}
                  />
                  <Button variant="contained" style={{
                    ...styles.correctButtons,
                    color: correct === 3 ? '#CEEDE8' : '#203F58',
                    backgroundColor: correct === 3 ? '#203F58' : 'white'
                  }}
                          onClick={() => {
                            buttonHandle(3)
                          }}>
                    Correcta
                  </Button>
                </div>
                <div style={styles.optionView}>
                  <TextField
                    style={styles.textFieldStyle}
                    inputProps={styles.inputProps}
                    InputLabelProps={styles.inputProps}
                    size="small"
                    variant="outlined"
                    margin="normal"
                    value={answerFour}
                    onChange={onChangeAnswerFour}
                  />
                  <Button variant="contained" style={{
                    ...styles.correctButtons,
                    color: correct === 4 ? '#CEEDE8' : '#203F58',
                    backgroundColor: correct === 4 ? '#203F58' : 'white'
                  }}
                          onClick={() => {
                            buttonHandle(4)
                          }}>
                    Correcta
                  </Button>
                </div>
                {options()}
              </div>
              <div style={{justifyContent: 'flex-end', display: 'flex', width: '100%'}}>
                <Button variant="contained" style={styles.saveButton}
                        onClick={() => {
                          setOpenModal(false);
                        }}>
                  Guardar
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    )
  }

  const addButtonBottom = () => {
    return (
      <Button variant={'contained'}
              style={styles.addButton}
              onClick={() => {
                setOpenModal(true);
              }}
      >
        +
      </Button>
    )
  }

  return (
    <div>
      <div style={{paddingBottom: 80, paddingTop: 100}}>
        {data.map((value, index) => {
          return (
            <ExerciseTile key={index} data={value}/>
          )
        })}
      </div>
      {header()}
      {addButtonBottom()}
      {newExercise()}
    </div>
  );
}

const styles = {
  textFieldStyle: {width: "85%", marginTop: 0, borderRadius: 20},
  inputProps: {style: {fontFamily: 'Work Sans', color: '#203F58', fontSize: 18}},
  saveButton: {
    color: '#203F58',
    backgroundColor: '#C4FEAC',
    borderRadius: 10,
    width: 150,
    height: 50,
    fontWeight: '700',
    fontFamily: 'Montserrat',
    marginTop: 30
  },
  correctButtons: {
    borderRadius: 10,
    width: 150,
    height: 40,
    fontFamily: 'Montserrat',
  },
  optionView: {display: 'flex', justifyContent: 'space-between'},
  modalContent: {
    content: {
      height: '70%',
      width: '70%',
      borderRadius: 20,
      backgroundColor: 'white',
      top: '15%',
      left: '15%',
      right: 'auto',
      bottom: 'auto',
    }
  },
  modalView: {
    alignItems: 'center',
    height: '100%',
    width: '100%',
  },
  modal: {
    backgroundColor: 'white',
    height: '100%',
    width: '100%'
  },
  title: {
    fontFamily: 'Work Sans',
    color: '#203F58',
    fontSize: 22,
    margin: 0,
    paddingBottom: 10
  },
  closeButton: {
    color: '#203F58',
    borderRadius: 20,
    fontWeight: '700',
    fontFamily: 'Montserrat',
  },
  typeButton: {
    color: '#203F58',
    backgroundColor: 'white',
    borderRadius: 10,
    width: 200,
    fontFamily: 'Montserrat',
    margin: 10
  },
  optionsView: {padding: 30, paddingTop: 10, paddingBottom: 10},
  addButton: {
    color: '#CEEDE8',
    backgroundColor: '#203F58',
    borderRadius: 50,
    width: 60,
    height: 62,
    fontSize: 35,
    fontFamily: 'Montserrat',
    position: 'fixed',
    bottom: 20,
    right: 20
  },
  headerDiv: {
    width: '100%',
    height: 80,
    paddingBottom: 20,
    alignItems: 'center',
    position: 'fixed',
    top: 0,
    backgroundColor: 'rgba(255,255,255,0.9)'
  },
  headerTitle: {fontFamily: 'Work Sans', color: '#203F58', fontSize: 42, marginBottom: 0},
  headerSubtitle: {fontFamily: 'Montserrat', color: '#203F58', fontWeight: 700, marginTop: 0, paddingLeft: 50}
}