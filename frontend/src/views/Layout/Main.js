import React, { useState } from 'react';
import { useHistory } from 'react-router';

//import { logout } from '../../utils/authFunctions';
import Logo from '../../assets/logo.png';
import { useAuth } from '../../contexts/AuthContext';

import { Navbar, Form, Nav, Image } from 'react-bootstrap';

import "./Main.scss";

const Main = ({
    children,
}) => {

    let history = useHistory();

    /*<Button className="main-layout-settings-btn" onClick={logout}>
        <GearFill />
    </Button>*/

    const { currentUser } = useAuth();

    const newCookies = document.cookie.split(';');

    let result = {};
    newCookies.map((x) => {
        if(x) {
            const data = x.split('=');
            result[data[0].trim()] = data[1].trim();
        }
    }, {})

    return (
        <div className="main-layout-wrapper">
            <Navbar className="navbar" sticky="top">
                <Navbar.Collapse>
                    <Navbar.Brand className="navbar-logo-image" href="/">
                        <Image src={Logo} fluid />
                    </Navbar.Brand>
                    <Form inline onSubmit={(e) => {
                        e.preventDefault()
                        history.push(`/search/${e.target.lastChild.value}`);
                    }}>
                        <Form.Control type="text" placeholder="Search" className="main-layout-search" />
                    </Form>
                </Navbar.Collapse>
                <Nav className="mr-auto">
                    {result._id ?
                        <div className="profile">
                        <Nav.Item>
                            <Nav.Link href="/my-account">Моят Профил</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link onClick={() => {document.cookie.split(";").forEach(function(c) { document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); }); history.push("/authorization");}}>Изход</Nav.Link>
                        </Nav.Item>
                        </div>
                        :
                        <Nav.Item>
                            <Nav.Link href="/authorization">Вход</Nav.Link>
                        </Nav.Item>
                    }
                </Nav>
            </Navbar>

            {children}
        </div>
    )
}

export default Main;