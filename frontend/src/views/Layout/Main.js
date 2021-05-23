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

    /*<Button className="main-layout-settings-btn" onClick={logout}>
        <GearFill />
    </Button>*/

    const { currentUser } = useAuth();

    console.log(10, currentUser);

    return (
        <div className="main-layout-wrapper">
            <Navbar className="navbar" sticky="top">
                <Navbar.Collapse>
                    <Navbar.Brand className="navbar-logo-image" href="/">
                        <Image src={Logo} fluid />
                    </Navbar.Brand>
                    <Form inline>
                        <Form.Control type="text" placeholder="Search" className="main-layout-search" />
                    </Form>
                </Navbar.Collapse>
                <Nav className="mr-auto">
                    {currentUser ?
                        <Nav.Item>
                            <Nav.Link href="/my-account">Моят Профил</Nav.Link>
                        </Nav.Item>
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