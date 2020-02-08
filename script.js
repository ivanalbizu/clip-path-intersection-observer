const buildThreshold = steps => Array(steps + 1)
  .fill(0)
  .map((_, index) => index / steps || 0)

const ioTrapezoidHandler = entries => {
  for (let entry of entries) {
    if (entry.isIntersecting) {
      entry.target.style.setProperty('--x-trapezoid', `${entry.intersectionRatio * 100}%`);
    }
  }
}
const ioBgcolorHandler = entries => {
  for (let entry of entries) {
    if (entry.intersectionRatio > 0.2) {
      document.body.style.backgroundColor = `rgb(${entry.target.dataset.darkvibrant})`;
    }
  }
}

const ioConfigTrapezoid = {
  root: null,
  rootMargin: '0px',
  threshold: buildThreshold(150)
};
const ioConfigBg = {
  root: null,
  rootMargin: '0px',
  threshold: .2
};


window.onload = () => {

  const imgs = document.querySelectorAll('.drop-shadow img');
  const trapezoids = document.querySelectorAll(".clip-path-trapezoid");

  const ioTrapezoid = new IntersectionObserver(ioTrapezoidHandler, ioConfigTrapezoid);
  const ioBgcolor = new IntersectionObserver(ioBgcolorHandler, ioConfigBg);

  imgs.forEach(img => {
    const vibrant = new Vibrant(img);
    const swatches = vibrant.swatches()
    for (let swatch in swatches)
      if (swatches.hasOwnProperty(swatch) && swatches[swatch])
        img.setAttribute(`data-${swatch}`, swatches[swatch].getRgb());

    ioBgcolor.observe(img);
  });

  [].forEach.call(trapezoids, trapezoid => ioTrapezoid.observe(trapezoid));
};