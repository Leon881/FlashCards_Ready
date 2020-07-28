import React from 'react';
import PropTypes from 'prop-types';
import './style.css';
import Page from '../../constants/Page';
import Status from "../../constants/Status";

export default function Navigation({onNavigate, gameButton,status, setNewOrUpdate, authorization}){
    const changeBacklight=(event)=>{
        if (event.target.id===Page.newDeck)
            setNewOrUpdate('new');
        let currentActive = document.querySelector('a.active');
        currentActive.classList.toggle('active');
        currentActive = event.target;
        currentActive.classList.toggle('active');
        return true;
    };
    return (
        <nav>
            <ul className='menu flex-block container-info'  onClick={event => onNavigate && event.target.tagName==="A" &&
                changeBacklight(event) && onNavigate(event.target.id)}>
                <li><a id={Page.description} className="active">Методика</a></li>
                <li><a id={Page.standardDecks} className="standard" >Колоды</a></li>
                {authorization &&<li><a id={Page.userDecks} className="forFilter" >Мои колоды</a></li>}
                {authorization &&<li><a id={Page.newDeck} className='updateDeck' >{status===Status.loading || status===Status.loaded ? 'Изменение колоды':'Новая колода'}</a></li>}
                {gameButton ? <li><a id={Page.game} className="game" >Изучение</a></li>: undefined}
            </ul>
        </nav>

    )
}

Navigation.propTypes = {
    onNavigate: PropTypes.func.isRequired,
    gameButton: PropTypes.bool.isRequired,
    status:PropTypes.string.isRequired,
    setNewOrUpdate:PropTypes.func.isRequired,
    authorization: PropTypes.func.bool
};