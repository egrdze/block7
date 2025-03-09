import { Grid, Pagination } from 'swiper/modules'
import '../scss/style.scss'
import Swiper from 'swiper'

document.addEventListener('DOMContentLoaded', function () {
  const swiper1 = new Swiper('.swiper-container', {
    pagination: {
      el: '.swiper-pagination',
      clickable: true
    },
    direction: 'horizontal',
    spaceBetween: 4,
    modules: [Grid, Pagination],
    breakpoints: {
      320: { slidesPerView: 4 },
      768: {
        grid: { rows: 3, fill: 'row' }
      },
      1440: {
        slidesPerView: 4,
        grid: { rows: 3, fill: 'row' }
      }
    }
  })

  const swiper2 = new Swiper('.swiper-container-box', {
    wrapperClass: 'swiper-wrapper-box',
    slideClass: 'swiper-slide-box',
    slidesOffsetAfter: 2,
    slidesOffsetBefore: 32,
    slidesPerView: 4,
    modules: [Grid, Pagination],
    spaceBetween: 10,
    loop: true,
    pagination: {
      el: '.swiper-pagination-box',
      clickable: true
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 10
      },
      768: {
        slidesPerView: 3,
        centeredSlides: true
      },
      1440: {
        slidesPerView: 'auto',
        spaceBetween: 3,
        loop: true
      }
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    }
  })

  // Боковое меню
  const burgerMenu = document.querySelector('.header__burger__menu')
  const sidebar = document.querySelector('.sidebar')
  let isSidebarOpen = false

  function toggleSidebar() {
    sidebar.style.left = isSidebarOpen ? '-100%' : '0'
    isSidebarOpen = !isSidebarOpen
  }

  // Открытие и закрытие бокового меню
  if (burgerMenu) {
    burgerMenu.addEventListener('click', function (event) {
      event.stopPropagation()
      toggleSidebar()
    })
  }

  // Функция "Показать все/Скрыть" для swiper-container
  const toggleBtn = document.getElementById('toggleBtn')
  const swiperContainer = document.querySelector('.swiper-container')
  let isExpanded = false

  // Инициализируем контейнер в закрытом состоянии при загрузке страницы
  if (swiperContainer) {
    swiperContainer.style.height = '200px'
    swiperContainer.style.overflow = 'hidden'
    swiper1.update() // Обновление Swiper после инициализации высоты
  }

  // Инициализируем кнопку в состоянии "Показать все"
  if (toggleBtn) {
    toggleBtn.innerHTML = `<img class="show_button" src="../img/expand.svg" alt="show_all"> Показать все`

    toggleBtn.addEventListener('click', function () {
      if (swiperContainer) {
        if (!isExpanded) {
          swiperContainer.style.height = 'auto'
          toggleBtn.innerHTML = `<img class="collapse_button" src="../img/collapse.svg" alt="hide_all"> Скрыть`
        } else {
          swiperContainer.style.height = '200px'
          toggleBtn.innerHTML = `<img class="show_button" src="../img/expand.svg" alt="show_all"> Показать все`
        }
        isExpanded = !isExpanded
        swiper1.update() // Обновляем Swiper после изменения высоты
      }
    })
  }

  document.addEventListener('click', function (event) {
    if (
      isSidebarOpen &&
      !sidebar.contains(event.target) &&
      event.target !== burgerMenu
    ) {
      toggleSidebar()
    }

    // Модальные окна
    const modalOverlayFeedback = document.getElementById('modalOverlayFeedback')
    const modalOverlayCall = document.getElementById('modalOverlayCall')
    const closeModalBtnFeedback = document.getElementById(
      'closeModalBtnFeedback'
    )
    const closeModalBtnCall = document.getElementById('closeModalBtnCall')
    const openModalBtnFeedback = document.querySelector('.open-modal-btn')
    const openModalBtnCall = document.querySelector('.header__container_repair')
    const openModalBtnStatus = document.querySelector(
      '.header__container_status'
    )

    // Функция для открытия модального окна
    function openModal(modal) {
      if (modal) {
        modal.classList.add('show')
      }
    }

    // Функция для закрытия модального окна
    function closeModal(modal) {
      if (modal) {
        modal.classList.remove('show')
      }
    }

    // Открытие модальных окон по клику на кнопки
    if (openModalBtnFeedback) {
      openModalBtnFeedback.addEventListener('click', function () {
        openModal(modalOverlayFeedback)
      })
    }

    if (openModalBtnCall) {
      openModalBtnCall.addEventListener('click', function () {
        openModal(modalOverlayFeedback)
      })
    }

    if (openModalBtnStatus) {
      openModalBtnStatus.addEventListener('click', function () {
        openModal(modalOverlayCall)
      })
    }

    // Закрытие модальных окон по клику на кнопку закрытия
    if (closeModalBtnFeedback) {
      closeModalBtnFeedback.addEventListener('click', function () {
        closeModal(modalOverlayCall)
      })
    }

    if (closeModalBtnCall) {
      closeModalBtnCall.addEventListener('click', function () {
        closeModal(modalOverlayCall)
      })
    }

    // Закрытие модальных окон по клику вне контента
    ;[modalOverlayFeedback, modalOverlayCall].forEach((modal) => {
      if (modal) {
        modal.addEventListener('click', function (event) {
          if (event.target === modal) {
            closeModal(modal)
          }
        })
      }
    })
  })
})
