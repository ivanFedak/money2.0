/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/components/calc.js":
/*!***********************************!*\
  !*** ./src/js/components/calc.js ***!
  \***********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
const calc = () => {
  const modal = document.querySelector('.modal'); //---ignore

  const inputs = document.querySelectorAll('.main-block__input'); //All inputs

  const total = document.querySelector('.main-block__money span'); //how many is left 

  let totalCount = +document.querySelector('.main-block__money span').innerHTML; //totalCount - 100000

  const arrTotal = [];
  let spend = 0;
  let x = 0;
  checkInput();
  inputs.forEach(input => {
    input.value = 0;
    input.addEventListener('input', function (e) {
      reCount();
      checkInput();
      сheckLimit(e.target);
      generateList();
    });
  });

  function сheckLimit(input) {
    if (Number(input.dataset.price) > Number(total.innerHTML)) {
      // can't buy anymore
      if (!/-/g.test(Math.floor((Number(total.innerHTML) + Number(input.value * input.dataset.price)) / input.dataset.price))) {
        input.value = Math.floor((Number(total.innerHTML) + Number(input.value * input.dataset.price)) / input.dataset.price);
        reCount();
        checkInput();
      }
    }
  }

  function checkInput() {
    inputs.forEach(input => {
      const price = +input.dataset.price;
      input.value = input.value.replace(/[\D]/g, ''); //only number

      if (input.value[0] == 0) {
        //delete 0
        input.value = input.value.slice(1);
      }

      if (input.value == '') {
        // if empty so 0
        input.value = 0;
      }

      if (input.value == 0) {
        // can't sold
        input.parentElement.children[0].classList.add('_disabled');
      } else {
        input.parentElement.children[0].classList.remove('_disabled');
      }

      if (price > Number(total.innerHTML)) {
        // can't buy anymore if price more bigger than our money
        input.nextElementSibling.classList.add('_disabled');
        input.setAttribute('max', input.value);
      } else {
        input.removeAttribute('max');
        input.nextElementSibling.classList.remove('_disabled');
      }

      if (+total.innerHTML == 0 && !document.body.classList.contains('_showed')) {
        //show modal
        setTimeout(() => {
          modal.classList.add('_active');
          document.body.classList.add('_lock', '_showed');
        }, 100);
      }
    });
  }

  function reCount() {
    inputs.forEach((input, i) => {
      arrTotal[i] = +input.value * +input.dataset.price; // [3, 10, 500, 1000]

      spend = arrTotal.map(i => x += i, x = 0).reverse()[0]; // Addition result

      total.innerHTML = totalCount - spend; // totalCount - 100000
      //total.innerHTML - how many is left (active counter)
    });
  }

  function btns(e) {
    const target = e.target;
    const input = e.target.parentElement.querySelector(".main-block__input");

    if (target.classList.contains("main-block__buy")) {
      //click on 'buy"
      ++input.value; // +1

      reCount();
      checkInput();
      generateList();

      if (Number(input.dataset.price) > +total.innerHTML) {
        target.classList.add('_disabled');
      }
    } else if (target.classList.contains("main-block__sell")) {
      //click on 'sold"
      --input.value; // -1

      reCount();
      checkInput();
      generateList();

      if (Number(input.dataset.price) <= +total.innerHTML) {
        target.parentElement.querySelector(".main-block__buy").classList.remove('_disabled');
      }
    }
  } // document.addEventListener('click', (e)=> btns(e));


  document.addEventListener('click', btns); //----------------------------------------Add to receipt--------------------------------------------\\

  const blocks = document.querySelectorAll('.main-block__item');
  let listArr = [];
  let resultArr = [];

  function generateList() {
    blocks.forEach(block => {
      const input = block.querySelector('input');
      const name = block.querySelector('.main-block__title').innerHTML;
      const list = {};
      list.name = name;
      list.quan = input.value;
      list.price = input.dataset.price * input.value;
      listArr.push(list);
      resultArr = listArr.filter(item => item.quan > 0); //every item which quan more than 0
    });
    listArr = [];
    createItem(resultArr);
  }

  function createItem(data) {
    document.querySelectorAll('.footer__item').forEach(item => item.remove()); //Delete all

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

/* harmony default export */ __webpack_exports__["default"] = (calc);

/***/ }),

/***/ "./src/js/components/cards.js":
/*!************************************!*\
  !*** ./src/js/components/cards.js ***!
  \************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
const cards = () => {
  let i = 0;
  const db = [{
    img: 'burger.png',
    title: 'Big Mac',
    price: '3'
  }, {
    img: 'Coca-Cola.png',
    title: 'Coca-Cola',
    price: '4'
  }, {
    img: 'cube.png',
    title: 'rubik\'s cube',
    price: '10'
  }, {
    img: 'book.png',
    title: 'Book',
    price: '20'
  }, {
    img: 'whey.png',
    title: 'Whey Protein',
    price: '60'
  }, {
    img: 'ps5.png',
    title: 'Play Station 5',
    price: '1000'
  }, {
    img: 'iphone.png',
    title: 'Iphone 13 Pro Max',
    price: '1500'
  }, {
    img: 'macbook.png',
    title: 'Macbook Pro 2021',
    price: '3500'
  }, // {
  //     img: 'videoCard.png',
  //     title: 'Nvidia Rtx 3090',
  //     price: '3800',
  // },
  {
    img: 'pc.png',
    title: 'Gaming Pc',
    price: '5000'
  }, {
    img: 'wine.png',
    title: 'Luxury Wine',
    price: '7000'
  }, {
    img: 'awm.png',
    title: 'Awn',
    price: '20000'
  }, {
    img: 'cybertruck.png',
    title: 'Cybertruck',
    price: '70000'
  }, {
    img: 'rolex.png',
    title: 'Rolex',
    price: '90000'
  }, {
    img: 'gold.png',
    title: 'Gold Bar',
    price: '700000'
  }, {
    img: 'Pagani.jpg',
    title: 'Pagani Zonda HP Barchetta',
    price: '15000000'
  }, {
    img: 'mona.jpg',
    title: 'Mona Lisa',
    price: '780000000'
  }, {
    img: 'ship.jpg',
    title: 'Cruise Ship',
    price: '930000000'
  }, {
    img: 'Putin.png',
    title: 'Putin\'s palace',
    price: '1000000000'
  }, {
    img: 'ISS.png',
    title: 'International Space Station',
    price: '150000000000'
  }, {
    img: 'charity.png',
    title: 'Сharity',
    price: '296199999997'
  }];

  function createItem(data) {
    data.forEach(item => {
      const {
        img,
        title,
        price
      } = item;
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

/* harmony default export */ __webpack_exports__["default"] = (cards);

/***/ }),

/***/ "./src/js/modules/modal.js":
/*!*********************************!*\
  !*** ./src/js/modules/modal.js ***!
  \*********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
const modal = () => {
  const modal = document.querySelector('.modal'),
        closeBtn = document.querySelector('.modal__close'),
        showBtn = document.querySelector('.modal__btn'),
        docBody = document.querySelector('body'),
        money = document.querySelector('.main-block__money span');

  if (Number(money.innerHTML) == 0 && !docBody.classList.contains('_showed')) {
    modal.classList.add('_active');
    docBody.classList.add('_lock', '_showed');
  }

  function closeModal(e) {
    const target = e.target;
    modal.classList.remove('_active');
    docBody.classList.remove('_lock');
  }

  closeBtn.addEventListener('click', closeModal);
  showBtn.addEventListener('click', function (e) {
    closeModal(e); // setTimeout(() => {
    //     const block = document.querySelector('footer');
    //     const blockValue = block.getBoundingClientRect().top +  window.pageYOffset;
    //     window.scrollTo({//Заставляе скрол робити
    //         top: blockValue,//Свеху 
    //         behavior: "smooth"
    //     });
    // }, 100);
    // e.preventDefault();
  });
};

/* harmony default export */ __webpack_exports__["default"] = (modal);

/***/ }),

/***/ "./src/js/modules/posPrice.js":
/*!************************************!*\
  !*** ./src/js/modules/posPrice.js ***!
  \************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
const price = () => {
  let block = document.querySelector('.main-block__priceBlock');
  let blockHeight = block.offsetHeight;
  let blockOffset = offset(block).top;
  let moveStart = 1;
  window.addEventListener("orientationchange", function () {
    block = document.querySelector('.main-block__priceBlock');
    blockHeight = block.offsetHeight;
    blockOffset = offset(block).top;
    fixOnScroll();
  }, false);
  window.addEventListener('scroll', fixOnScroll);

  function fixOnScroll() {
    let blockPoint = window.innerHeight - blockHeight / moveStart;

    if (blockHeight > window.innerHeight) {
      blockPoint = window.innerHeight - window.innerHeight / moveStart;
    }

    if (window.scrollY > blockOffset - moveStart) {
      block.classList.add('_fixed');
    } else {
      block.classList.remove('_fixed');
    }
  }

  function offset(el) {
    const rect = el.getBoundingClientRect(),
          scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
          scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return {
      top: rect.top + scrollTop,
      left: rect.left + scrollLeft
    };
  }
};

/* harmony default export */ __webpack_exports__["default"] = (price);

/***/ }),

/***/ "./src/js/modules/scrolling.js":
/*!*************************************!*\
  !*** ./src/js/modules/scrolling.js ***!
  \*************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
const scrolling = () => {
  let links = document.querySelectorAll('.modal__btn'),
      speed = 0.2;
  links.forEach(link => {
    link.addEventListener('click', function (event) {
      event.preventDefault();
      let heightTop = document.documentElement.scrollTop,
          //
      // hash = this.hash,//
      toBlock = document.querySelector('.footer').getBoundingClientRect().top,
          //Top border to whhat we scroll
      start = null; //start pos

      requestAnimationFrame(step);

      function step(time) {
        if (start === null) {
          start = time;
        }

        let progress = time - start,
            r = toBlock < 0 ? Math.max(heightTop - progress / speed, heightTop + toBlock) : Math.min(heightTop + progress / speed, heightTop + toBlock);
        document.documentElement.scrollTo(0, r);

        if (r !== heightTop + toBlock) {
          requestAnimationFrame(step);
        }
      }
    });
  });
};

/* harmony default export */ __webpack_exports__["default"] = (scrolling);

/***/ }),

/***/ "./src/js/services/default.js":
/*!************************************!*\
  !*** ./src/js/services/default.js ***!
  \************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
const def = () => {
  var ua = window.navigator.userAgent;
  var isMobile = {
    Android: function () {
      return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function () {
      return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function () {
      return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function () {
      return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function () {
      return navigator.userAgent.match(/IEMobile/i);
    },
    any: function () {
      return isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows();
    }
  };

  function isIE() {
    ua = navigator.userAgent;
    var is_ie = ua.indexOf("MSIE ") > -1 || ua.indexOf("Trident/") > -1;
    return is_ie;
  }

  if (isIE()) {
    document.querySelector('html').classList.add('ie');
  }

  if (isMobile.any()) {
    document.querySelector('html').classList.add('_touch');
  }

  function testWebP(callback) {
    var webP = new Image();

    webP.onload = webP.onerror = function () {
      callback(webP.height == 2);
    };

    webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
  }

  testWebP(function (support) {
    if (support == true) {
      document.querySelector('body').classList.add('webp');
    } else {
      document.querySelector('body').classList.add('no-webp');
    }
  });
};

/* harmony default export */ __webpack_exports__["default"] = (def);

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
!function() {
/*!************************!*\
  !*** ./src/js/main.js ***!
  \************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _services_default__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./services/default */ "./src/js/services/default.js");
/* harmony import */ var _modules_scrolling__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/scrolling */ "./src/js/modules/scrolling.js");
/* harmony import */ var _components_cards__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/cards */ "./src/js/components/cards.js");
/* harmony import */ var _components_calc__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/calc */ "./src/js/components/calc.js");
/* harmony import */ var _modules_posPrice__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/posPrice */ "./src/js/modules/posPrice.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/modal */ "./src/js/modules/modal.js");







window.onload = function () {
  (0,_components_cards__WEBPACK_IMPORTED_MODULE_2__["default"])();
  (0,_services_default__WEBPACK_IMPORTED_MODULE_0__["default"])();
  (0,_components_calc__WEBPACK_IMPORTED_MODULE_3__["default"])();
  (0,_modules_posPrice__WEBPACK_IMPORTED_MODULE_4__["default"])();
  (0,_modules_modal__WEBPACK_IMPORTED_MODULE_5__["default"])();
  (0,_modules_scrolling__WEBPACK_IMPORTED_MODULE_1__["default"])();
};
}();
/******/ })()
;
//# sourceMappingURL=script.js.map