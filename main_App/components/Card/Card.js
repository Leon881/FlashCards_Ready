import React, {useState, useRef, useEffect} from "react";
import PropTypes from 'prop-types';
import '../GameField/style.css';

export default function Card(props) {
    const {cardId,eng,rus} = props.cardData;
    const answerState = props.answerState;
    const flipState = props.cardFlipState;
    const frontSideClass = flipState ? 'side-hidden' : 'side-shown';
    const backSideClass = !flipState ? 'side-hidden' : 'side-shown';
    const bgColor = answerState === null ? 'bg-neutral': answerState ? 'bg-positive' : 'bg-negative';
    const animation = flipState === null ? '' : ' animate';

    const answerButtonClick = (event) => {
        const answerValue = event.target.value;
        if (answerValue === "Не знаю") props.flipCard();
        props.answerButtonClick(answerValue);
    };
    

    return (
        <div value={answerState} className={`card${animation}`} id={cardId} onClick={answerState === false ? props.flipCard : null}>
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

Card.propTypes={
    cardData: PropTypes.object.isRequired,
    flipCard: PropTypes.func.isRequired,
    flipState: PropTypes.bool.isRequired,
    answerState: PropTypes.bool.isRequired,
    answerButtonClick: PropTypes.func.isRequired
};

