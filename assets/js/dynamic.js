$.addEventListener("scroll", () => {
  let scrollTop =
    window.pageYOffset !== undefined
      ? window.pageYOffset
      : (document.documentElement || document.body.parentNode || document.body)
          .scrollTop;

  let scrolled = Math.floor(scrollTop / 10);
});
