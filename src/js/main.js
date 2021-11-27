
import def from './services/default';
import scrolling from './modules/scrolling';


import cards from './components/cards';
import calc from './components/calc';

import price from './modules/posPrice';
import modal from './modules/modal';

window.onload = function (){
    cards();
    def();
    calc();
    price();
    modal();
    scrolling();
};