window.addEventListener('DOMContentLoaded', () => {

  const card = document.querySelector('.card');
  const container = document.querySelector('.container');

  //Render insides of out card
  const title = document.querySelector('.title');
  const descr = document.querySelector('.descr');
  const price = document.querySelector('.price');
  const priceold = document.querySelector('.priceold');
  const quantity = document.querySelector('.quantity');

  const fullImage = document.querySelector('.full-image');
  const firstView = document.querySelector('.first-view');
  const secondView = document.querySelector('.second-view');

  const basketIcon = document.querySelector('.basket-icon');
  const basketCircle = document.querySelector('.basket-circle');
  const bucket = document.querySelector('.bucket');

  const alert = document.querySelector('.alert');
  
  //Moving animation
  container.addEventListener('mousemove', (event) => {
    let xAxis = (window.innerWidth / 2 - event.pageX) / 10;
    let yAxis = (window.innerHeight / 2 - event.pageY) / 45;
  
    card.style.transform = `rotateX(${yAxis}deg) rotateY(${xAxis}deg)`;
  });
  
  //Animate In
  container.addEventListener('mouseenter', () => {
    card.style.transition = '0.2s';

    fullImage.style.transform = 'TranslateZ(10px)';
    basketIcon.style.transform = 'TranslateZ(20px)';
    alert.style.transform = 'TranslateZ(11px)';

    firstView.style.transform = 'TranslateZ(3px)';
    secondView.style.transform = 'TranslateZ(3px)';

    title.style.transform = 'TranslateZ(20px)';
    descr.style.transform = 'TranslateZ(10px)';
    price.style.transform = 'TranslateZ(10px)';
    priceold.style.transform = 'TranslateZ(10px)';
    quantity.style.transform = 'TranslateZ(10px)';

    bucket.style.transform = 'TranslateZ(10px)';
  });
  
  //Animate Out
  container.addEventListener('mouseleave', (event) => {
    card.style.transition = 'all 0.5s ease';
    card.style.transform = `rotateX(0deg) rotateY(0deg)`;
  });

  //Get Data from server
  let imagesUlr;

  fetch('https://store.tildacdn.com/api/tgetproduct/')
    .then((response) => {
    return response.json();
    })
    .then((data) => {
      title.insertAdjacentText('afterbegin', data.title);
      descr.insertAdjacentText('afterbegin', data.descr);
      price.insertAdjacentText('afterbegin', data.price + '$' + ' discount!');
      priceold.insertAdjacentText('afterbegin', data.priceold + '$');
      quantity.insertAdjacentText('afterbegin', data.quantity + ' p.l.');
  
      //в json images = строка, а не массив
      console.log(data.images);
      imagesUlr = JSON.parse(data.images);
      console.log(imagesUlr[0].img);
      fullImage.setAttribute('src', `${imagesUlr[1].img}`);
  
      firstView.setAttribute('src', `${imagesUlr[1].img}`);
      secondView.setAttribute('src', `${imagesUlr[0].img}`);
    });

  //Sliders
  secondView.addEventListener('click', () => {
    secondView.classList.add('active');
    firstView.classList.remove('active');
    fullImage.setAttribute('src', `${imagesUlr[0].img}`);
  });
  firstView.addEventListener('click', () => {
    firstView.classList.add('active');
    secondView.classList.remove('active');
    fullImage.setAttribute('src', `${imagesUlr[1].img}`);
  });

  //Add to Cart
  clicked = 0;

  bucket.addEventListener('click', () => {
    clicked++;

    if (clicked > 1) {
      alert.innerText = 'Already in Cart!';
    }

    basketCircle.style.border = '5px solid #ebf831';
    bucket.style.backgroundColor = '#dfdfdfdb';

    alert.classList.add('show');
    setTimeout(closeAlert, 2000);

    function closeAlert() {
      alert.classList.remove('show');
    }
  });
});




