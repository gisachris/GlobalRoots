import React from 'react';
export const scrollToSection = (elementId: string) => {
  const element = document.getElementById(elementId);
  if (element) {
    window.scrollTo({
      behavior: 'smooth',
      top: element.offsetTop - 80 // Offset for header
    });
  }
};