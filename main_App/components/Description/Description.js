import React from 'react';
import PropTypes from 'prop-types';

export default function Description() {
    return(
        <div className="container-info">
            <h1 className="sectionTitle">Добро пожаловать на сервис по созданию флеш-карт!</h1>
                <div className="flex-block">
                    <div class="panel">
                        <p>В разделе "колоды" вы можете потренироваться на уже доступных наборах</p>
                        <div className="img-container">
                            <img src="src/img/deck.png" alt="deck"/>
                        </div>
                    </div>
                <div class="panel">
                    <p>Для создания своих наборов карт необходимо войти в аккаунт или создать новый</p>
                    <div className="img-container">
                        <img src="src/img/acc.png" alt="acc"/>
                    </div>
                </div>
            </div>
        </div>
    )
}