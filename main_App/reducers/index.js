import { combineReducers } from 'redux';
import { createReducer } from 'redux-create-reducer';
import * as actionTypes from '../actionTypes';
import Page from '../constants/Page';
import newDeck from '../constants/newDeck';
import {loadDeck, setFilter} from "../functionForReducers/decksReducer"
import {increaseCountRow, stateSize} from "../functionForReducers/newDeckReducer"
import Status from "../constants/Status";

const countDeckReducer=createReducer(0,{[actionTypes.SET_COUNT_USERDECK]:(state,action)=>++action.count});

const gameSettingsReducer=createReducer('',{[actionTypes.SET_USER_OR_STANDARD_GAME]:(state,action)=>action.value});

const cardFlipStateReducer=createReducer(null,{[actionTypes.SET_CARD_FLIP_STATE]:(state,action)=>action.value});
const deckStatisticsReducer=createReducer(0,{[actionTypes.SET_DECK_STATISTICS]:(state,action)=>action.value});

const authorizationReducer=createReducer(false,{[actionTypes.SET_AUTHORIZATION_STATE]:(state,action)=>action.value});

const userInformationReducer = createReducer({},{[actionTypes.SET_USER_INFORMATION]:(state,action)=>action.value});

const pageReducer=createReducer(Page.description,{[actionTypes.NAVIGATE_TO_PAGE]:(state,action)=>action.page});


const cardInGameReducer=createReducer(0,{[actionTypes.SET_CARD_IN_GAME]:(state,action)=>action.value});

const newOrUpdateReducer=createReducer('',{[actionTypes.SET_NEW_OR_UPDATE]:(state,action)=>action.value});

const filterStateReducer=createReducer(false,{[actionTypes.SET_FILTER_STATE]:(state,action)=>action.value});

const progressGameReducer=createReducer(0,{[actionTypes.SET_PROGRESS]:(state,action)=>action.value});

const UserDeckSettingsReducer=createReducer([], {[actionTypes.SET_DECK_USER_LENGTH]:(state,action)=>{return new Array(action.value).fill(true);},
    [actionTypes.SHOW_OPTIONS_USER_DECKS]:(state,action)=>{
        return state.map((el,index)=>{return index === (action.id-1) ? action.state :el})}});

const StandardDeckSettingsReducer=createReducer([], {[actionTypes.SET_DECK_STANDARD_LENGTH]:(state,action)=>{return new Array(action.value).fill(true);},
    [actionTypes.SHOW_OPTIONS_STANDARD_DECKS]:(state,action)=>{
    return state.map((el,index)=>{return index === (action.id-1) ? action.state :el})}});

const deckSettingHintReducer=createReducer(true,{[actionTypes.SHOW_HINT]:(state,action)=>action.value});

const gameButtonReducer=createReducer(false,{[actionTypes.SHOW_GAME_BUTTON]:(state,action)=>action.value});

const gameReducer = createReducer({status:''},{
    [actionTypes.LOAD_GAME_REQUEST]:(state,action)=>({...state,status:Status.loading}),
[actionTypes.LOAD_GAME_SUCCESS]:(state,action)=>{
    const card=action.deck.cards.sort((a, b) => a.rating - b.rating).map(e => ({...e,answerState: null}));
    return {...action.deck, cards:card, status:Status.loaded}},
[actionTypes.CHANGE_CARD_ANSWER_STATE]:(state,action)=>({...state, cards:action.deck})
});

const StandardDecksReducer=createReducer({decksById:{},status:''},
    {[actionTypes.LOAD_STANDARD_DECKS_SUCCESS]:loadDeck,
[actionTypes.LOAD_STANDARD_DECKS_REQUEST]:(state,action)=>({...state, status:Status.loading})});

const UserDecksReducer=createReducer({decksById:{},status:''},{[actionTypes.LOAD_USER_DECKS_SUCCESS]:loadDeck,
    [actionTypes.LOAD_USER_DECKS_REQUEST]: (state,action)=>({...state, status:Status.loading}),
[actionTypes.SET_FILTER]: setFilter});

const newDeckReducer=createReducer({...newDeck,status:''}, {[actionTypes.SET_COUNT_ROW]:stateSize,
    [actionTypes.INCREASE_COUNT_ROW]: increaseCountRow,[actionTypes.LOAD_DECK_REQUEST]:(state,action)=>({...state, status:Status.loading}),
    [actionTypes.LOAD_DECK_SUCCESS]:(state,action)=>({...action.deck,status:Status.loaded}),
    [actionTypes.CREATE_NEW_DECK]:(state,action)=>({...newDeck,status:Status.new}),
     [actionTypes.SET_CARD_DATA]: (state,action)=>({...state, cards: state.cards.map((el,index)=>{
         return index===action.index ? {...el,[action.name]:action.value} : el;
         }) })});

export const rootReducer = combineReducers({
    page: pageReducer,
    UserDeckSettings:UserDeckSettingsReducer,
    StandardDecksSettings:StandardDeckSettingsReducer,
    deckHint:deckSettingHintReducer,
    StandardDecks:StandardDecksReducer,
    UserDecks:UserDecksReducer,
    newDeck:newDeckReducer,
    gameButton:gameButtonReducer,
    game:gameReducer,
    countDeck:countDeckReducer,
    cardInGame:cardInGameReducer,
    progressGame:progressGameReducer,
    filterState:filterStateReducer,
    newOrUpdate: newOrUpdateReducer,
    authorization: authorizationReducer,
    userInformation: userInformationReducer,
    cardFlipState:cardFlipStateReducer,
    deckStatistics:deckStatisticsReducer,
    gameSettings:gameSettingsReducer
});