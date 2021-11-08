import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import React, {useState} from "react";
import {Redirect, useHistory} from "react-router-dom";
import { FaPlusCircle } from 'react-icons/fa';
import Modal from "react-modal";
import Select from 'react-select'
import './index.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheckCircle, faCircle, faPlus, faTimes, faTrashAlt, faWindowClose} from "@fortawesome/free-solid-svg-icons";
import createLesson from '../../Communication/challenge_controller';


const ContentManager = () => {
    const [modalIsOpen, setIsOpen] = useState(false);
    const options = [
        { value: 'Listening', label: 'Listening' },
        { value: 'TranslateToOriginal', label: 'Translate to original' },
        { value: 'TranslateToNew', label: 'Translate to new' },
        { value: 'Complete', label: 'Complete' }
    ]
    const [optionSelected, setOptionSelected] = useState('');
    const [answers, setAnswers] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [question, setQuestion] = useState('');
    const [name, setName] = useState('');
    const [exercises, setExcercises] = useState([]);

    const logged_storage = localStorage.getItem('logged');
    if(logged_storage !== "true"){
        return(<Redirect  to="/login"/>)
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
        console.log(exercise);
        setExcercises([...exercises, exercise]);
        closeModal();
    }

    const onChangeQuestion = (event) => {
        setQuestion(event.target.value);
    }

    const onChangeName = (event) => {
        setName(event.target.value);
    }

    function openModal() {
        setIsOpen(true);
    }


    function closeModal() {
        resetNewExercises();
        setIsOpen(false);
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


    const deleteOption = (index) => {
        const newItems = [...answers];
        newItems.splice(index, 1);
        setAnswers(newItems);
    };

    const toggleComplete = (index) => {
        const newItems = [...answers];
        newItems[index].isSelected = !newItems[index].isSelected;
        setAnswers(newItems);
    };

    const deleteExercise = (index) => {
        const newExercises = [...exercises];
        newExercises.splice(index, 1);
        setExcercises(newExercises);
    };

    const saveChallenge = () => {
        const lesson = {
            name: name,
            id: "L1",
            exercises: exercises
        }
        createLesson(lesson)
    }

    return (
        <div style={{marginLeft:"2%"}}>
            <div style={{fontSize:"30px", fontFamily:"Montserrat",marginLeft:"1%", color:"black"}}>
                Crear Leccion
            </div>
            <div style={{marginTop:"2%"}}>
                <form>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                               style={{marginLeft:"1%"}}
                                               label="Nombre"
                                               name="Nombre"
                                               size="small"
                                               variant="outlined"
                                               placeholder="Nombre"
                                               onChange={onChangeName}
                                    />
                                </Grid>
                                <div style={{fontSize:"30px", fontFamily:"Montserrat", marginLeft:"2%", marginTop:"1%", width:"60%", color:"black"}}>
                                    Ejercicios
                                    <FaPlusCircle
                                    style={{marginLeft:"1%", marginTop:"1%"}}
                                    color={'green'}
                                    size={'25px'}
                                    onClick={openModal}
                                    />
                                </div>
                                <div style={{width: "70%"}}>
                                    <Modal
                                        isOpen={modalIsOpen}
                                        onRequestClose={closeModal}
                                        style={customStyles}
                                        contentLabel="Example Modal"
                                    >

                                        <div style={{fontSize:"20px", fontFamily:"Montserrat",marginLeft:"5%", color:"black"}}>
                                            Crear ejercicio
                                            <FontAwesomeIcon style={{color:"black", marginLeft:"80%"}} icon={faTimes} onClick={closeModal}/>
                                        </div>
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
                                                        label="Pregunta"
                                                        name="Pregunta"
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

                                    </Modal>
                                </div>

                            </Grid>
                        </Grid>
                        <div style={{width:"30%", marginLeft:"2%", marginTop:"2%"}}>
                            {exercises.length > 0?
                            <div className='app-background'>
                                <div className='main-container'>
                                    <div className='item-list'>
                                        {exercises.map((exercise, index) => (
                                            <div className='item-container'>
                                                <div className='item-name'>
                                                    <span className='completed'>{exercise.question}</span>
                                                </div>
                                                <div className='quantity'>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>:<div/>}
                        </div>
                        <Grid item xs={12}>
                            <Button style={{background:"#4682B4", color:"white", marginLeft:"70%", marginTop:"10%"}} onClick={saveChallenge}   variant="contained" >
                                Guardar
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </div>
    )
}

const customStyles = {
    content: {
        width: "60%",
        height: "70%",
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    },
};
//<button onClick={closeModal}>close</button>
export default ContentManager;


//<button>
//    <FontAwesomeIcon icon={faTrashAlt} onClick={() => deleteExercise(index)} />
//</button>
