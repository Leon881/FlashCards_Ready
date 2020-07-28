import * as actionTypes from '../actionTypes';

export const navigateTo = page => ({
    type: actionTypes.NAVIGATE_TO_PAGE,
    page
});

export const loadStandardDecks = decks => ({
    type: actionTypes.LOAD_STANDARD_DECKS_SUCCESS,
    decks
});

export const loadUserDecks = decks => ({
    type: actionTypes.LOAD_USER_DECKS_SUCCESS,
    decks
});

export const requestStandardDecks = () => ({
    type: actionTypes.LOAD_STANDARD_DECKS_REQUEST,
});

export const requestUserDecks = () => ({
    type: actionTypes.LOAD_USER_DECKS_REQUEST,
});

export const setCountRow=value=>({
    type: actionTypes.SET_COUNT_ROW,
    value
});

export const increaseCountRow=()=>({
    type: actionTypes.INCREASE_COUNT_ROW,
});

export const setFilter=(value)=>({
    type:actionTypes.SET_FILTER,
    value
});

export const showOptionsUsersDeck= (id,state) => ({
    type:actionTypes.SHOW_OPTIONS_USER_DECKS,
    id, state
});
export const showOptionsStandardDeck= (id,state) => ({
    type:actionTypes.SHOW_OPTIONS_STANDARD_DECKS,
    id, state
});

export const showHint= (value) => ({
    type:actionTypes.SHOW_HINT,
    value
});

export const showGameButton= (value) => ({
    type:actionTypes.SHOW_GAME_BUTTON,
    value
});

export const requestGame = () => ({
    type: actionTypes.LOAD_GAME_REQUEST,
});

export const loadGame = deck => ({
    type: actionTypes.LOAD_GAME_SUCCESS,
    deck
});

export const requestDeck = () => ({
    type: actionTypes.LOAD_DECK_REQUEST,
});

export const loadDeck = deck => ({
    type: actionTypes.LOAD_DECK_SUCCESS,
    deck
});

export const createDeck = () => ({
    type: actionTypes.CREATE_NEW_DECK,
});

export const setCount = count => ({
    type: actionTypes.SET_COUNT_USERDECK,
    count
});

export const changeCardAnswerState = deck => ({
    type: actionTypes.CHANGE_CARD_ANSWER_STATE,
    deck
});

export const setCardInGame=value=>({
    type: actionTypes.SET_CARD_IN_GAME,
    value
});

export const setProgress=value=>({
    type: actionTypes.SET_PROGRESS,
    value
});

export const setDeckUserLength=value=>({
    type: actionTypes.SET_DECK_USER_LENGTH,
    value
});

export const setDeckStandardLength=value=>({
    type: actionTypes.SET_DECK_STANDARD_LENGTH,
    value
});

export const setFilterState=value=>({
    type: actionTypes.SET_FILTER_STATE,
    value
});

export const setCardData=(value,index,name)=>({
    type: actionTypes.SET_CARD_DATA,
    value, index, name
});

export const setNewOrUpdate=value=>({
   type:actionTypes.SET_NEW_OR_UPDATE,
   value
});

export const setAuthorization=value=>({
    type:actionTypes.SET_AUTHORIZATION_STATE,
    value
});

export const setUserInformation=value=>({
    type:actionTypes.SET_USER_INFORMATION,
    value
});

export const setCardFlipState=value=>({
    type:actionTypes.SET_CARD_FLIP_STATE,
    value
});

export const setDeckStatistics=value=>({
    type:actionTypes.SET_DECK_STATISTICS,
    value
});

export const setGameSettings=value=>({
    type:actionTypes.SET_USER_OR_STANDARD_GAME,
    value
});