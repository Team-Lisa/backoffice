import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box';
import { Redirect, useHistory } from 'react-router-dom';
import logo from "../../../assets/logo.png";

const Login = () => {
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState(false);
    const history = useHistory();
    const handleClick = () => history.push('/');

    const logged_storage = localStorage.getItem('logged');
    if(logged_storage === "true"){
        return(
            <Redirect  to="/content"/>
        )
    }

    const classes = makeStyles((theme) => ({
        container: {
            padding: theme.spacing(3),
            paddingTop: "%50",
        },
        block_container: {
            display: "flex",
            justifyContent: "center"
        }
    }))

    const loginSubmit = () => {
        console.log("email: ", email);
        console.log("password: ", password);
        if(email==="admin" && email===password){
            localStorage.setItem("logged", "true")
            setError(false);
            handleClick();
        }else{
            setError(true)
        }

    }

    const onChangeEmail = (event) => {
        console.log(event.target.value);
        setEmail(event.target.value);
    }

    const onChangePassword = (event) => {
        console.log(event.target.value);
        setPassword(event.target.value);
    }


    return (
        <div  style={{position: "fixed",
            width: "100%",
            height: "100%",
            left: "0",
            top: "0",
            background: "#e3e3e3",
            zIndex: "10"}}>
            <div style={{
                position: 'absolute', left: '50%', top: '50%',
                transform: 'translate(-50%, -50%)',}}>
                <Box borderRadius="borderRadius" {...{bgcolor: 'background.paper',
                    borderColor: 'text.secondary',
                    m: 1,
                    border: 0,
                    style: { width: '25rem', height: '25rem' },}}>
                    <div>
                        <div style = {{display:"flex", justifyContent:"center", marginBottom: "10%", paddingTop:"10%"}}>
                        </div>
                        <div style = {{width:"50%", marginTop:"-10%", marginLeft:"25%", marginBottom:"10%"}}><img style={{  width:"100%" , height:"100%", display: "inline"}} src={logo} alt="Logo" /></div>
                        <div style={{paddingTop:"4%"}}>
                            <Container className={classes.container} maxWidth="xs">
                                <form>
                                    <Grid container spacing={3}>
                                        <Grid item xs={12}>
                                            <Grid container spacing={2}>
                                                <Grid item xs={12}>
                                                    <TextField fullWidth
                                                               label="Email"
                                                               name="email"
                                                               size="small"
                                                               variant="outlined"
                                                               placeholder="Email"
                                                               onChange={onChangeEmail}
                                                    />
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <TextField
                                                        fullWidth
                                                        label="Password"
                                                        name="password"
                                                        size="small"
                                                        type="password"
                                                        variant="outlined"
                                                        placeholder="Password"
                                                        onChange={onChangePassword}
                                                    />
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        {error? <div style={{color: "red", marginLeft:"4%", fontSize:"15px", fontFamily:"Montserrat"}}>El usuario o contraseña es incorrecto.</div>: <div/>}
                                        <Grid item xs={12}>
                                            <Button style={{background:"#4682B4", color:"white"}} onClick={loginSubmit} fullWidth  variant="contained" >
                                                Login
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </form>
                            </Container>

                        </div>
                    </div>
                </Box>
            </div>
        </div>)
}

export default Login;
