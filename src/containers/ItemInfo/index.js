import React from 'react';
import { connect } from 'react-redux';
import { Container, Icon } from 'semantic-ui-react';
import Header from '../Header';
import { Link } from 'react-router-dom';
import Sidebar from '../Sidebar';

const mapStateToProps = (store, ownProps) => ({
    item: store.items.find(item => item.id === parseInt(ownProps.match.params.itemId, 10)),
});


const ItemInfo = ({ item }) => (
    <Sidebar>
        <Container>
            <Header />
            <div className="item-info">
                <Link to="/"><Icon name="arrow left" />Home</Link>
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
    </Sidebar>
);
export default connect(mapStateToProps)(ItemInfo);