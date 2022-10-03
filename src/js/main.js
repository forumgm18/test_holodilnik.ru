
const menuListScroll = new PerfectScrollbar('#menuListScroll')
const menuTabsScroll = new PerfectScrollbar('#menuTabsScroll')

const mobileWidth = 1024; // точка переключения в таблетку/мобилку

const toggleCatalog = (e) => {
  let burger = document.getElementById('burger')
  let menuCatalog = document.getElementById('menuCatalog')
  let header = document.getElementById('header')
  if (document.documentElement.clientWidth < mobileWidth) {
    header.scrollIntoView(true)
  }
  setTimeout(() => {
    let h = header.getBoundingClientRect()
    let menuTop = h.y + h.height
    menuCatalog.style.top = menuTop + 'px'
    menuCatalog.style.height = document.documentElement.clientHeight - menuTop + 'px'
    menuCatalog.classList.toggle('open')
    if (document.documentElement.clientWidth < mobileWidth) {
      closeMenuTab()
    }
    btnCatalog.classList.toggle('open')
    burger.classList.toggle('open')
  
    document.body.classList.toggle('body-scroll-block')
    if (menuCatalog.classList.contains('open') ) { 
      menuListScroll.update()
    }

  }, 200)
}


const bodyClick = (e) => {
  // debugger
  if (e.target.closest('.header-dropdown')) return
  if (e.target.closest('.header-search')) return
  const hdSrOpen = document.querySelector('.header-search-results.open')
  if (hdSrOpen) hdSrOpen.classList.remove('open')
  const hdOpen = document.querySelectorAll('.header-dropdown.open')
  if (hdOpen) {
    hdOpen.forEach(el => el.classList.remove('open'))
  }

}
const headerDropdownClick = (e) => {
  const hdOpen = document.querySelectorAll('.header-dropdown.open')
  const isOpen = e.currentTarget.classList.contains('open')
  if (hdOpen) {
    hdOpen.forEach(el => el.classList.remove('open'))
  }
  if (!isOpen) {
    e.currentTarget.classList.add('open')
  }

}

const closeMenuTab = (name = 'ALL') => {
  let selectorName = name === 'ALL' ? '.active' : `[data-tab="${name}"]`
  const activeItems = menuCatalog ? menuCatalog.querySelectorAll(selectorName) : null
  if (activeItems) activeItems.forEach(el => el.classList.remove('active'))
}

const selectMenuTab = (e) => {
  if (document.documentElement.clientWidth < mobileWidth) return
  let tabName = e.target.dataset.tab
  if (!tabName) return
  let currentCat = menuCategories.querySelector(`[data-tab="${tabName}"]`)
  if (currentCat && currentCat.classList.contains('active')) return
  closeMenuTab() // Закрываем все вкладки
  currentCat.classList.add('active') // Активируем категорию
  // Ищем и активируем Tab категории
  const currentTab = menuTabs.querySelector(`[data-tab="${tabName}"]`)
  if (currentTab) currentTab.classList.add('active')
  menuTabsScroll.update()
}


let menuMobileItemClick = (e) => {
  let tabName = e.currentTarget.dataset.tab
  let currentCat = menuCatalog.querySelector(`[data-tab="${tabName}"]`)
  if (currentCat && currentCat.classList.contains('active')) return
  currentCat.classList.add('active') // Активируем категорию
  // Ищем и активируем Tab категории
  const currentTab = menuCatalog.querySelector(`[data-target="${tabName}"]`)
  console.log('currentTab: ', currentTab)
  if (currentTab) {
    let h = header.getBoundingClientRect()
    let menuTop = h.y + h.height
    currentTab.style.top = menuTop + 'px'
    currentTab.style.height = document.documentElement.clientHeight - menuTop + 'px'
    currentTab.classList.add('active')
  }

}
let menuMobileGoBackClick = (e) => {
  let tabName = e.currentTarget.dataset.goBack
  let currentCat = menuCatalog.querySelectorAll(`[data-tab="${tabName}"]`)
  if (currentCat ) {
    currentCat.forEach(el => el.classList.remove('active'))
  }
  let currentTab = menuCatalog.querySelectorAll(`[data-target="${tabName}"]`)
  if (currentTab ) {
    currentTab.forEach(el => el.classList.remove('active'))
  }

}

const headerSearchInputChange = (e) => {
  const headerSRes = document.getElementById('headerSRes')
  if (e.currentTarget.value.length > 2) {
    headerSRes.classList.add('open')
  } else {
    headerSRes.classList.remove('open')
  }
}
const headerSearchResToggle = (e) => {
  const headerSRes = document.getElementById('headerSRes')
  if (headerSRes) {
    headerSRes.classList.toggle('open')
  }
}


const btnCatalog = document.getElementById('btn-catalog')
const headerDropdown = document.querySelectorAll('.header-dropdown')
const menuList = document.getElementById('menuList')
const menuCategories = document.getElementById('menuCategories')
const categoriesList = menuCategories ? menuCategories.querySelectorAll('.menu-caterories-item') : null
const menuTabs = document.getElementById('menuTabs')
const menuCatalog = document.getElementById('menuCatalog')
// Коллекция пунктов меню
const menuMobileItems = menuCatalog ? menuCatalog.querySelectorAll('.menu-link.forward') : null
const menuMobileGoBack = menuCatalog ? menuCatalog.querySelectorAll('.menu-link.go-back') : null
const headerSearchInput = document.getElementById('headerSInp')
const btnSearch = document.getElementById('btnSearch')

if(headerSearchInput) {
  headerSearchInput.addEventListener('change', headerSearchInputChange)
  headerSearchInput.addEventListener('keyup', headerSearchInputChange)
  headerSearchInput.addEventListener('focus', headerSearchInputChange)
}
if(btnSearch) {
  btnSearch.addEventListener('click', headerSearchResToggle)
}

document.addEventListener('click', bodyClick)
if (btnCatalog) {
  btnCatalog.addEventListener('click', toggleCatalog)
}

if (headerDropdown) {
    headerDropdown.forEach(el => el.addEventListener('click', headerDropdownClick) )
}

if (categoriesList) {
  categoriesList.forEach(el => el.addEventListener('mouseenter', selectMenuTab))
}
if (menuMobileItems) {
  menuMobileItems.forEach(el => el.addEventListener('click', menuMobileItemClick))
}
if (menuMobileGoBack) {
  menuMobileGoBack.forEach(el => el.addEventListener('click', menuMobileGoBackClick))
}