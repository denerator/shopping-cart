import React from 'react';
import { connect } from 'react-redux';
import { Container, Icon } from 'semantic-ui-react';
import Header from '../Header';

const mapStateToProps = (store, ownProps) => ({
    item: store.items.find(item => item.id === parseInt(ownProps.match.params.itemId, 10)),
});


const ItemInfo = ({ item }) => (
    <Container>
        <Header />
        <div>
            <h2>
                Name : 
                {item.text}
            </h2>
            <h4>
                Category:
                {item.category}
            </h4>
            <h3>
                Price: {item.price}<Icon name="dollar" />
            </h3>
        </div>
    </Container>
);
export default connect(mapStateToProps)(ItemInfo);