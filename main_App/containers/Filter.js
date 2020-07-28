import { connect } from 'react-redux';
import React from 'react';
import Filter from '../components/Filter/Filter';
import {navigateTo, setFilter, setFilterState} from '../actionCreators';

export default connect(
    (state, props) => ({
        filterState: state.filterState
    }),
    (dispatch, props) => ({
        setFilter: (value)=>dispatch(setFilter(value)),
        onNavigateToPage: value => dispatch(navigateTo(value)),
        setFilterState:(value)=>dispatch(setFilterState(value))
    })
)(Filter);