import React from 'react';
import { connect } from 'react-redux';
import Navigation from '../components/Navigation/Navigation';
import {navigateTo, setNewOrUpdate} from '../actionCreators';

export default connect(
    (state, props) => ({
        gameButton:state.gameButton,
        status: state.newDeck.status,
        authorization: state.authorization

    }),
    (dispatch, props) => ({
        onNavigate: value => dispatch(navigateTo(value)),
        setNewOrUpdate: value=>dispatch(setNewOrUpdate(value))
    })
)(Navigation);