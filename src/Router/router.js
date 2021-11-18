import {
  BrowserRouter as Router, Redirect,
  Route
} from "react-router-dom";
import Home from "../Components/Home/home";
import React from "react";
import Login from "../Components/Users/Login/login";
import ContentManager from '../Components/ContentManager/content_manager';
import SideNav, {Toggle, Nav, NavItem, NavIcon, NavText} from '@trendmicro/react-sidenav';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import UnitScreen from "../Units/UnitScreen";
import LessonScreen from "../Lessons/LessonScreen";

const RouterCustom = () => {
  return (
    <div style={{width: '90%'}}>
      <Router>
        <Route render={({location, history}) => (
          <React.Fragment>
            <SideNav
              style={{background: "#203F58", width: "3%", height: '100%'}}
              onSelect={(selected) => {
                const logged_storage = localStorage.getItem('logged');
                if (logged_storage === "true") {
                  console.log(location);
                  const to = '/' + selected;
                  if (location.pathname !== to) {
                    console.log(to);
                    console.log(location.pathname);
                    history.push(to);
                  }
                } else {
                  history.push('/login')
                }
              }}
            >
              <SideNav.Toggle/>
              <SideNav.Nav defaultSelected="">
                <NavItem eventKey="">
                  <NavIcon>
                    <i className="fa fa-fw fa-home" style={{fontSize: '1.75em', color: '#CEEDE8'}}/>
                  </NavIcon>
                  <NavText style={{color: 'white'}}>
                    Inicio
                  </NavText>
                </NavItem>
                <NavItem eventKey="content">
                  <NavIcon>
                    <i className="fa fa-pencil" style={{fontSize: '1.75em', color: '#CEEDE8'}}/>
                  </NavIcon>
                  <NavText style={{color: 'white'}}>
                    Contenido
                  </NavText>
                </NavItem>
              </SideNav.Nav>
            </SideNav>
            <main style={{paddingLeft: "5%", width: '100%'}}>
              <Route exact path="/" component={Home}/>
              <Route exact path="/login" component={Login}/>
              <Route exact path="/content" component={ContentManager}/>
              <Route exact path="/units" component={UnitScreen}/>
              <Route exact path="/lessons" component={LessonScreen}/>
            </main>
          </React.Fragment>
        )}
        />
      </Router>
    </div>
  );
}

export default RouterCustom;

