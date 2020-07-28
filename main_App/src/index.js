import React, {useState, useRef, useEffect} from "react";
import ReactDOM from "react-dom";
import PropTypes from 'prop-types';
import {createStore, applyMiddleware} from 'redux';
import {rootReducer} from '../reducers';
import logger from 'redux-logger';
import {Provider} from 'react-redux';
import './style.css'
import * as actionTypes from '../actionTypes/index';
import Navigation from '../containers/Navigation';
import Pages from '../containers/Pages';
import StandardDecksArr from '../constants/StandardDecks';
import UserDecksArr from '../constants/UserDecks';
import Filter from '../containers/Filter'
import Page from '../constants/Page';
import {loadStandardDecks, loadUserDecks, requestStandardDecks, requestUserDecks, showGameButton,createDeck,setCardInGame,
    setCount, setDeckUserLength,setDeckStandardLength, setAuthorization,setUserInformation, setDeckStatistics} from '../actionCreators/index'


const customMiddleware=({ getState})=>next=>action=>{
    const state=getState();
    if((action.type===actionTypes.NAVIGATE_TO_PAGE) && (state.page===Page.game)){
        store.dispatch(setDeckStatistics(0));
        store.dispatch(setCardInGame(0));
        store.dispatch(showGameButton(false));
    }
    if((action.type===actionTypes.NAVIGATE_TO_PAGE) && (state.page===Page.newDeck)){
        store.dispatch(createDeck());
    }
    return next(action);
};
const store = createStore(rootReducer, applyMiddleware(customMiddleware,logger));

class App extends React.Component {
    constructor(props){
        super(props);
        this.state={auth:false};
        // fetch('/account/checkout').
        // then(answer=>answer.json()).
        // then(auth=>this.auth=auth.isAuthenticated);
    }
    async componentDidMount() {
        await store.dispatch(requestStandardDecks());
        await store.dispatch(requestUserDecks());

        //Для фронта
        // store.dispatch(loadStandardDecks(StandardDecksArr));
        // store.dispatch(loadUserDecks(UserDecksArr));
        // store.dispatch(setCount(UserDecksArr.length));
        //  store.dispatch(setDeckUserLength(UserDecksArr.length));
        //  store.dispatch(setDeckStandardLength(StandardDecksArr.length));

        //Для бэка
        await fetch('/bdinitialization ');
        this.authorization=await (await fetch('/account/checkout')).json();
        this.auth= this.authorization.isAuthenticated;
        this.setState({auth:this.auth});
        store.dispatch(setAuthorization(this.auth));
        this.StandardDecksArr = await (await fetch('/basicdecks')).json();
        store.dispatch(loadStandardDecks(this.StandardDecksArr));
        store.dispatch(setDeckStandardLength(this.StandardDecksArr.length));

        if (this.auth) {
            await store.dispatch(setUserInformation(this.authorization));
            this.UserDeckArr = await (await fetch('/usersdecks/deckslist')).json();
            if (this.UserDeckArr==='Decks not found'){
                 store.dispatch(setCount(0));
                 store.dispatch(loadUserDecks([]));
                 store.dispatch(setDeckUserLength(0));
            }
            else {
                store.dispatch(setCount(this.UserDeckArr.length));
                store.dispatch(loadUserDecks(this.UserDeckArr));
                store.dispatch(setDeckUserLength(this.UserDeckArr.length));
            }
        }
    }

    render() {
        return (
            <Provider store={store}>
                <header id="header">
                    <div className="header-main container-info flex-block">
                        <div className="left-bar flex-block">
                            <div className="product-logo">
                                <span className="product-logo-inner">
                                    FLASH CARDS
                                </span>
                            </div>
                            {this.state.auth && <Filter/>}
                        </div>
                        <div className="profile flex-block">
                            {/*<div className="login-container">*/}
                            {/*    <span className="login">VAM</span>*/}
                            {/*</div>*/}
                            {/*<div className="avatar">*/}
                            {/*    <a href="#changeImg">*/}
                            {/*        <img src="src/img/avatarDefault.jpg" alt="avatar"/>*/}
                            {/*    </a>*/}
                            {/*</div>*/}
                            {this.state.auth || <div className="link auth">
                                <a href="/account/login">Вход</a>
                            </div>}
                            {this.state.auth || <div className="link regist">
                                <a href="/account/register">Регистрация</a>
                            </div>}
                            {this.state.auth && <span>{this.authorization.userName}</span>}
                            {this.state.auth && <div className="link logout">
                                <a href="/account/logout">Выход</a>
                            </div>}
                        </div>
                    </div>
                </header>
                <Navigation/>
                <main id="content">
                    <Pages/>
                </main>
                <footer id="footer">
                    <div className="flex-block copiryght-info container-info">
                        <p>Powered By</p>
                        <div className="company-logo">
                            <a href="#header">
                                <img src="src/img/vamLogo.jpg" alt="CompanyLogo"/>
                            </a>
                        </div>
                    </div>
                </footer>
            </Provider>
        )
    }
}

App.propTypes = {};

ReactDOM.render(<App/>, document.getElementById("app"));