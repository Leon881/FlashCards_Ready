import emptyCard from "../constants/EmptyCard";

export function increaseCountRow(state,action){
    let size=state.deck[0].size;
    return {deck:[{...state.deck[0],size:size+1}],cards:[...state.cards,{ ...emptyCard, cardId:size}], status: state.status }
}

export function stateSize (state,action){

    if(action.value > state.deck[0].size) {
        const cards=increaseValue(state.deck[0].size, action.value);
        return {deck:[{...state.deck[0], size: action.value}], cards: [...state.cards, ...cards], status: state.status}
    }
    else if (state.deck[0].size > action.value){
        const cards=decreaseValue(state.cards,state.deck[0].size,action.value);
        return {deck:[{...state.deck[0],size: action.value}], cards: [...cards], status: state.status}
    }
    return {...state};
}

const increaseValue=(size,value)=>{
    const cards=[];
    let valueSize=size;
    for(let i=0; i <value-size; i++){
        cards.push({...emptyCard,cardId:valueSize});
        valueSize++;
    }
    return cards;
};

const decreaseValue=(cardsArr,size,value)=>{
    const cards=cardsArr;
    let sizeAfterDelete=size;
    while(sizeAfterDelete > value){
        cards.pop();
        sizeAfterDelete--;
    }
    return cards;
};