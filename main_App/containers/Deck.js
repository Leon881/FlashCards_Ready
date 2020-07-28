import React from 'react';
import { connect } from 'react-redux';
import Deck from '../components/Deck/Deck';
import Page from "../constants/Page";
import {
    showHint, showGameButton, navigateTo, loadGame, requestGame, loadDeck, requestDeck,
    showOptionsStandardDeck, showOptionsUsersDeck,setNewOrUpdate, setGameSettings} from '../actionCreators';

export default connect(
    (state, props) => ({
       deck: chooseDecks(state,props),
        flipState:chooseSettings(state),
        hintState:state.deckHint,
    }),
    (dispatch, props) => ({
        changeFlipUserDeck: (id,state) => dispatch(showOptionsUsersDeck(id,state)),
        changeFlipStandardDeck: (id,state) => dispatch(showOptionsStandardDeck(id,state)),
        changeHintState: (value)=>dispatch(showHint(value)),
        showGameButton:value=>dispatch(showGameButton(value)),
        onNavigateToPage: value => dispatch(navigateTo(value)),
        loadGame:value=>dispatch(loadGame(value)),
        requestGame:()=>dispatch(requestGame()),
        requestDeck:()=>dispatch(requestDeck()),
        loadDeck:(value)=>dispatch(loadDeck(value)),
        setNewOrUpdate: value=>dispatch(setNewOrUpdate(value)),
        setGameSettings: value=>dispatch(setGameSettings(value))
    })
)(Deck);

function chooseDecks(state,props){
    if(state.page===Page.standardDecks){
        return state.StandardDecks.decksById[props.deckId]
    }
    return state.UserDecks.filterById[props.deckId] || state.UserDecks.decksById[props.deckId]
}

function chooseSettings(state) {
    if (state.page===Page.standardDecks) {
        return state.StandardDecksSettings;
    }
    return state.UserDeckSettings
}