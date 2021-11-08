import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import {useHistory, useLocation} from 'react-router-dom';

const Menu = (props) => {
    const location = useLocation();
    const history = useHistory();

    return (
        <SideNav
            onSelect={selected => {

                console.log(location);
                const to = '/' + selected;
                console.log(props)
                if (location.pathname !== to) {
                    console.log(to);
                    console.log(location.pathname);
                    history.push(to);
                }
            }}
            style={{background: "#4682B4"}}
        >
            <SideNav.Toggle />
            <SideNav.Nav defaultSelected="">
                <NavItem eventKey="">
                    <NavIcon style={{color: "white" }}>
                        <i className="fa fa-home" style={{ fontSize: "1.75em"}} />
                    </NavIcon>
                    <NavText>Inicio</NavText>
                </NavItem>
                <NavItem eventKey="content">
                    <NavIcon>
                        <i
                            className="fa fa-pencil"
                            style={{ fontSize: "1.75em", color: "white" }}
                        />
                    </NavIcon>
                    <NavText>Contenido</NavText>
                </NavItem>
            </SideNav.Nav>
        </SideNav>
    );
}

export default Menu;


//<NavItem eventKey="content">
//                         <NavText>Line Chart</NavText>
//                     </NavItem>
//                     <NavItem eventKey="content">
//                         <NavText>Bar Chart</NavText>
//                     </NavItem>
