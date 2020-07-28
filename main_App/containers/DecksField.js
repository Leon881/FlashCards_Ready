import React from 'react';
import { connect } from 'react-redux';
import DecksField from '../components/DecksField/DecksField';
import {setDeckLength} from "../actionCreators";

export default connect(
    (state, props) => ({
        decksIds: chooseDecks(state,true),
        page:state.page,
        status:chooseDecks(state,false)
    }),
    (dispatch, props) => ({
    })
)(DecksField);

function chooseDecks(state,status){
    if(state.page==="standardDecks"){
        return status ? state.StandardDecks.decksIds: state.StandardDecks.status;
    }
    return status ? state.UserDecks.filterIds || state.UserDecks.decksIds : state.UserDecks.status
}