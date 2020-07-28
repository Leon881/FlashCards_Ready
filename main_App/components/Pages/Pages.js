import React from 'react';
import PropTypes from 'prop-types';
import Page from '../../constants/Page';
import Description from '../../components/Description/Description';
import DecksField from '../../containers/DecksField';
import NewDeckForm from '../../containers/NewDeckForm';
import GameField from '../../containers/GameField'

export default function Pages({ page }) {
    switch (page) {
        case Page.description:
            return <Description />;
        case Page.standardDecks:
            return <DecksField/>;
        case Page.userDecks:
            return <DecksField/>;
        case Page.newDeck :
            return <NewDeckForm/>;
        case Page.game:
            return <GameField/>;
        default:
            return  <p>Unknown page</p>;
    }
}

Pages.propTypes = {
    page: PropTypes.string.isRequired,
};
