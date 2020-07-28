import React, {useState, useRef, useEffect} from "react";
import ReactDOM from "react-dom";
import PropTypes from 'prop-types';
import './index.css';

/* Сущность карты */
class CardEntity {
    constructor(cardId, deckId, eng, rus, status = 0) {
        this.cardId = cardId;
        this.deckId = deckId;
        this.eng = eng;
        this.rus = rus;
        this.status = status;
    }
}

/* Хранилище карт, поступивших из базы */
const cardEntities = [
    new CardEntity(11, 2, 'Scooter', 'Скутер', 0),
    new CardEntity(13, 2, 'Train', 'Поезд', 0),
    new CardEntity(14, 2, 'Bicycle', 'Велосипед', 0),
    new CardEntity(15, 2, 'Car', 'Автомобиль', 0),
    new CardEntity(16, 2, 'Motorcycle', 'Мотоцикл', 0),
];

function Table(props) {
    // if (status===Status.loading) return (<Loader/>);
    // useEffect(()=>{
    //     return ()=> setProgress(0);
    // },[]);
    const deck = props.deck;
    const [cardInGame, setCardInGame] = useState(0);
    const [cardFlipState, setCardFlipState] = useState(false); // новое
    const [progress, setProgress] = useState(0);
    const [answerStates, setAnswerStates] = useState(deck.map(e => null));
    const [deckStatistics, setDeckStatistics] = useState(0); // новое, вместо rating

    const deckLength = deck.length;

    const changeCard = (event) => {
        const value = event.target.value;
        if (value === 'next' && cardInGame < deckLength - 1) {
            setCardInGame(cardInGame + 1);
        } else if (value === 'prev' && cardInGame > 0) {
            setCardInGame(cardInGame - 1);
        }
        setCardFlipState(null);
    }

    const flipCard = (event) => {
        setCardFlipState(!cardFlipState);
    }

    const changeDeckStatistics = (answerValue) => {
       let statisticValue;
       if (answerValue === 'Знаю') {
            statisticValue = Math.min(Math.ceil(deckStatistics + 1 / deckLength * 100), 100);
            setDeckStatistics(statisticValue); 
       } 
    }

    const changeAnswerStates = (answerValue) => {
        if (answerValue === 'Знаю') answerStates[cardInGame] = true;
        else answerStates[cardInGame] = false;
        setAnswerStates(answerStates.slice());
    }

    const answerButtonClick = (answerValue) => {
        setProgress(Math.ceil(progress + 1 / deckLength * 100));
        changeAnswerStates(answerValue);
        changeDeckStatistics(answerValue);
    }

    return (
        <div className="card-table container-info">
            <div className="card-section">
               <Card 
                    cardData={deck[cardInGame]} 
                    cardFlipState={cardFlipState}
                    flipCard={flipCard} 
                    answerState={answerStates[cardInGame]}
                    answerButtonClick={answerButtonClick}
                />
            </div>
                { cardInGame === 0 ? null : (<button value="prev" className='button-navigation previous-card' onClick={changeCard}>◀</button>) }
                { cardInGame === deckLength - 1 ? null : (<button value="next" className='button-navigation next-card' onClick={changeCard}>▶</button>)}
            <div className="progress">
                <div className="progress-bar">
                    <div className="progress-line" style={{width: `${progress}%`}}/>
                </div>
                <span style={{textAlign: 'center'}}>Прогресс: {progress}%</span>
            </div>
            <div className="diagram">
                <svg viewBox="0 0 42 42">
                    <circle className="diagram-segment negative-segment" cx="21" cy="21" r="15.91549430918954"/>
                    <circle className="diagram-segment positive-segment" cx="21" cy="21" r="15.91549430918954" strokeDasharray={`${deckStatistics} ${100 - deckStatistics}`}/>
                    <text x ='50%' y='50%' className="percentage">{deckStatistics}%</text>
                </svg>
                <p>Доля знакомых карт</p>
            </div>
            <div className="end-game">
                <button className="end-button">Завершить</button>
            </div>
        </div>
    )
}

function Card(props) {
    const {cardId, eng, rus} = props.cardData;
    const answerState = props.answerState;
    const flipState = props.cardFlipState;

    const answerButtonClick = (event) => {
        const answerValue = event.target.value;
        if (answerValue === "Не знаю") flipCard();
        props.answerButtonClick(answerValue);
    } 
    const flipCard =  props.flipCard;

    const frontSideClass = flipState ? 'side-hidden' : 'side-shown';
    const backSideClass = !flipState ? 'side-hidden' : 'side-shown';
    const bgColor = answerState === null ? 'bg-neutral': answerState ? 'bg-positive' : 'bg-negative'; 
    const animation = flipState === null ? '' : ' animate';

    return (
        <div value={answerState} className={`card${animation}`} id={cardId} onClick={answerState === false ? flipCard : null}>
           <div className={`card-side card-front ${bgColor} ${frontSideClass}`}>
                <span>{eng}</span>
                {
                    answerState === null ? (
                        <div className="answer-options">
                            <input type="button" value="Знаю" className="answer-button answer-positive" onClick={answerButtonClick}/>
                            <input type="button" value="Не знаю" className="answer-button answer-negative" onClick={answerButtonClick}/>
                        </div>
                    ) : null
                }
            </div>
            <div className={`card-side card-back ${backSideClass}`}>
                <span>{rus}</span>
            </div>
        </div>
    )
}

Table.PropTypes = {
    deck: PropTypes.object.isRequired,
    deckStatistics: PropTypes.number.isRequired
}

Card.PropTypes = {
    cardData: PropTypes.number.isRequired,
    answerState: PropTypes.bool.isRequired,
    answerButtonClick: PropTypes.func.isRequired,
    flipState: PropTypes.bool.isRequired
}

ReactDOM.render(<Table deck={cardEntities} status={'something'} />, 
    document.getElementById("app"));