import React from 'react';
import { connect } from 'react-redux';
import NewDeckForm from '../components/newDeckForm/newDeckForm';
import {setCountRow, increaseCountRow, navigateTo, requestUserDecks, loadUserDecks, setCount, setDeckUserLength} from '../actionCreators';

export default connect(
    (state, props) => ({
        newDeck: state.newDeck,
        status:state.newDeck.status,
        deckId: state.countDeck,
        newOrUpdate: state.newOrUpdate,
        userId : state.userInformation.userId
    }),
    (dispatch, props) => ({
        increaseCountRow: () => dispatch(increaseCountRow()),
        setCountRow: (value)=> dispatch(setCountRow(value)),
        onNavigateToPage: value => dispatch(navigateTo(value)),
        requestUserDecks:()=>dispatch(requestUserDecks()),
        loadUserDecks: (decks)=>dispatch(loadUserDecks(decks)),
        setCountDeck: (count)=>dispatch(setCount(count)),
        setDeckUserLength: (value)=>dispatch(setDeckUserLength(value))
    })
)(NewDeckForm);