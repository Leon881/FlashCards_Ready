import React, {useState, useRef, useEffect} from "react";
import PropTypes from 'prop-types';
import './style.css';
import Status from "../../constants/Status";
import Loader from "../../components/Loader/Loader";
import Card from "../../containers/Card";
import Page from "../../constants/Page";
import changeLight from "../../helpers/changeBackLight";

export default function GameField(props) {
    const {status,setCardInGame,cardInGame, progress,deck,setProgress, setCardFlipState, cardFlipState,
        changeCardAnswerState, deckStatistics, setDeckStatistics, deckInf, requestUserDecks,onNavigateToPage,
        loadUserDecks,setCountDeck,setDeckUserLength,gameSettings} = props;
    if (status===Status.loading) return (<Loader/>);
    useEffect(()=>{
        return ()=> setProgress(0);
    },[]);
    const deckLength = deck.length;

    const flipCard = (event) => {
        setCardFlipState(!cardFlipState);
    };

    const changeDeckStatistics = (answerValue) => {
        let statisticValue;
        if (answerValue === 'Знаю') {
            statisticValue = Math.min(Math.ceil(deckStatistics + 1 / deckLength * 100), 100);
            setDeckStatistics(statisticValue);
        }
    };

    const changeAnswerStates = (answerValue) => {
        deck[cardInGame].answerState = answerValue === 'Знаю';
        changeCardAnswerState(deck.slice());
    };

    const answerButtonClick = (answerValue) => {
        setProgress(Math.min(Math.ceil(progress + 1 / deckLength * 100), 100));
        changeAnswerStates(answerValue);
        changeDeckStatistics(answerValue);
    };

    const changeCard = (event) => {
        const value = event.target.value;
        if (value === 'next' && cardInGame < deckLength - 1) {
            setCardInGame(cardInGame + 1);
        } else if (value === 'prev' && cardInGame > 0) {
            setCardInGame(cardInGame - 1);
        }
        setCardFlipState(null);
    };

    const submit = async ()=>{
        if (gameSettings==='user') {
            let cards = deck.map((el) => {
                return {...el, deckId: deckInf[0].deckId, userId: deckInf[0].userId}
            });
            await fetch(`/usersdecks/updatedeckprogress`, {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({

                        userId: deckInf[0].userId,
                        deckId: deckInf[0].deckId,
                        title: deckInf[0].title,
                        progress: Number(deckStatistics),
                        size: deckInf[0].size
                })
            });
            requestUserDecks();
            changeLight('forFilter');
            onNavigateToPage(Page.userDecks);
            const userDeckArr = await (await fetch('/usersdecks/deckslist')).json();
            setCountDeck(userDeckArr.length);
            loadUserDecks(userDeckArr);
            setDeckUserLength(userDeckArr.length);
        }
        else {
            changeLight('standard');
            onNavigateToPage(Page.standardDecks);
        }
    };

    return (
        <div className="card-table container-info">
            <div className="card-section">
                <Card
                    cardData={deck[cardInGame]}
                    answerState={deck[cardInGame].answerState}
                    cardFlipState={cardFlipState}
                    flipCard={flipCard}
                    answerButtonClick={answerButtonClick}
                />
            </div>
            { cardInGame === 0 ? null : (<button value="prev" className='button-navigation previous-card panel' onClick={changeCard}>◀</button>) }
            { cardInGame === deckLength - 1 ? null : (<button value="next" className='button-navigation next-card panel' onClick={changeCard}>▶</button>)}
            <div className="progress panel">
                <div className="progress-bar">
                    <div className="progress-line" style={{width: `${progress}%`}}/>
                </div>
                <span style={{textAlign: 'center'}}>Прогресс: {progress}%</span>
            </div>
            <div className="diagram panel">
                <svg viewBox="0 0 42 42">
                    <circle className="diagram-segment negative-segment" cx="21" cy="21" r="15.91549430918954"/>
                    <circle className="diagram-segment positive-segment" cx="21" cy="21" r="15.91549430918954" strokeDasharray={`${deckStatistics} ${100 - deckStatistics}`}/>
                    <text x ='50%' y='50%' className="percentage">{deckStatistics}%</text>
                </svg>
                <p>Доля знакомых карт</p>
            </div>
            <div className="end-game">
                <button onClick={submit} className="end-button">Завершить</button>
            </div>
        </div>
    )
}

GameField.propTypes={
    status: PropTypes.string.isRequired,
    setCardInGame: PropTypes.func.isRequired,
    deck: PropTypes.array.isRequired,
    progress:PropTypes.number.isRequired,
    cardInGame: PropTypes.number.isRequired,
    setProgress: PropTypes.func.isRequired,
    cardFlipState: PropTypes.bool.isRequired,
    setCardFlipState: PropTypes.func.isRequired,
    deckStatistics: PropTypes.number.isRequired,
    setDeckStatistics: PropTypes.func.isRequired,
    changeCardAnswerState: PropTypes.func.isRequired,
    deckInf: PropTypes.array.isRequired,
    requestUserDecks: PropTypes.func.isRequired,
    onNavigateToPage: PropTypes.func.isRequired,
    setCountDeck: PropTypes.func.isRequired,
    loadUserDecks: PropTypes.func.isRequired,
    setDeckUserLength:PropTypes.func.isRequired,
    gameSettings: PropTypes.string.isRequired
};
