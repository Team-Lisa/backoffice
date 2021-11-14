import React, {useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheckCircle, faCircle, faPlus, faTimes, faTrashAlt} from "@fortawesome/free-solid-svg-icons";
import Select from "react-select";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Modal from "react-modal";

const Exercise = (props) => {
    const [exercise, setExercise] = useState(props.exercise);
    const [exercises, setExercises] = useState([]);
    const [answers, setAnswers] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [question, setQuestion] = useState('');
    const [modalIsOpen, setIsOpen] = useState(false);
    const options = [
        { value: 'Listening', label: 'Listening' },
        { value: 'TranslateToOriginal', label: 'Translate to original' },
        { value: 'TranslateToNew', label: 'Translate to new' },
        { value: 'Complete', label: 'Complete' }
    ]
    const [optionSelected, setOptionSelected] = useState('');
    const saveExercise = () => {
        let correct_answer = "";

        for (let i = 0; i < answers.length; i++) {
            let answer = answers[i];
            if (answer.isSelected){
                correct_answer = answer.itemName;
                break;
            }
        }

        const exercise = {
            exercise_tipe: optionSelected,
            question: question,
            options: answers,
            correct_answer: correct_answer
        }
        props.onChange(exercise);
    }

    const onChangeQuestion = (event) => {
        setQuestion(event.target.value);
    }


    const handleAddButtonClick = () => {
        const newItem = {
            itemName: inputValue,
            quantity: 1,
            isSelected: false,
        };

        const newItems = [...answers, newItem];
        setAnswers(newItems);
        setInputValue('');
    };

    const toggleComplete = (index) => {
        const newItems = [...answers];
        newItems[index].isSelected = !newItems[index].isSelected;
        setAnswers(newItems);
    };

    function openModal() {
        setIsOpen(true);
    }


    function closeModal() {
        resetNewExercises();
        setIsOpen(false);
    }
    const resetNewExercises = () => {
        setOptionSelected('');
        setQuestion('');
        setAnswers([]);
    }

    const handleOptionChange = (selectedOption) => {
        setOptionSelected(selectedOption);
        console.log(`Option selected:`, selectedOption);
    };
    const deleteOption = (index) => {
        const newItems = [...answers];
        newItems.splice(index, 1);
        setAnswers(newItems);
    };

    return (
        <div>
            <div style={{fontSize:"15px", fontFamily:"Montserrat",marginLeft:"5%", marginTop:"2%", marginBottom:"2%"}}>
                Seleccione el tipo de ejercicio que desea crear
            </div>
            <div style={{width:"25%",marginLeft:"5%"}}>
                <Select

                    value={optionSelected}
                    onChange={handleOptionChange}
                    options={options}
                />
            </div>
            <div>
                {optionSelected !== ''
                    ? <div>
                        <Grid style={{marginTop:"3%", marginLeft:"5%"}}>
                            <TextField
                                style={{width:"80%"}}
                                label="Pregunta/Link Audio"
                                name="Pregunta/Link Audio"
                                size="small"
                                variant="outlined"
                                placeholder="Pregunta"
                                onChange={onChangeQuestion}
                            />
                        </Grid>
                        <div style={{fontSize:"15px", fontFamily:"Montserrat",marginLeft:"5%", marginTop:"2%", marginBottom:"2%", color:"black"}}>
                            Agregar las posibles respuesta y seleccione la correcta
                        </div>
                        <Grid style={{marginTop:"3%",marginLeft:"5%"}}>
                            <div style={{width:"80%"}}>
                                <div className='app-background'>
                                    <div className='main-container'>
                                        <div className='add-item-box'>
                                            <input value={inputValue} onChange={(event) => setInputValue(event.target.value)} className='add-item-input' placeholder='Agregar nueva respuesta' />
                                            <FontAwesomeIcon icon={faPlus} onClick={() => handleAddButtonClick()} />
                                        </div>
                                        <div className='item-list'>
                                            {answers.map((item, index) => (
                                                <div className='item-container'>
                                                    <div className='item-name' onClick={() => toggleComplete(index)}>
                                                        {item.isSelected ? (
                                                            <>
                                                                <FontAwesomeIcon style={{color:"white"}} icon={faCheckCircle} />
                                                                <span className='completed'>{item.itemName}</span>
                                                            </>
                                                        ) : (
                                                            <>
                                                                <FontAwesomeIcon style={{color:"white"}} icon={faCircle} />
                                                                <span className='completed'>{item.itemName}</span>
                                                            </>
                                                        )}
                                                    </div>
                                                    <div className='quantity'>
                                                        <button>
                                                            <FontAwesomeIcon icon={faTrashAlt} onClick={() => deleteOption(index)} />
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <Button
                                        style={{marginTop:"18%", marginLeft:"105%", color:"white", background:"#4682B4"}}
                                        onClick={saveExercise}
                                        variant="contained" >
                                        Guardar
                                    </Button>
                                </div>
                            </div>
                        </Grid></div>
                    : ""}
            </div>

        </div>
    )
}

export default Exercise;
