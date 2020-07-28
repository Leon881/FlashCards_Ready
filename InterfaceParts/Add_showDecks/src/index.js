import React, {useState, useRef, useEffect} from "react";
import ReactDOM from "react-dom";
import PropTypes from 'prop-types';
import './index.css';
import {decksArr} from "../TestComponent";

function App(){
    const decks=[];
    for(let deck of decksArr){
        decks.push(<Deck key={deck.DeckId} title={deck.title} progress={deck.progress} size={deck.size}></Deck>)
    }
    return (
        <div id='form'>
        {decks}
        </div>
    )
}

function Deck(props){
    const [state,SetState]=useState(true);
    const {title,size,progress}=props;
    const changeState= ()=>{
    SetState(!state);
    };
    return (
        <div id='deck' onMouseEnter={changeState} onMouseLeave={changeState}>
            {state ?<div>
            <p id='progress'>{progress}%</p>
            <div id='bottom'>
                <span className='inf'>{title}</span>
                <span className='inf'>{size}</span>
            </div>
            </div> :<div id='options'> <button className='option'>Знаю/не знаю</button>
                <button className='option'>Выбор варианта</button>
            </div>}
        </div>
    )

}

Deck.propTypes={
    title: PropTypes.string,
    progress: PropTypes.string,
    size: PropTypes.number
};
ReactDOM.render(<App />, document.getElementById("app"));