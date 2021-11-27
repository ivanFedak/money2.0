const price = ()=>{
    
    let block = document.querySelector('.main-block__priceBlock');
    let blockHeight = block.offsetHeight;
    let blockOffset = offset(block).top;
    let moveStart = 1;

    
    window.addEventListener("orientationchange", function() {
        block = document.querySelector('.main-block__priceBlock');
        blockHeight = block.offsetHeight;
        blockOffset = offset(block).top;
        fixOnScroll();
    }, false);


    window.addEventListener('scroll',fixOnScroll)
    
    function fixOnScroll() {

        let blockPoint = window.innerHeight - blockHeight / moveStart;

        if(blockHeight > window.innerHeight){
            blockPoint = window.innerHeight - window.innerHeight / moveStart;
        }

        if(window.scrollY > blockOffset - moveStart){
            block.classList.add('_fixed');
        }else{
            block.classList.remove('_fixed');
        }
    }


    
    function offset(el) {
        const rect = el.getBoundingClientRect(),
              scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
              scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        return {top: rect.top + scrollTop, left: rect.left + scrollLeft}
    }

    


}
export default price;