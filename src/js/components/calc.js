

const calc = ()=>{

    const modal = document.querySelector('.modal'); //---ignore

    const inputs = document.querySelectorAll('.main-block__input'); //All inputs
    const total = document.querySelector('.main-block__money span'); //how many is left 
    let totalCount = +document.querySelector('.main-block__money span').innerHTML;  //totalCount - 100000
    const arrTotal = [];
    let spend = 0;
    let x = 0;

    checkInput();
    inputs.forEach(input => {
        input.value = 0;

        input.addEventListener('input',function(e){
            reCount();
            checkInput();
            сheckLimit(e.target);
            generateList();
        });
    });

    function сheckLimit(input){
        if(Number(input.dataset.price) > Number(total.innerHTML)){ // can't buy anymore
            if(!/-/g.test(Math.floor((Number(total.innerHTML) + Number((input.value * input.dataset.price))) / input.dataset.price))){
                input.value = Math.floor((Number(total.innerHTML) + Number((input.value * input.dataset.price))) / input.dataset.price);
                reCount();
                checkInput();
            }
        }
    }

    function checkInput(){
        inputs.forEach(input=>{
            const price = +input.dataset.price;


            input.value = input.value.replace(/[\D]/g, ''); //only number

            if(input.value[0] == 0){//delete 0
                input.value = input.value.slice(1);
            }

            if(input.value == ''){// if empty so 0
                input.value = 0;
            }

            if(input.value == 0){// can't sold
                input.parentElement.children[0].classList.add('_disabled');
            }else{
                input.parentElement.children[0].classList.remove('_disabled');
            }

            if(price > Number(total.innerHTML)){ // can't buy anymore if price more bigger than our money
                input.nextElementSibling.classList.add('_disabled');
                input.setAttribute('max', input.value);

            }else{
                input.removeAttribute('max');
                input.nextElementSibling.classList.remove('_disabled');
            }

            if(+total.innerHTML == 0 && !document.body.classList.contains('_showed')){ //show modal
                setTimeout(() => {
                    
                    modal.classList.add('_active');
                    document.body.classList.add('_lock', '_showed');
                }, 100);
            }
        });
    }
    
    function reCount(){
        inputs.forEach((input, i) => {

            arrTotal[i] = +input.value * +input.dataset.price; // [3, 10, 500, 1000]
            spend = arrTotal.map(i=>x+=i,x=0).reverse()[0]; // Addition result

            total.innerHTML = totalCount - spend;

            // totalCount - 100000
            //total.innerHTML - how many is left (active counter)
        });
    }

    function btns(e){
        const target = e.target;
        const input = e.target.parentElement.querySelector(".main-block__input");

        if (target.classList.contains("main-block__buy")) {//click on 'buy"
            ++input.value; // +1
            reCount();
            checkInput();
            generateList();
            if(Number(input.dataset.price) > +total.innerHTML){
                target.classList.add('_disabled');
            }
        } 

        else if (target.classList.contains("main-block__sell")) {//click on 'sold"
            --input.value; // -1
            reCount();
            checkInput();
            generateList();
            if(Number(input.dataset.price) <= +total.innerHTML){
                target.parentElement.querySelector(".main-block__buy").classList.remove('_disabled');
            }
        }

    }
 
    document.addEventListener('click', (e)=> btns(e));

//----------------------------------------Add to receipt--------------------------------------------\\

    const blocks = document.querySelectorAll('.main-block__item');

    let listArr = [];
    let resultArr = [];

    function generateList() {
        blocks.forEach(block=>{
            const input = block.querySelector('input');
            const name = block.querySelector('.main-block__title').innerHTML;
            const list = {};
            list.name = name;
            list.quan = input.value;
            list.price = input.dataset.price * input.value;
            listArr.push(list);
            resultArr = listArr.filter(item => item.quan > 0 ); //every item which quan more than 0
        });
        listArr = [];
        createItem(resultArr);
    }

    function createItem(data) { 

        document.querySelectorAll('.footer__item').forEach(item=> item.remove()); //Delete all

        data.forEach(item => {

            // const {name,quan,price} = item;

            let goods = document.createElement('div');
            goods.classList.add('footer__item');

            goods.innerHTML = `
                <div class="footer__name">${item.name}</div>
                <div class="footer__quantity">x<span>${item.quan}</span></div>
                <div class="footer__price">$ <span>${item.price}</span></div> 
            `;

            document.querySelector('.footer__body').appendChild(goods);
        });
        document.querySelector('.footer__money span').innerHTML = spend; //total
    }

};
export default calc;


