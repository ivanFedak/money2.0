
import def from './services/default';



import cards from './components/cards';
import calc from './modules/calc';
import price from './modules/posPrice';
import modal from './modules/modal';

window.onload = function (){
    cards();
    def();
    calc();
    price();
    modal();
};