const cards = ()=>{
    
    let i = 0;
    const db = [
        {
            img: 'burger.png',
            title: 'Big Mac',
            price: '3',
        },
        {
            img: 'Coca-Cola.png',
            title: 'Coca-Cola',
            price: '4',
        },
        {
            img: 'cube.png',
            title: 'rubik\'s cube',
            price: '10',
        },
        {
            img: 'book.png',
            title: 'Book',
            price: '20',
        },
        {
            img: 'whey.png',
            title: 'Whey Protein',
            price: '60',
        },
        {
            img: 'ps5.png',
            title: 'Play Station 5',
            price: '1000',
        },
        {
            img: 'iphone.png',
            title: 'Iphone 13 Pro Max',
            price: '1500',
        },
        {
            img: 'macbook.png',
            title: 'Macbook Pro 2021',
            price: '3500',
        },
        // {
        //     img: 'videoCard.png',
        //     title: 'Nvidia Rtx 3090',
        //     price: '3800',
        // },
        {
            img: 'pc.png',
            title: 'Gaming Pc',
            price: '5000',
        },
        {
            img: 'wine.png',
            title: 'Luxury Wine',
            price: '7000',
        },
        {
            img: 'awm.png',
            title: 'Awn',
            price: '20000',
        },
        {
            img: 'cybertruck.png',
            title: 'Cybertruck',
            price: '70000',
        },
        {
            img: 'rolex.png',
            title: 'Rolex',
            price: '90000',
        },
        {
            img: 'gold.png',
            title: 'Gold Bar',
            price: '700000',
        },
        {
            img: 'Pagani.jpg',
            title: 'Pagani Zonda HP Barchetta',
            price: '15000000',
        },

        {
            img: 'mona.jpg',
            title: 'Mona Lisa',
            price: '780000000',
        },
        {
            img: 'ship.jpg',
            title: 'Cruise Ship',
            price: '930000000',
        },
        {
            img: 'Putin.png',
            title: 'Putin\'s palace',
            price: '1000000000',
        },
        {
            img: 'ISS.png',
            title: 'International Space Station',
            price: '150000000000',
        },
        {
            img: 'charity.png',
            title: '??harity',
            price: '296199999997',
        },
    ];

    function createItem(data) {
        data.forEach(item => {
            const {img,title,price} = item;

            let card = document.createElement('div');
            card.classList.add('main-block__item');
            card.dataset.id = i++;

            card.innerHTML = `

                <div class="main-block__image">
                    <img src="./img//goods/${img}" alt="${title}">
                </div>

                <div class="main-block__content">
                    <div class="main-block__title">${title}</div>
                    <div class="main-block__price">$${price}</div>
                </div>

                <div class="main-block__controls">
                    <button class="main-block__sell btn">Sell</button>
                    <input autocomplete='off' min="0"  type='number' name='form[]' class='main-block__input' data-price=${price}>
                    <button class="main-block__buy btn">Buy</button>
                </div>

            
            `;
            document.querySelector('.main-block__body').appendChild(card);
        });
    }
    createItem(db);







   





};
export default cards;