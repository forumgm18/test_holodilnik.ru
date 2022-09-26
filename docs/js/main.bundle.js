(self["webpackChunkwebpack5_template"] = self["webpackChunkwebpack5_template"] || []).push([[179],{

/***/ 579:
/***/ ((__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony import */ var _js_main__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(927);
/* harmony import */ var _js_main__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_js_main__WEBPACK_IMPORTED_MODULE_0__);
// Импортируем стили
 // import PerfectScrollbar from 'perfect-scrollbar'
// const menuListScroll = new PerfectScrollbar('#menuListScroll')
// const menuTabsScroll = new PerfectScrollbar('#menuTabsScroll')



/***/ }),

/***/ 927:
/***/ (() => {

var menuListScroll = new PerfectScrollbar('#menuListScroll');
var menuTabsScroll = new PerfectScrollbar('#menuTabsScroll');
var mobileWidth = 1024; // точка переключения в таблетку/мобилку

var toggleCatalog = function toggleCatalog(e) {
  e.stopImmediatePropagation();
  var burger = document.getElementById('burger');
  var menuCatalog = document.getElementById('menuCatalog');
  var header = document.getElementById('header');

  if (document.documentElement.clientWidth < mobileWidth) {
    header.scrollIntoView(true);
  }

  setTimeout(function () {
    var h = header.getBoundingClientRect();
    var menuTop = h.y + h.height;
    menuCatalog.style.top = menuTop + 'px';
    menuCatalog.style.height = document.documentElement.clientHeight - menuTop + 'px';
    menuCatalog.classList.toggle('open');

    if (document.documentElement.clientWidth < mobileWidth) {
      closeMenuTab();
    }

    btnCatalog.classList.toggle('open');
    burger.classList.toggle('open');
    document.body.classList.toggle('body-scroll-block');

    if (menuCatalog.classList.contains('open')) {
      menuListScroll.update();
    }
  }, 200);
};

var bodyClick = function bodyClick(e) {
  var hdOpen = document.querySelectorAll('.header-dropdown.open');

  if (hdOpen) {
    hdOpen.forEach(function (el) {
      return el.classList.remove('open');
    });
  }
};

var headerDropdownClick = function headerDropdownClick(e) {
  e.stopImmediatePropagation();
  var hdOpen = document.querySelectorAll('.header-dropdown.open');
  var isOpen = e.currentTarget.classList.contains('open');

  if (hdOpen) {
    hdOpen.forEach(function (el) {
      return el.classList.remove('open');
    });
  }

  if (!isOpen) {
    e.currentTarget.classList.add('open');
  }
};

var closeMenuTab = function closeMenuTab() {
  var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'ALL';
  // debugger
  var selectorName = name === 'ALL' ? '.active' : "[data-tab=\"".concat(name, "\"]");
  console.log('selectorName: ', selectorName); // let menuCatalog = document.getElementById('menuCatalog')

  var activeItems = menuCatalog ? menuCatalog.querySelectorAll(selectorName) : null;
  if (activeItems) activeItems.forEach(function (el) {
    return el.classList.remove('active');
  });
};

var selectMenuTab = function selectMenuTab(e) {
  // function selectMenuTab(e) {
  if (document.documentElement.clientWidth < mobileWidth) return;
  var tabName = e.target.dataset.tab;
  if (!tabName) return;
  var currentCat = menuCategories.querySelector("[data-tab=\"".concat(tabName, "\"]"));
  if (currentCat && currentCat.classList.contains('active')) return;
  closeMenuTab(); // Закрываем все вкладки

  currentCat.classList.add('active'); // Активируем категорию
  // Ищем и активируем Tab категории

  var currentTab = menuTabs.querySelector("[data-tab=\"".concat(tabName, "\"]"));
  if (currentTab) currentTab.classList.add('active');
  menuTabsScroll.update();
};

var menuMobileItemClick = function menuMobileItemClick(e) {
  var tabName = e.currentTarget.dataset.tab; // debugger

  var currentCat = menuCatalog.querySelector("[data-tab=\"".concat(tabName, "\"]"));
  if (currentCat && currentCat.classList.contains('active')) return; // closeMenuTab() // Закрываем все вкладки

  console.log('currentCat: ', currentCat);
  currentCat.classList.add('active'); // Активируем категорию
  // Ищем и активируем Tab категории

  var currentTab = menuCatalog.querySelector("[data-target=\"".concat(tabName, "\"]"));
  console.log('currentTab: ', currentTab);

  if (currentTab) {
    var h = header.getBoundingClientRect();
    var menuTop = h.y + h.height;
    currentTab.style.top = menuTop + 'px';
    currentTab.style.height = document.documentElement.clientHeight - menuTop + 'px';
    currentTab.classList.add('active');
  }
};

var menuMobileGoBackClick = function menuMobileGoBackClick(e) {
  var tabName = e.currentTarget.dataset.goBack;
  var currentCat = menuCatalog.querySelectorAll("[data-tab=\"".concat(tabName, "\"]"));

  if (currentCat) {
    currentCat.forEach(function (el) {
      return el.classList.remove('active');
    });
  }

  var currentTab = menuCatalog.querySelectorAll("[data-target=\"".concat(tabName, "\"]"));

  if (currentTab) {
    currentTab.forEach(function (el) {
      return el.classList.remove('active');
    });
  }
};

var headerSearchInputChange = function headerSearchInputChange(e) {
  var headerSRes = document.getElementById('headerSRes');
  console.log('e.currentTarget.value.length', e.currentTarget.value.length);

  if (e.currentTarget.value.length > 2) {
    headerSRes.classList.add('open');
  } else {
    headerSRes.classList.remove('open');
  }
};

var headerSearchResToggle = function headerSearchResToggle(e) {
  e.stopImmediatePropagation();
  var headerSRes = document.getElementById('headerSRes');

  if (headerSRes) {
    headerSRes.classList.toggle('open');
  }
};

var btnCatalog = document.getElementById('btn-catalog');
var headerDropdown = document.querySelectorAll('.header-dropdown');
var menuList = document.getElementById('menuList');
var menuCategories = document.getElementById('menuCategories');
var categoriesList = menuCategories ? menuCategories.querySelectorAll('.menu-caterories-item') : null;
var menuTabs = document.getElementById('menuTabs');
var menuCatalog = document.getElementById('menuCatalog'); // Коллекция пунктов меню

var menuMobileItems = menuCatalog ? menuCatalog.querySelectorAll('.menu-link.forward') : null;
var menuMobileGoBack = menuCatalog ? menuCatalog.querySelectorAll('.menu-link.go-back') : null;
var headerSearchInput = document.getElementById('headerSInp');
var btnSearch = document.getElementById('btnSearch');

if (headerSearchInput) {
  headerSearchInput.addEventListener('change', headerSearchInputChange);
  headerSearchInput.addEventListener('keyup', headerSearchInputChange);
}

if (btnSearch) {
  btnSearch.addEventListener('click', headerSearchResToggle);
}

document.addEventListener('click', bodyClick);

if (btnCatalog) {
  btnCatalog.addEventListener('click', toggleCatalog);
}

if (headerDropdown) {
  headerDropdown.forEach(function (el) {
    return el.addEventListener('click', headerDropdownClick);
  });
}

if (categoriesList) {
  categoriesList.forEach(function (el) {
    return el.addEventListener('mouseenter', selectMenuTab);
  });
}

if (menuMobileItems) {
  menuMobileItems.forEach(function (el) {
    return el.addEventListener('click', menuMobileItemClick);
  });
}

if (menuMobileGoBack) {
  menuMobileGoBack.forEach(function (el) {
    return el.addEventListener('click', menuMobileGoBackClick);
  });
}

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__(579));
/******/ }
]);