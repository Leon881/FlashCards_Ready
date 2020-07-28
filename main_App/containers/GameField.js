import { connect } from 'react-redux';
import React from 'react';
import GameField from '../components/GameField/GameField';
import {
    setCardInGame,
    setCardFlipState,
    setProgress,
    setDeckStatistics,
    changeCardAnswerState,
    requestUserDecks, navigateTo, loadUserDecks, setCount, setDeckUserLength
} from '../actionCreators';

export default connect(
    (state, props) => ({
        status:state.game.status,
        cardInGame:state.cardInGame,
        progress: state.progressGame,
        deck:state.game.cards,
        cardFlipState: state.cardFlipState,
        deckStatistics: state.deckStatistics,
        deckInf : state.game.deck,
        gameSettings: state.gameSettings
    }),
    (dispatch, props) => ({
        setCardInGame:value=>dispatch(setCardInGame(value)),
        setProgress:value=>dispatch(setProgress(value)),
        setCardFlipState: value=>dispatch(setCardFlipState(value)),
        setDeckStatistics: value =>dispatch(setDeckStatistics(value)),
        changeCardAnswerState: deck=>dispatch(changeCardAnswerState(deck)),
        requestUserDecks:()=>dispatch(requestUserDecks()),
        onNavigateToPage: value => dispatch(navigateTo(value)),
        loadUserDecks: (decks)=>dispatch(loadUserDecks(decks)),
        setCountDeck: (count)=>dispatch(setCount(count)),
        setDeckUserLength: (value)=>dispatch(setDeckUserLength(value))
    })
)(GameField);