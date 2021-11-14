import React, {useState} from "react";
import Lesson from "./lesson";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import {FaPlusCircle} from "react-icons/fa";
import Modal from "react-modal";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronDown, faChevronUp, faTimes} from "@fortawesome/free-solid-svg-icons";
import Exercise from "./exercise";
import Button from "@material-ui/core/Button";
import Collapse from "@kunukn/react-collapse";



const ContentManager = () => {
    const [name, setName] = useState('');
    const [lessons, setLessons] = useState([]);
    const [units, setUnits] = useState([]);
    const [blockOpens, setBlockOpens] = useState([])
    const [blockLessonsOpens, setBlockLessonsOpens] = useState({})

    const addLesson = (id) => {
        const lesson = {
            exercises: []
        };

        const unitsNew = [...units];
        unitsNew[id].lessons.push(lesson);
        setUnits([...unitsNew]);
        const blockNew = {...blockLessonsOpens};
        if (id in blockNew){
            blockNew[id] = [...blockNew[id], true];
        } else {
            blockNew[id] = [true];
        }
        setBlockLessonsOpens(blockNew)
    }

    const addUnit = () => {
        const unit = {
            lessons: [],
            exam : {exercise:[]},
            name: ""
        };

        setUnits([...units, unit])
        setBlockOpens([...blockOpens, true])
    }

    const Unit = (props) => (
            <div style={{marginLeft:"10%"}}>

                <div>
                    <TextField
                        style={{marginLeft:"1%"}}
                        label="Nombre"
                        name="Nombre"
                        size="small"
                        variant="outlined"
                        placeholder="Nombre"
                        onChange={onChangeName}
                    />
                </div>

                <div>
                    <div style={{fontSize:"18px", fontFamily:"Montserrat", marginLeft:"2%", marginTop:"4%", color:"black", marginBottom:"-4%"}}>
                        Lecciones
                    </div>
                    <div style={{marginLeft:"15%"}}>
                        <FaPlusCircle
                            color={'green'}
                            size={'20px'}
                            onClick={() => addLesson(props.id)}
                        />
                    </div>
                    <div>
                        <LessonList lessons={units[props.id].lessons} unit_id={props.id}/>
                    </div>
                </div>
                <div>
                    <div style={{fontSize:"18px", fontFamily:"Montserrat", marginLeft:"2%", marginTop:"4%", color:"black", marginBottom:"-7%"}}>
                        Examen
                    </div>
                    <div style={{marginTop:"10%", marginLeft:"-20%"}}>
                        <Lesson/>
                    </div>

                </div>

            </div>
        )

    const expandLesson = (unitId, index) => {
        const blockNew = {...blockLessonsOpens};
        blockNew[unitId][index] = !blockNew[unitId][index];
        setBlockLessonsOpens(blockNew)
    }

    const LessonList = (props) => (
        <div>
            {props.lessons.map((lesson_i, index) => (
                <div>
                    <div style={{fontSize:"20px", fontFamily:"Montserrat",marginLeft:"7%", color:"black", marginBottom:"12%", marginTop:"3%"}}>
                        {blockLessonsOpens[props.unit_id][index]?<FontAwesomeIcon style={{color: "black", marginLeft: "12%"}}
                                          icon={faChevronUp} onClick={() => expandLesson(props.unit_id, index)}/>:<FontAwesomeIcon style={{color: "black", marginLeft: "12%"}}
                                                                                                                                     icon={faChevronDown} onClick={() => expandLesson(props.unit_id, index)}/>}
                        <div style={{marginTop:"-3%", fontSize:"15px", fontFamily:"Montserrat"}}>
                            {'Lección ' + index.toString() }
                        </div>
                    </div>
                    <div style={{marginTop:"-8%", marginBottom:"4%", marginLeft:"-10%"}}>
                        {(blockLessonsOpens[props.unit_id][index])? <Lesson lesson={lesson_i}/>:""}
                    </div>
                </div>
            ))}
        </div>
    )

    function openModal() {

    }

    function saveChallenge() {

    }

    function onChangeName() {

    }


    function expand(index) {
        const blockOpenNews = [...blockOpens];
        blockOpenNews[index] = !blockOpenNews[index]
        setBlockOpens([...blockOpenNews])
    }

    return (
        <div style={{marginLeft:"2%"}}>
            <div style={{fontSize:"30px", fontFamily:"Montserrat",marginLeft:"1%", color:"black"}}>
                Crear Desafio
            </div>
            <div style={{marginTop:"2%", width:"100%"}}>
                <form>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Grid container spacing={3}>
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
                                    Unidades
                                    <FaPlusCircle
                                        style={{marginLeft:"1%", marginTop:"1%"}}
                                        color={'green'}
                                        size={'25px'}
                                        onClick={addUnit}
                                    />
                                    <hr
                                        style={{
                                            color: "black",
                                            backgroundColor: "black",
                                            marginRight:"-50%"
                                        }}
                                    />
                                    <div style={{marginTop:"5%"}}>
                                        {units.map((lesson_i, index) => (
                                            <div >
                                                <div style={{fontSize:"20px", fontFamily:"Montserrat",marginLeft:"5%", color:"black", marginBottom:"12%"}}>
                                                    <div>
                                                        {blockOpens[index] ? <FontAwesomeIcon
                                                            style={{color: "black", marginLeft: "15%"}}
                                                            icon={faChevronUp} onClick={() => expand(index)}/>: <FontAwesomeIcon
                                                            style={{color: "black", marginLeft: "15%"}}
                                                            icon={faChevronDown} onClick={() => expand(index)}/>}
                                                    </div>
                                                    <div style={{marginTop:"-3%"}}>
                                                        {'Unidad ' + index.toString() }
                                                    </div>
                                                </div>
                                                <div style={{marginTop:"-8%", marginBottom:"7%"}}>
                                                    {blockOpens[index] ? <Unit id={index}/>: ""}
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                </div>

                            </Grid>
                        </Grid>
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


export default ContentManager;


