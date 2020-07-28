import React from 'react';
import { connect } from 'react-redux';
import WordRow from '../components/WordRow/WordRow';
import {setCardData} from '../actionCreators';

export default connect(
    (state, props) => ({
        cards: state.newDeck.cards,
    }),
    (dispatch, props) => ({
        setCardData: (value,index,name)=>dispatch(setCardData(value,index,name))
    })
)(WordRow);