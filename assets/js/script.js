const page = document.documentElement;
const menuButton = document.querySelector('.menu-button');
const navigation = document.querySelector('.main-nav');
const professionCards = [...document.querySelectorAll('.profession-card')];

const closeMenu = () => {
  if (!menuButton || !navigation) return;
  menuButton.setAttribute('aria-expanded', 'false');
  navigation.classList.remove('is-open');
};

if (menuButton && navigation) {
  menuButton.addEventListener('click', () => {
    const willOpen = menuButton.getAttribute('aria-expanded') !== 'true';
    menuButton.setAttribute('aria-expanded', String(willOpen));
    navigation.classList.toggle('is-open', willOpen);
  });

  navigation.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeMenu);
  });

  document.addEventListener('click', (event) => {
    if (!navigation.classList.contains('is-open')) return;
    if (navigation.contains(event.target) || menuButton.contains(event.target)) return;
    closeMenu();
  });
}

professionCards.forEach((card) => {
  const button = card.querySelector('.card-toggle');
  const label = button?.querySelector('.toggle-label');
  const icon = button?.querySelector('.toggle-icon');
  const details = card.querySelector('.card-details');
  const detailsInner = card.querySelector('.card-details-inner');

  if (!button) return;

  button.addEventListener('click', (e) => {
    e.stopPropagation();

    const willOpen = !card.classList.contains('is-open');

    // Костыль от «микролага»: фиксируем видимую высоту панели ДО снятия
    // .is-open. Если мерить offsetHeight после снятия, панель на кадр
    // «распрямляется» на полную высоту контента — и мелькает весь текст.
    if (!willOpen && details) {
      details.style.maxHeight = `${details.offsetHeight}px`;
      void details.offsetHeight; // принудительный reflow перед снятием класса
    }

    // Переключаем карточку, не закрывая другие
    card.classList.toggle('is-open', willOpen);
    button.setAttribute('aria-expanded', String(willOpen));
    details?.setAttribute('aria-hidden', String(!willOpen));

    if (label) label.textContent = willOpen ? 'Скрыть подробности' : 'Подробнее о профессии';
    if (icon) icon.textContent = willOpen ? '−' : '+';

    if (!details || !detailsInner) return;

    if (willOpen) {
      // Плавно раскрываем до фактической высоты контента
      details.style.maxHeight = `${detailsInner.scrollHeight}px`;
    } else {
      // Схлопываем от «замороженной» высоты к нулю
      details.style.maxHeight = '0px';
      detailsInner.scrollTop = 0; // сбрасываем скролл при закрытии
    }
  });
});

// На случай ресайза пересчитываем высоту открытой панели,
// чтобы inline max-height не устаревал
let resizeTimer;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    document.querySelectorAll('.profession-card.is-open').forEach((openCard) => {
      const d = openCard.querySelector('.card-details');
      const di = openCard.querySelector('.card-details-inner');
      if (d && di) d.style.maxHeight = `${di.scrollHeight}px`;
    });
  }, 150);
});

const revealItems = document.querySelectorAll('.reveal');

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        } else {
          entry.target.classList.remove('is-visible'); 
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -6% 0px' }
  );

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add('is-visible'));
}

window.addEventListener(
  'pointermove',
  (event) => {
    page.style.setProperty('--cursor-x', `${event.clientX}px`);
    page.style.setProperty('--cursor-y', `${event.clientY}px`);
  },
  { passive: true }
);

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeMenu();
});
