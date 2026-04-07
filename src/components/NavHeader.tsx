'use client'

import { Container, Nav, Navbar } from 'react-bootstrap';
import EmailIcon from '@mui/icons-material/Email';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';

export function NavHeader () {
    return (
        <>
            <Navbar expand='lg' className='bg-body-tertiary'>
                <Container>
                    <Navbar.Brand href='#home'>Gabriel de Melo Ferreira</Navbar.Brand>
                    <Navbar.Toggle aria-controls='basic-navbar-nav' />
                    <Navbar.Collapse id='basic-navbar-nav'>
                        <Nav className='me-auto'>
                            <Nav.Link href='#home'>Home</Nav.Link>
                            <Nav.Link href='#About'>About</Nav.Link>
                            <Nav.Link href='#About'>Experience</Nav.Link>
                            <Nav.Link href='#About'>Projects</Nav.Link>
                        </Nav>
                        <Nav className='ml-auto'>
                            <Nav.Link href='https://github.com/GabrielMeloFerreira'>
                                <LinkedInIcon></LinkedInIcon>
                            </Nav.Link>
                            <Nav.Link href='https://www.linkedin.com/in/gabriel-melo-dev'>
                                <GitHubIcon></GitHubIcon>
                            </Nav.Link>
                            <Nav.Link href='mailto:melogabrielbiel@gmail.com'>
                                <EmailIcon></EmailIcon>
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}