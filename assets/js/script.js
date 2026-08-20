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

  if (!button) return;

  button.addEventListener('click', () => {
    const willOpen = !card.classList.contains('is-open');

    professionCards.forEach((otherCard) => {
      const otherButton = otherCard.querySelector('.card-toggle');
      const otherLabel = otherButton?.querySelector('.toggle-label');
      const otherIcon = otherButton?.querySelector('.toggle-icon');
      const otherDetails = otherCard.querySelector('.card-details');

      otherCard.classList.remove('is-open');
      otherButton?.setAttribute('aria-expanded', 'false');
      otherDetails?.setAttribute('aria-hidden', 'true');
      if (otherLabel) otherLabel.textContent = 'Подробнее о профессии';
      if (otherIcon) otherIcon.textContent = '+';
    });

    if (willOpen) {
      card.classList.add('is-open');
      button.setAttribute('aria-expanded', 'true');
      details?.setAttribute('aria-hidden', 'false');
      if (label) label.textContent = 'Скрыть подробности';
      if (icon) icon.textContent = '−';
    }
  });
});

const revealItems = document.querySelectorAll('.reveal');

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
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
