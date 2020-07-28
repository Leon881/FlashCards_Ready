import PropTypes from "prop-types";
import React, {useRef, useEffect} from "react";
import './style.css';
import WordRow from '../../containers/WordRow';
import Status from "../../constants/Status";
import Loader from "../../components/Loader/Loader";
import Page from "../../constants/Page";
import changeLight from "../../helpers/changeBackLight";


export default function newDeckForm(props){
   const {newDeck,increaseCountRow,setCountRow, loadUserDecks, status,deckId,newOrUpdate,
       onNavigateToPage,setCountDeck, requestUserDecks,setDeckUserLength,userId}=props;
    if (status === Status.loading) return (<Loader/>);
    const addWord=(e)=>{
        e.preventDefault();
        increaseCountRow();
    };

    const submit=async (e)=>{
        e.preventDefault();
        const id=newOrUpdate==='updateDeck' ? newDeck.deck[0].deckId :deckId;
        const src=newOrUpdate==='updateDeck' ? `/usersdecks/updatedeck`:'/usersdecks/newdeck';
        let cards=newDeck.cards.map((el)=>{return {...el, deckId:id,userId:userId}});
        await fetch(src, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                deck:[{
                userId: userId,
                deckId: id,
                title: e.target.title.value,
                progress: 0,
                size:Number(e.target.size.value)}],
                cards:cards
            })
        });
        requestUserDecks();
        onNavigateToPage(Page.userDecks);
        changeLight('forFilter');
        const userDeckArr=await(await fetch('/usersdecks/deckslist')).json();
        setCountDeck(userDeckArr.length);
        loadUserDecks(userDeckArr);
        setDeckUserLength(userDeckArr.length);
    };

    const setCount=(e)=>{
        const value=Number(e.currentTarget.value);
        setCountRow(value);
    };
    return (
        <div className="container-info">
            <form className="newDeck" onSubmit={submit}>
                <input id="nameDeck" defaultValue={newDeck.deck[0].title} name='title' placeholder="Название колоды" required type="text"/>
                <input id="sizeDeck"   value={newDeck.deck[0].size} name='size' min={0} placeholder="Размер колоды"
                       onChange={setCount} required  type="number"/>
                <table className="table">
                    <thead>
                    <tr>
                        <th className="table-cell table-header">Слово</th>
                        <th className="table-cell table-header">Перевод</th>
                    </tr>
                    </thead>
                    <WordRow/>
                </table>
                <button id="addWord" onClick={addWord}>Добавить</button>
                <input id="submitForm" value='Сохранить' type="submit"/>
            </form>
        </div>
    )
}

newDeckForm.propTypes={
    newDeck : PropTypes.object.isRequired,
    deckId: PropTypes.number.isRequired,
    increaseCountRow: PropTypes.func.isRequired,
    setCountRow: PropTypes.func.isRequired,
    status:PropTypes.string.isRequired,
    onNavigateToPage: PropTypes.func.isRequired,
    requestUserDecks: PropTypes.func.isRequired,
    loadUserDecks: PropTypes.func.isRequired,
    setCountDeck:PropTypes.func.isRequired,
    newOrUpdate: PropTypes.string.isRequired,
    userId: PropTypes.number.isRequired,
    setDeckUserLength: PropTypes.func.isRequired
};