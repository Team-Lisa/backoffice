import {
    BrowserRouter as Router, Redirect,
    Route
} from "react-router-dom";
import Home from "../Components/Home/home";
import React from "react";
import Login from "../Components/Users/Login/login";
import ContentManager from '../Components/ContentManager/content_manager';
import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';

const RouterCustom = () =>{
    return (
        <div>
        <Router>
            <Route render={({ location, history }) => (
                <React.Fragment>
                    <SideNav
                        style={{background: "#4682B4", width:"3%"}}
                        onSelect={(selected) => {
                            const logged_storage = localStorage.getItem('logged');
                            if(logged_storage === "true"){
                                console.log(location);
                                const to = '/' + selected;
                                if (location.pathname !== to) {
                                    console.log(to);
                                    console.log(location.pathname);
                                    history.push(to);
                                }
                            }else{
                                history.push('/login')
                            }
                        }}
                    >
                        <SideNav.Toggle />
                        <SideNav.Nav defaultSelected="">
                            <NavItem eventKey="">
                                <NavIcon>
                                    <i className="fa fa-fw fa-home" style={{ fontSize: '1.75em' }} />
                                </NavIcon>
                                <NavText>
                                    Inicio
                                </NavText>
                            </NavItem>
                            <NavItem eventKey="content">
                                <NavIcon>
                                    <i className="fa fa-pencil" style={{ fontSize: '1.75em' }} />
                                </NavIcon>
                                <NavText>
                                    Contenido
                                </NavText>
                            </NavItem>
                        </SideNav.Nav>
                    </SideNav>
                    <main style={{marginLeft:"5%", marginTop:"2%"}}>
                        <Route exact path="/" component={Home} />
                        <Route exact path="/login" component={Login} />
                        <Route exact path="/content" component={ContentManager} />
                    </main>
                </React.Fragment>
            )}
            />
        </Router>
        </div>
    );
}

export default RouterCustom;

