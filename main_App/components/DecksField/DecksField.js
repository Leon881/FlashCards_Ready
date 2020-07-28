import React, {useState, useRef, useEffect} from "react";
import PropTypes from 'prop-types';
import './style.css';
import Deck from '../../containers/Deck';
import Status from "../../constants/Status";
import Loader from "../../components/Loader/Loader";

export default function DecksField({decksIds, status, page}) {
    if (status === Status.loading) return (<Loader/>);
    const decks = [];
    let firstIndication = true;
    for (let id of decksIds) {
        decks.push(<Deck key={id} deckId={id} page={page} firstIndication={firstIndication} />);
        if (firstIndication) firstIndication = false;
    }
    return (
        <div id='form' className='container-info'>
            {decks}
        </div>
    )
}

DecksField.propTypes = {
    decksIds: PropTypes.array.isRequired,
    status: PropTypes.string.isRequired,
    page: PropTypes.string.isRequired,
};
