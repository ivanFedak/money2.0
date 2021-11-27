

const calc = ()=>{


    const inputs = document.querySelectorAll('.main-block__input'); //All inputs
    const total = document.querySelector('.main-block__money span'); //how many is left 
    let totalCount = +document.querySelector('.main-block__money span').innerHTML;  //totalCount - 100000

    const arrTotal = [];
    let spend = 0;
    let x = 0;

    inputs.forEach(input => {
        input.value = 0;
        checkInput();

        input.addEventListener('input',function(e){

            reCount();
            checkInput();
        });
    });



    function checkInput(){
        inputs.forEach(input=>{
            const price = +input.dataset.price;
            const value = input.value;

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

                if(!/-/g.test(Math.floor((Number(total.innerHTML) + Number((input.value * price))) / price))){
                    input.value = Math.floor((Number(total.innerHTML) + Number((input.value * price))) / price);
                    reCount();
                }

            }else{
                input.removeAttribute('max');
                input.nextElementSibling.classList.remove('_disabled');
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

        if (target.classList.contains("main-block__buy")) {
            ++input.value; // +1
            reCount();
            checkInput();
            if(Number(input.dataset.price) > +total.innerHTML){
                target.classList.add('_disabled');
            }
        } 

        else if (target.classList.contains("main-block__sell")) {
            --input.value;
            reCount();
            checkInput();
            if(Number(input.dataset.price) <= +total.innerHTML){
                target.parentElement.querySelector(".main-block__buy").classList.remove('_disabled');
            }
        }

    }
 
    document.addEventListener('click', (e)=> btns(e));

};
export default calc;


