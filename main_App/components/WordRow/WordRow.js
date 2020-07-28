import PropTypes from "prop-types";
import React from "react";
import './style.css';

export default function WordRow({cards,setCardData}){
    const rows=[];
    const setData=(e)=>{
        const el=e.target;
        setCardData(el.value, Number(el.id), el.name);
    };
    for(let card of cards){
        rows.push(<tr key={card.cardId} className="panel">
            <td className="table-cell"><input className='word' name='eng' id={card.cardId} onChange={setData} defaultValue={card.eng} type='text' placeholder="Английский"/></td>
            <td className="table-cell"><input className='word' name='rus' id={card.cardId} onChange={setData} defaultValue={card.rus}  type='text' placeholder="Русский"/></td>
        </tr>);
    }
    return (
        <tbody>
        {rows}
        </tbody>
    )
}

WordRow.propTypes={
    cards: PropTypes.array.isRequired,
    setCardData: PropTypes.func.isRequired
};