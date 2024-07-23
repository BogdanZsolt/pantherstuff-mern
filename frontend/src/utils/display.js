const isMobile = () => {
  if (window.innerWidth <= 991.98) {
    return true;
  } else {
    return false;
  }
};

export { isMobile };
