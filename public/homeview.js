const ball = document.querySelector('.toggle');
const items = document.querySelectorAll(
  'body,#app,.navbar-container,.logo-container,.home,.discover-container,.toggle-ball',
);

ball.addEventListener('click', () => {
  items.forEach((item) => {
    item.classList.toggle('active');
  });
  ball.classList.toggle('active');
});

const arrows = document.querySelectorAll('.arrow');
const movieLists = document.querySelectorAll('.home ul');
arrows.forEach((arrow, i) => {
  const numberOfMoviesOnPage = 6;
  let clickCounter = 0;
  arrow.addEventListener('click', () => {
    const ratio = Math.floor(window.innerWidth / 270);
    // eslint-disable-next-line no-plusplus
    clickCounter++;
    if (21 - (numberOfMoviesOnPage * clickCounter) + (numberOfMoviesOnPage - ratio) >= 0) {
      movieLists[i].style.transform = `translateX(${
        movieLists[i].computedStyleMap().get('transform')[0].x.value - 1230
      }px)`;
    } else {
      movieLists[i].style.transform = 'translateX(0)';
      clickCounter = 0;
    }
  });
});
