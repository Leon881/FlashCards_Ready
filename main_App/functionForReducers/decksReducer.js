import Status from "../constants/Status";

export function loadDeck(state, action) {
    let {decks} = action;
    decks = decks.map(deck => {
        return {...deck}
    });
    const decksIds = decks.map(deck => deck.deckId);
    const decksById = decks.reduce(
        (result, deck) => ({...result, [deck.deckId]: deck}),
        {});
    return {
        ...state,
        status: Status.loaded,
        decksIds: decksIds,
        decksById: decksById,
        filterIds: '',
        filterById: {}
    }
}

export function setFilter(state, action) {
    const filter = action.value.toLowerCase();
    let {decksById} = state;
    const filterIds = [];
    const filterDeck = [];
    for (let key in decksById) {
        if (decksById[key].title.toLowerCase().includes(filter)) {
            filterDeck.push(decksById[key]);
            filterIds.push(key);
        }
    }
    const filterById = filterDeck.reduce(
        (result, deck) => ({...result, [deck.deckId]: deck}),
        {});

    return {
        ...state,
        filterIds: filterIds,
        filterById: filterById
    };

}