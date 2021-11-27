/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

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
    img: 'iphone.png',
    title: 'Iphone 13 Pro Max',
    price: '1500'
  }, {
    img: 'macbook.png',
    title: 'Macbook Pro 2021',
    price: '3500'
  }, {
    img: 'videoCard.png',
    title: 'Nvidia Rtx 3090',
    price: '3800'
  }, {
    img: 'pc.png',
    title: 'Gaming Pc',
    price: '5000'
  }, {
    img: 'wine.png',
    title: 'Luxury Wine',
    price: '7000'
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
    img: 'formula.png',
    title: 'Formula 1 Car',
    price: '15000000'
  }, {
    img: 'mona.jpg',
    title: 'Mona Lisa',
    price: '780000000'
  }, {
    img: 'charity.png',
    title: 'Сharity',
    price: '296200000000'
  }, {
    img: 'mona.jpg',
    title: 'Igor\'s training',
    price: '296200000001'
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

/***/ "./src/js/libs/dynamicAdaptive.js":
/*!****************************************!*\
  !*** ./src/js/libs/dynamicAdaptive.js ***!
  \****************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
const dynamicAdaptive = () => {
  // Dynamic Adapt v.1
  // HTML data-da="where(uniq class name),when(breakpoint),position(digi)"
  // e.x. data-da=".item,992,2"
  // Andrikanych Yevhen 2020
  // https://www.youtube.com/c/freelancerlifestyle
  "use strict";

  function DynamicAdapt(type) {
    this.type = type;
  }

  DynamicAdapt.prototype.init = function () {
    const _this = this; // массив объектов


    this.оbjects = [];
    this.daClassname = "_dynamic_adapt_"; // массив DOM-элементов

    this.nodes = document.querySelectorAll("[data-da]"); // наполнение оbjects объктами

    for (let i = 0; i < this.nodes.length; i++) {
      const node = this.nodes[i];
      const data = node.dataset.da.trim();
      const dataArray = data.split(",");
      const оbject = {};
      оbject.element = node;
      оbject.parent = node.parentNode;
      оbject.destination = document.querySelector(dataArray[0].trim());
      оbject.breakpoint = dataArray[1] ? dataArray[1].trim() : "767";
      оbject.place = dataArray[2] ? dataArray[2].trim() : "last";
      оbject.index = this.indexInParent(оbject.parent, оbject.element);
      this.оbjects.push(оbject);
    }

    this.arraySort(this.оbjects); // массив уникальных медиа-запросов

    this.mediaQueries = Array.prototype.map.call(this.оbjects, function (item) {
      return '(' + this.type + "-width: " + item.breakpoint + "px)," + item.breakpoint;
    }, this);
    this.mediaQueries = Array.prototype.filter.call(this.mediaQueries, function (item, index, self) {
      return Array.prototype.indexOf.call(self, item) === index;
    }); // навешивание слушателя на медиа-запрос
    // и вызов обработчика при первом запуске

    for (let i = 0; i < this.mediaQueries.length; i++) {
      const media = this.mediaQueries[i];
      const mediaSplit = String.prototype.split.call(media, ',');
      const matchMedia = window.matchMedia(mediaSplit[0]);
      const mediaBreakpoint = mediaSplit[1]; // массив объектов с подходящим брейкпоинтом

      const оbjectsFilter = Array.prototype.filter.call(this.оbjects, function (item) {
        return item.breakpoint === mediaBreakpoint;
      });
      matchMedia.addListener(function () {
        _this.mediaHandler(matchMedia, оbjectsFilter);
      });
      this.mediaHandler(matchMedia, оbjectsFilter);
    }
  };

  DynamicAdapt.prototype.mediaHandler = function (matchMedia, оbjects) {
    if (matchMedia.matches) {
      for (let i = 0; i < оbjects.length; i++) {
        const оbject = оbjects[i];
        оbject.index = this.indexInParent(оbject.parent, оbject.element);
        this.moveTo(оbject.place, оbject.element, оbject.destination);
      }
    } else {
      for (let i = 0; i < оbjects.length; i++) {
        const оbject = оbjects[i];

        if (оbject.element.classList.contains(this.daClassname)) {
          this.moveBack(оbject.parent, оbject.element, оbject.index);
        }
      }
    }
  }; // Функция перемещения


  DynamicAdapt.prototype.moveTo = function (place, element, destination) {
    element.classList.add(this.daClassname);

    if (place === 'last' || place >= destination.children.length) {
      destination.insertAdjacentElement('beforeend', element);
      return;
    }

    if (place === 'first') {
      destination.insertAdjacentElement('afterbegin', element);
      return;
    }

    destination.children[place].insertAdjacentElement('beforebegin', element);
  }; // Функция возврата


  DynamicAdapt.prototype.moveBack = function (parent, element, index) {
    element.classList.remove(this.daClassname);

    if (parent.children[index] !== undefined) {
      parent.children[index].insertAdjacentElement('beforebegin', element);
    } else {
      parent.insertAdjacentElement('beforeend', element);
    }
  }; // Функция получения индекса внутри родителя


  DynamicAdapt.prototype.indexInParent = function (parent, element) {
    const array = Array.prototype.slice.call(parent.children);
    return Array.prototype.indexOf.call(array, element);
  }; // Функция сортировки массива по breakpoint и place 
  // по возрастанию для this.type = min
  // по убыванию для this.type = max


  DynamicAdapt.prototype.arraySort = function (arr) {
    if (this.type === "min") {
      Array.prototype.sort.call(arr, function (a, b) {
        if (a.breakpoint === b.breakpoint) {
          if (a.place === b.place) {
            return 0;
          }

          if (a.place === "first" || b.place === "last") {
            return -1;
          }

          if (a.place === "last" || b.place === "first") {
            return 1;
          }

          return a.place - b.place;
        }

        return a.breakpoint - b.breakpoint;
      });
    } else {
      Array.prototype.sort.call(arr, function (a, b) {
        if (a.breakpoint === b.breakpoint) {
          if (a.place === b.place) {
            return 0;
          }

          if (a.place === "first" || b.place === "last") {
            return 1;
          }

          if (a.place === "last" || b.place === "first") {
            return -1;
          }

          return b.place - a.place;
        }

        return b.breakpoint - a.breakpoint;
      });
      return;
    }
  };

  const da = new DynamicAdapt("max");
  da.init();
};

/* harmony default export */ __webpack_exports__["default"] = (dynamicAdaptive);

/***/ }),

/***/ "./src/js/libs/slider.js":
/*!*******************************!*\
  !*** ./src/js/libs/slider.js ***!
  \*******************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
const slider = () => {
  //BildSlider
  let sliders = document.querySelectorAll('._swiper');

  if (sliders) {
    for (let index = 0; index < sliders.length; index++) {
      let slider = sliders[index];

      if (!slider.classList.contains('swiper-bild')) {
        let slider_items = slider.children;

        if (slider_items) {
          for (let index = 0; index < slider_items.length; index++) {
            let el = slider_items[index];
            el.classList.add('swiper-slide');
          }
        }

        let slider_content = slider.innerHTML;
        let slider_wrapper = document.createElement('div');
        slider_wrapper.classList.add('swiper-wrapper');
        slider_wrapper.innerHTML = slider_content;
        slider.innerHTML = '';
        slider.appendChild(slider_wrapper);
        slider.classList.add('swiper-bild');

        if (slider.classList.contains('_swiper_scroll')) {
          let sliderScroll = document.createElement('div');
          sliderScroll.classList.add('swiper-scrollbar');
          slider.appendChild(sliderScroll);
        }
      }

      if (slider.classList.contains('_gallery')) {//slider.data('lightGallery').destroy(true);
      }
    }

    sliders_bild_callback();
  }

  function sliders_bild_callback(params) {}

  let sliderScrollItems = document.querySelectorAll('._swiper_scroll');

  if (sliderScrollItems.length > 0) {
    for (let index = 0; index < sliderScrollItems.length; index++) {
      const sliderScrollItem = sliderScrollItems[index];
      const sliderScrollBar = sliderScrollItem.querySelector('.swiper-scrollbar');
      const sliderScroll = new Swiper(sliderScrollItem, {
        observer: true,
        observeParents: true,
        direction: 'vertical',
        slidesPerView: 'auto',
        freeMode: true,
        scrollbar: {
          el: sliderScrollBar,
          draggable: true,
          snapOnRelease: false
        },
        mousewheel: {
          releaseOnEdges: true
        }
      });
      sliderScroll.scrollbar.updateSize();
    }
  }

  function sliders_bild_callback(params) {} // let slider_about = new Swiper('.about__slider', {
  //     /*
  //     effect: 'fade',
  //     autoplay: {
  //         delay: 3000,
  //         disableOnInteraction: false,
  //     },
  //     */
  //     observer: true,
  //     observeParents: true,
  //     slidesPerView: 1,
  //     spaceBetween: 0,
  //     autoHeight: true,
  //     speed: 800,
  //     //touchRatio: 0,
  //     //simulateTouch: false,
  //     //loop: true,
  //     //preloadImages: false,
  //     //lazy: true,
  //     // Dotts
  //     //pagination: {
  //     //	el: '.slider-quality__pagging',
  //     //	clickable: true,
  //     //},
  //     // Arrows
  //     navigation: {
  //         nextEl: '.about__more .more__item_next',
  //         prevEl: '.about__more .more__item_prev',
  //     },
  //     /*
  //     breakpoints: {
  //         320: {
  //             slidesPerView: 1,
  //             spaceBetween: 0,
  //             autoHeight: true,
  //         },
  //         768: {
  //             slidesPerView: 2,
  //             spaceBetween: 20,
  //         },
  //         992: {
  //             slidesPerView: 3,
  //             spaceBetween: 20,
  //         },
  //         1268: {
  //             slidesPerView: 4,
  //             spaceBetween: 30,
  //         },
  //     },
  //     */
  //     on: {
  //         lazyImageReady: function () {
  //             ibg();
  //         },
  //     }
  //     // And if we need scrollbar
  //     //scrollbar: {
  //     //	el: '.swiper-scrollbar',
  //     //},
  // });


  if (document.querySelector('.programs__body')) {
    new Swiper('.programs__body', {
      observer: true,
      observeParents: true,
      slidesPerView: 3,
      spaceBetween: 30,
      speed: 800,
      loop: true,
      watchOverflow: true,
      // Arrows
      navigation: {
        nextEl: '.programs .programs__arrow_next',
        prevEl: '.programs .programs__arrow_prev'
      },
      breakpoints: {
        //when window width is >= 320px //More
        260: {
          slidesPerView: 1,
          spaceBetween: 10
        },
        320: {
          slidesPerView: 1.1,
          spaceBetween: 15
        },
        768: {
          slidesPerView: 2,
          spaceBetween: 20
        },
        992: {
          slidesPerView: 3,
          spaceBetween: 30
        }
      }
    });
  }
};

/* harmony default export */ __webpack_exports__["default"] = (slider);

/***/ }),

/***/ "./src/js/libs/spoller.js":
/*!********************************!*\
  !*** ./src/js/libs/spoller.js ***!
  \********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
const spoller = () => {
  //=================

  /*
  Для родителя слойлеров пишем атрибут data-spollers
  Для заголовков слойлеров пишем атрибут data-spoller
  Если нужно включать\выключать работу спойлеров на разных размерах экранов
  пишем параметры ширины и типа брейкпоинта.
  Например: 
  data-spollers="992,max" - спойлеры будут работать только на экранах меньше или равно 992px
  data-spollers="768,min" - спойлеры будут работать только на экранах больше или равно 768px
  
  Если нужно что бы в блоке открывался болько один слойлер добавляем атрибут data-one-spoller
  */
  // SPOLLERS
  const spollersArray = document.querySelectorAll('[data-spollers]');

  if (spollersArray.length > 0) {
    // Получение обычных слойлеров
    const spollersRegular = Array.from(spollersArray).filter(function (item, index, self) {
      return !item.dataset.spollers.split(",")[0];
    }); // Инициализация обычных слойлеров

    if (spollersRegular.length > 0) {
      initSpollers(spollersRegular);
    } // Получение слойлеров с медиа запросами


    const spollersMedia = Array.from(spollersArray).filter(function (item, index, self) {
      return item.dataset.spollers.split(",")[0];
    }); // Инициализация слойлеров с медиа запросами

    if (spollersMedia.length > 0) {
      const breakpointsArray = [];
      spollersMedia.forEach(item => {
        const params = item.dataset.spollers;
        const breakpoint = {};
        const paramsArray = params.split(",");
        breakpoint.value = paramsArray[0];
        breakpoint.type = paramsArray[1] ? paramsArray[1].trim() : "max";
        breakpoint.item = item;
        breakpointsArray.push(breakpoint);
      }); // Получаем уникальные брейкпоинты

      let mediaQueries = breakpointsArray.map(function (item) {
        return '(' + item.type + "-width: " + item.value + "px)," + item.value + ',' + item.type;
      });
      mediaQueries = mediaQueries.filter(function (item, index, self) {
        return self.indexOf(item) === index;
      }); // Работаем с каждым брейкпоинтом

      mediaQueries.forEach(breakpoint => {
        const paramsArray = breakpoint.split(",");
        const mediaBreakpoint = paramsArray[1];
        const mediaType = paramsArray[2];
        const matchMedia = window.matchMedia(paramsArray[0]); // Объекты с нужными условиями

        const spollersArray = breakpointsArray.filter(function (item) {
          if (item.value === mediaBreakpoint && item.type === mediaType) {
            return true;
          }
        }); // Событие

        matchMedia.addListener(function () {
          initSpollers(spollersArray, matchMedia);
        });
        initSpollers(spollersArray, matchMedia);
      });
    } // Инициализация


    function initSpollers(spollersArray) {
      let matchMedia = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      spollersArray.forEach(spollersBlock => {
        spollersBlock = matchMedia ? spollersBlock.item : spollersBlock;

        if (matchMedia.matches || !matchMedia) {
          spollersBlock.classList.add('_init');
          initSpollerBody(spollersBlock);
          spollersBlock.addEventListener("click", setSpollerAction);
        } else {
          spollersBlock.classList.remove('_init');
          initSpollerBody(spollersBlock, false);
          spollersBlock.removeEventListener("click", setSpollerAction);
        }
      });
    } // Работа с контентом


    function initSpollerBody(spollersBlock) {
      let hideSpollerBody = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      const spollerTitles = spollersBlock.querySelectorAll('[data-spoller]');

      if (spollerTitles.length > 0) {
        spollerTitles.forEach(spollerTitle => {
          if (hideSpollerBody) {
            spollerTitle.removeAttribute('tabindex');

            if (!spollerTitle.classList.contains('_active')) {
              spollerTitle.nextElementSibling.hidden = true;
            }
          } else {
            spollerTitle.setAttribute('tabindex', '-1');
            spollerTitle.nextElementSibling.hidden = false;
          }
        });
      }
    }

    function setSpollerAction(e) {
      const el = e.target;

      if (el.hasAttribute('data-spoller') || el.closest('[data-spoller]')) {
        const spollerTitle = el.hasAttribute('data-spoller') ? el : el.closest('[data-spoller]');
        const spollersBlock = spollerTitle.closest('[data-spollers]');
        const oneSpoller = spollersBlock.hasAttribute('data-one-spoller') ? true : false;

        if (!spollersBlock.querySelectorAll('._slide').length) {
          if (oneSpoller && !spollerTitle.classList.contains('_active')) {
            hideSpollersBody(spollersBlock);
          }

          spollerTitle.classList.toggle('_active');

          _slideToggle(spollerTitle.nextElementSibling, 500);
        }

        e.preventDefault();
      }
    }

    function hideSpollersBody(spollersBlock) {
      const spollerActiveTitle = spollersBlock.querySelector('[data-spoller]._active');

      if (spollerActiveTitle) {
        spollerActiveTitle.classList.remove('_active');

        _slideUp(spollerActiveTitle.nextElementSibling, 500);
      }
    }
  } //=================
  //SlideToggle


  let _slideUp = function (target) {
    let duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 500;

    if (!target.classList.contains('_slide')) {
      target.classList.add('_slide');
      target.style.transitionProperty = 'height, margin, padding';
      target.style.transitionDuration = duration + 'ms';
      target.style.height = target.offsetHeight + 'px';
      target.offsetHeight;
      target.style.overflow = 'hidden';
      target.style.height = 0;
      target.style.paddingTop = 0;
      target.style.paddingBottom = 0;
      target.style.marginTop = 0;
      target.style.marginBottom = 0;
      window.setTimeout(() => {
        target.hidden = true;
        target.style.removeProperty('height');
        target.style.removeProperty('padding-top');
        target.style.removeProperty('padding-bottom');
        target.style.removeProperty('margin-top');
        target.style.removeProperty('margin-bottom');
        target.style.removeProperty('overflow');
        target.style.removeProperty('transition-duration');
        target.style.removeProperty('transition-property');
        target.classList.remove('_slide');
      }, duration);
    }
  };

  let _slideDown = function (target) {
    let duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 500;

    if (!target.classList.contains('_slide')) {
      target.classList.add('_slide');

      if (target.hidden) {
        target.hidden = false;
      }

      let height = target.offsetHeight;
      target.style.overflow = 'hidden';
      target.style.height = 0;
      target.style.paddingTop = 0;
      target.style.paddingBottom = 0;
      target.style.marginTop = 0;
      target.style.marginBottom = 0;
      target.offsetHeight;
      target.style.transitionProperty = "height, margin, padding";
      target.style.transitionDuration = duration + 'ms';
      target.style.height = height + 'px';
      target.style.removeProperty('padding-top');
      target.style.removeProperty('padding-bottom');
      target.style.removeProperty('margin-top');
      target.style.removeProperty('margin-bottom');
      window.setTimeout(() => {
        target.style.removeProperty('height');
        target.style.removeProperty('overflow');
        target.style.removeProperty('transition-duration');
        target.style.removeProperty('transition-property');
        target.classList.remove('_slide');
      }, duration);
    }
  };

  let _slideToggle = function (target) {
    let duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 500;

    if (target.hidden) {
      return _slideDown(target, duration);
    } else {
      return _slideUp(target, duration);
    }
  };
};

/* harmony default export */ __webpack_exports__["default"] = (spoller);

/***/ }),

/***/ "./src/js/modules/burger.js":
/*!**********************************!*\
  !*** ./src/js/modules/burger.js ***!
  \**********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
const burger = () => {// const btn = document.querySelector('.icon-menu'),
  // links = document.querySelectorAll('[data-goto]'),
  // menu = document.querySelector('.menu__body');
  // if(links.length > 0){
  //         links.forEach(item => {
  //             item.addEventListener('click',function(e){
  //                 btn.classList.remove('_active');
  //                 menu.classList.remove('_active');
  //                 document.body.classList.remove('_lock')
  //             })
  //         });
  // }
  // btn.addEventListener('click',function(e){
  //     btn.classList.toggle('_active');
  //     menu.classList.toggle('_active');
  //     document.body.classList.toggle('_lock');
  // })
};

/* harmony default export */ __webpack_exports__["default"] = (burger);

/***/ }),

/***/ "./src/js/modules/calc.js":
/*!********************************!*\
  !*** ./src/js/modules/calc.js ***!
  \********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
const calc = () => {
  const inputs = document.querySelectorAll('.main-block__input'); //All inputs

  const total = document.querySelector('.main-block__money span'); //how many is left 

  let totalCount = +document.querySelector('.main-block__money span').innerHTML; //totalCount - 100000

  const arrTotal = [];
  let spend = 0;
  let x = 0;
  inputs.forEach(input => {
    input.value = 0;
    checkInput();
    input.addEventListener('input', function (e) {
      reCount();
      checkInput();
    });
  });

  function checkInput() {
    inputs.forEach(input => {
      const price = +input.dataset.price;
      const value = input.value;
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

        if (!/-/g.test(Math.floor((Number(total.innerHTML) + Number(input.value * price)) / price))) {
          input.value = Math.floor((Number(total.innerHTML) + Number(input.value * price)) / price);
          reCount();
        }
      } else {
        input.removeAttribute('max');
        input.nextElementSibling.classList.remove('_disabled');
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
      ++input.value; // +1

      reCount();
      checkInput();

      if (Number(input.dataset.price) > +total.innerHTML) {
        target.classList.add('_disabled');
      }
    } else if (target.classList.contains("main-block__sell")) {
      --input.value;
      reCount();
      checkInput();

      if (Number(input.dataset.price) <= +total.innerHTML) {
        target.parentElement.querySelector(".main-block__buy").classList.remove('_disabled');
      }
    }
  }

  document.addEventListener('click', e => btns(e));
};

/* harmony default export */ __webpack_exports__["default"] = (calc);

/***/ }),

/***/ "./src/js/modules/header.js":
/*!**********************************!*\
  !*** ./src/js/modules/header.js ***!
  \**********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
const header = () => {};

/* harmony default export */ __webpack_exports__["default"] = (header);

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
    closeModal(e);
    setTimeout(() => {
      const block = document.querySelector('footer');
      const blockValue = block.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        //Заставляе скрол робити
        top: blockValue,
        //Свеху 
        behavior: "smooth"
      });
    }, 100);
    e.preventDefault();
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
/* harmony import */ var _libs_spoller__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./libs/spoller */ "./src/js/libs/spoller.js");
/* harmony import */ var _libs_slider__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./libs/slider */ "./src/js/libs/slider.js");
/* harmony import */ var _libs_dynamicAdaptive__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./libs/dynamicAdaptive */ "./src/js/libs/dynamicAdaptive.js");
/* harmony import */ var _services_default__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./services/default */ "./src/js/services/default.js");
/* harmony import */ var _modules_burger__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/burger */ "./src/js/modules/burger.js");
/* harmony import */ var _modules_header__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/header */ "./src/js/modules/header.js");
/* harmony import */ var _components_cards__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./components/cards */ "./src/js/components/cards.js");
/* harmony import */ var _modules_calc__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./modules/calc */ "./src/js/modules/calc.js");
/* harmony import */ var _modules_posPrice__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./modules/posPrice */ "./src/js/modules/posPrice.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./modules/modal */ "./src/js/modules/modal.js");









 // import getResource from './services/request'

window.onload = function () {
  (0,_components_cards__WEBPACK_IMPORTED_MODULE_6__["default"])();
  (0,_services_default__WEBPACK_IMPORTED_MODULE_3__["default"])();
  (0,_modules_burger__WEBPACK_IMPORTED_MODULE_4__["default"])();
  (0,_modules_header__WEBPACK_IMPORTED_MODULE_5__["default"])();
  (0,_modules_calc__WEBPACK_IMPORTED_MODULE_7__["default"])();
  (0,_modules_posPrice__WEBPACK_IMPORTED_MODULE_8__["default"])();
  (0,_modules_modal__WEBPACK_IMPORTED_MODULE_9__["default"])(); // spoller();
  // slider();
  // dynamicAdaptive();
};
}();
/******/ })()
;
//# sourceMappingURL=script.js.map