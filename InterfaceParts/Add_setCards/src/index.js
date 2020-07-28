import React, {useState, useRef, useEffect} from "react";
import ReactDOM from "react-dom";
import PropTypes from 'prop-types';
import './index.css';
import {testDeck, testNullDeck} from "../TestComponent";

const emptyCard={id:0,rus:undefined,eng:undefined};

function App(){
    //Есть два варианта состояния: редактирование:testDeck и новый:testNullDeck
    const [countWord, setCountWord] = useState(testDeck);
    let deckId=useRef(0);
    useEffect(()=>{
         deckId= countWord.DeckId ? countWord.DeckId : Symbol(Math.round(Math.random() *99 + 1));
    },[]);

    const addWord=(e)=>{
        e.preventDefault();
        let count=countWord.size;
        let countForInput=count;
        const inputSize=document.getElementById('sizeDeck');
        inputSize.value=++countForInput;
      setCountWord({...countWord,size:++count,cards:[...countWord.cards,{ ...emptyCard, id:countWord.size}]});
    };

    const setCount=(e)=>{
        const countValue=Number(e.currentTarget.value);
        if(countWord.size > countValue) {
            const cards = deleteRow(countValue, countWord.size, countWord.cards);
            setCountWord({...countWord,size:countValue, cards: [...cards]});
            return;
        }
        const cards=addRow(countValue,countWord.size);
        setCountWord({...countWord,size:countValue, cards:[...countWord.cards,...cards]});
    };

    return (
        <div>
        <form id={deckId}>
        <input id="nameDeck" defaultValue={countWord.title}  placeholder="Название колоды" required type="text"/>
        <input id="sizeDeck"  defaultValue ={countWord.size || undefined} placeholder="Размер колоды" required onChange={setCount} type="number"/>
        <table className="table">
            <thead>
            <tr>
                <th>Слово</th>
                <th>Перевод</th>
            </tr>
            </thead>
                <WordRow cardsArr={countWord}/>
        </table>
            <button id="addWord" onClick={addWord}> Добавить слово</button>
            <input id="submitForm" value='Сохранить' type="submit"/>
        </form>
        </div>
    )
}

function WordRow(props){
    const rows=[];
    console.log(props);
    const {cardsArr}=props;
    const{cards}=cardsArr;
    for(let card of cards){
        rows.push(<tr key={card.id}>
            <td><input className='word' defaultValue={card.eng} type='text' placeholder="Английский"/></td>
            <td><input className='word' defaultValue={card.rus}  type='text' placeholder="Русский"/></td>
        </tr>);
    }
    return (
        <tbody>
        {rows}
        </tbody>
    )
}


ReactDOM.render(<App />, document.getElementById("app"));

WordRow.propTypes = {
    cardsArr:PropTypes.object
};

function addRow(countValue,cardSize ){
    const cards=[];
    let cardId=cardSize;
    for(let i=0; i <countValue-cardSize; i++){
        cards.push({...emptyCard,id:cardId});
        cardId++;
    }
    return cards;
}

function deleteRow(countValue,cardSize, cards){
    let sizeAfterDelete=cardSize;
    while(sizeAfterDelete > countValue){
        cards.pop();
        sizeAfterDelete--;
    }
    return cards;
}