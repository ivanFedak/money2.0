const modal = ()=>{
    
    const modal = document.querySelector('.modal'),
          closeBtn = document.querySelector('.modal__close'),
          showBtn = document.querySelector('.modal__btn'),
          docBody = document.querySelector('body'),
          money = document.querySelector('.main-block__money span');
    
    if(Number(money.innerHTML) == 0 && !docBody.classList.contains('_showed')){
        modal.classList.add('_active');
        docBody.classList.add('_lock', '_showed');
    }

    function closeModal(e) {
        const target = e.target;
        modal.classList.remove('_active');
        docBody.classList.remove('_lock');
    }

    closeBtn.addEventListener('click',closeModal)
    


    showBtn.addEventListener('click',function(e){
        closeModal(e);
        setTimeout(() => {
            
            const block = document.querySelector('footer');
            const blockValue = block.getBoundingClientRect().top +  window.pageYOffset;
    
            window.scrollTo({//Заставляе скрол робити
                top: blockValue,//Свеху 
                behavior: "smooth"
            });
        }, 100);
        e.preventDefault();
    })
    
}
export default modal;