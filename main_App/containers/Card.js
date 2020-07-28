import React from 'react';
import { connect } from 'react-redux';
import Card from '../components/Card/Card';
import {navigateTo, setCardDeck, setProgress} from '../actionCreators';

export default connect(
    (state, props) => ({
    }),
    (dispatch, props) => ({
    })
)(Card);