import PropTypes from "prop-types";
import React, {useRef, useEffect, useState} from "react";
import Page from '../../constants/Page';
import '../../components/Navigation/style.css';
import changeLight from "../../helpers/changeBackLight";
export default function Filter({setFilter, onNavigateToPage,setFilterState,filterState}){
    const newFilter=e=>{
        onNavigateToPage(Page.userDecks);
        changeLight('forFilter');
        setFilter(e.target.value)
    };

    const changeFilterState = (e) => {
        setFilter('');
        setFilterState(!filterState);
    };
    const changeFilterStateOnBlur = (e) => {
        setFilterState(!filterState);
    };


    return (
        filterState ? (
            <div className="filter" onBlur={changeFilterStateOnBlur}>
                <input placeholder="Поиск по колодам" onChange={newFilter} type='text' className="filter-input"/>
            </div>
        ) : (
            <div className="filter-button" onClick={changeFilterState}>
                <span className="icon-search">🔍</span>
                <span>Поиск колод</span>
            </div>
        )
    )
}

Filter.propTypes = {
    setFilter: PropTypes.func.isRequired,
    onNavigateToPage: PropTypes.func.isRequired,
    setFilterState: PropTypes.func.isRequired,
    filterState: PropTypes.bool.isRequired
};
