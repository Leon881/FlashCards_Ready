import PropTypes from "prop-types";
import React, { useEffect } from "react";
import Page from '../../constants/Page';
import './style.css';
import '../../components/Navigation/style.css';
import changeLight from "../../helpers/changeBackLight";
import testDeck from "../../constants/testDeck";

export default function Deck(props){
    const {deck, deckId, page, flipState, hintState,changeHintState,changeFlipStandardDeck,setNewOrUpdate,setGameSettings,
        firstIndication, showGameButton, onNavigateToPage, loadGame,requestGame, loadDeck,requestDeck,changeFlipUserDeck}=props;
    const hintOnEnter =()=>{
      if(hintState)
          changeHintState(false);
      };

    const startGame =async ()=>{
        let deck;
        showGameButton(true);
        requestGame();
        onNavigateToPage(Page.game);
        if (page===Page.userDecks) {
            deck = await (await fetch(`/userdeck?deckid=${deckId}`)).json();
            setGameSettings('user');
            changeFlipUserDeck(deckId,!flipState[deckId-1]);
        }
        else {
            deck=await (await fetch(`/basicdeck?deckid=${deckId}`)).json();
            setGameSettings('standard');
            changeFlipStandardDeck(deckId,!flipState[deckId-1]);
        }
        changeLight('game');
        loadGame(deck);
    };

    const updateDeck=async (e)=>{
        e.stopPropagation();
        requestDeck();
        onNavigateToPage(Page.newDeck);
        changeLight('updateDeck');
        setNewOrUpdate('updateDeck');
        const deck=await (await fetch(`/userdeck?deckid=${deckId}`)).json();
        loadDeck(deck);
    };

    const flipOnClickOrLeave = (event) => {
        if (event.relatedTarget !== null && flipState[deckId-1]) return;
        if(page === Page.userDecks)
            changeFlipUserDeck(deckId,!flipState[deckId-1]);
        else  changeFlipStandardDeck(deckId,!flipState[deckId-1]);
    };
    return (
        <div id='deck' onMouseEnter={hintOnEnter} onMouseLeave={flipOnClickOrLeave} onClick = {flipOnClickOrLeave}>
            <div className={`card-side deck-front ${flipState[deckId-1] ? 'side-shown' : 'side-hidden'}`}>
                {page===Page.userDecks ?<div onClick={updateDeck} className='deck-settings'>
                    <img src="../../src/img/settingsButton.png"/>
                </div>: undefined}
                {page === Page.userDecks ?<p id='progress'>{deck.progress}%</p> : undefined}
                <div className="deck-info">
                    <span className='inf'>{deck.title}</span>
                    <span className='inf'>({deck.size} шт.)</span>
                </div>
            </div>
            <div className={`card-side deck-back ${!flipState[deckId-1] ? 'side-shown' : 'side-hidden'}`}>
                <p> Выберите режим:</p>
                {
                    <ul className="options">
                        <li onClick={startGame}>Знаю/Не знаю</li>
                        <li>Будет добавлено позже</li>
                    </ul>
                }
            </div>
            {firstIndication ?(hintState ?<div className="hint">
                <img src="../../src/img/finger.png"/>
            </div>: undefined): undefined}
        </div>
    )
}


Deck.propTypes={
    deck: PropTypes.object.isRequired,
    deckId: PropTypes.number.isRequired,
    hintState: PropTypes.bool.isRequired,
    page: PropTypes.string.isRequired,
    flipState: PropTypes.array.isRequired,
    changeHintState: PropTypes.func.isRequired,
    firstIndication: PropTypes.bool.isRequired,
    showGameButton:PropTypes.func.isRequired,
    onNavigateToPage: PropTypes.func.isRequired,
    requestGame:PropTypes.func.isRequired,
    loadGame:PropTypes.func.isRequired,
    loadDeck:PropTypes.func.isRequired,
    requestDeck:PropTypes.func.isRequired,
    changeFlipStandardDeck: PropTypes.func.isRequired,
    changeFlipUserDeck: PropTypes.func.isRequired,
    setCardData: PropTypes.func.isRequired,
    setNewOrUpdate:PropTypes.func.isRequired,
    setGameSettings: PropTypes.func.isRequired
};