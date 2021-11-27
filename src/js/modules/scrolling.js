const scrolling = ()=>{
    
    let links = document.querySelectorAll('.modal__btn'),
        speed = 0.2;

    links.forEach(link=>{
        link.addEventListener('click',function(event){
            event.preventDefault();

            let heightTop = document.documentElement.scrollTop,//
                // hash = this.hash,//
                toBlock = document.querySelector('.footer').getBoundingClientRect().top,//Top border to whhat we scroll
                start = null;//start pos

            requestAnimationFrame(step);

            function step(time){
                if(start === null){
                    start = time;
                }

                let progress = time - start,
                    r = (toBlock < 0 ? Math.max(heightTop - progress/speed, heightTop + toBlock): Math.min(heightTop + progress/speed, heightTop + toBlock));

                    document.documentElement.scrollTo(0, r);

                if(r !== heightTop + toBlock){
                    requestAnimationFrame(step);
                }
            }

        })
    })




};
export default scrolling;