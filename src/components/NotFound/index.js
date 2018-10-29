import React from 'react';
import Header from '../../containers/Header';
import { Container } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const NotFound = () => (
    <Container>
        <Header />
        <Container textAlign="center">
            <h1>
                404 - Page Not Found
            </h1>
            <h3><Link to='/' >Go back to the main page</Link></h3>
        </Container>
    </Container>

)

export default NotFound;