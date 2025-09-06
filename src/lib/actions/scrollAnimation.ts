export function scrollAnimation(node: HTMLElement) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        node.classList.add('animate-in');
      }
    });
  });

  observer.observe(node);

  return {
    destroy() {
      observer.unobserve(node);
    },
  };
}