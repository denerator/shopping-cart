import React from 'react';
import { Segment, Dimmer, Loader } from 'semantic-ui-react';
const Callback = () => {
    return (
        <Segment className="preloader">
            <Dimmer active inverted >
                <Loader>Loading</Loader>
            </Dimmer>
        </Segment>
    );
};

export default Callback;