import React, { useState, useEffect } from 'react';
import {Redirect} from "react-router-dom";

const Home = () => {

    const logged_storage = localStorage.getItem('logged');
    if(logged_storage !== "true"){
        return(<Redirect  to="/login"/>)
    }
    return (<div>home</div>)
}


export default Home;
