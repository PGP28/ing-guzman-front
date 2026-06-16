/* scrollTo.js — scroll con offset dinámico según viewport */

const BREATHING_SPACE = 40;

function getNavbarHeight() {
  return window.innerWidth <= 768 ? 62 : 84;
}

export function scrollToSection(selector) {
  const section = document.querySelector(selector);
  if (!section) return;

  const inner = section.querySelector('[class*="__inner"]') || section.firstElementChild;
  const target = inner || section;

  const rect = target.getBoundingClientRect();
  const top = rect.top + window.scrollY - getNavbarHeight() - BREATHING_SPACE;

  window.scrollTo({ top, behavior: 'smooth' });
}

export function handleNavClick(e, selector) {
  e.preventDefault();
  scrollToSection(selector);
}
