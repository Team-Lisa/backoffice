import React, {useState} from "react";
import {Redirect} from "react-router-dom";
import createLesson from "../../Communication/challenge_controller";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import {FaPlusCircle} from "react-icons/fa";
import Modal from "react-modal";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimes} from "@fortawesome/free-solid-svg-icons";
import Exercise from "./exercise";
import Button from "@material-ui/core/Button";
import './index.css';


const Lesson = (props) => {
    const [modalIsOpen, setIsOpen] = useState(false);
    const [name, setName] = useState('');
    const [exercises, setExcercises] = useState([]);
    const [lesson, setLesson] = useState(props.lesson);
    const logged_storage = localStorage.getItem('logged');
    if(logged_storage !== "true"){
        return(<Redirect  to="/login"/>)
    }

    const handleChange = (exercise) => {
        setExcercises([...exercises, exercise]);
        closeModal();
    }

    const onChangeName = (event) => {
        setName(event.target.value);
    }

    function openModal() {
        setIsOpen(true);
    }


    function closeModal() {
        setIsOpen(false);
    }

    return (
        <div style={{marginLeft:"2%"}}>
            <div style={{marginTop:"2%"}}>
                <form>
                    <Grid >
                        <Grid >
                            <Grid >
                                <div style={{fontSize:"15px", fontFamily:"Montserrat", marginLeft:"20%", marginTop:"1%", color:"black"}}>
                                    Ejercicios
                                    <FaPlusCircle
                                        style={{marginLeft:"1%", marginBottom:"-0%"}}
                                        color={'green'}
                                        size={'15px'}
                                        onClick={openModal}
                                    />
                                </div>
                                <div >
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

                                        <Exercise onChange={handleChange}/>
                                    </Modal>
                                </div>

                            </Grid>
                        </Grid>
                        <div style={{width:"60%", marginLeft:"20%", marginTop:"2%"}}>
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

export default Lesson;
