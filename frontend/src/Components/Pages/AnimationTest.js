/* eslint-disable no-plusplus */
import anime from 'animejs/lib/anime.es';

const AnimationPage = () => {
    backgroundAnimation();  
  };

const main = document.querySelector('main');

function backgroundAnimation (){
    const divAdd=document.createElement('div')
    divAdd.className='bg'
    main.appendChild(divAdd)
    const bg = document.querySelector('.bg');
    console.log(bg);
    const title = document.querySelector('.title');
    const fragment = document.createDocumentFragment();
    const grid = [20, 20];
    const col = grid[0];
    const row = grid[1];
    const field = col * row;
    
    for (let i = 0; i < field; i++) {
      const div = document.createElement('div');
      fragment.appendChild(div);
      div.className = 'el';
    }
    
    bg.appendChild(fragment);
    
    const BackgroundAnimation = anime.timeline({
      targets: '.el',
      duration: 1000,
      delay: anime.stagger(0, {grid, from: 'first'}),
      loop: true,
      easing: 'easeInBack',
    })
    .add({
      scale: .5,
      backgroundColor: '#ff08e8',
      delay: anime.stagger(100, {grid, from: 'last'}),
    })
    .add({
      translateX: () => anime.random(-1000, 1000),
      translateY: () => anime.random(-1000, 1000),
      scale: .25,
      delay: anime.stagger(150, {grid, from: 'last'}),
    })
    .add({
      targets: title,
      opacity: 1,
      duration: 10,
    })
    .add({
      translateX: 0,
      translateY: 0,
      scale: 1,
      borderRadius: 0,
      backgroundColor: '#fff',
      duration: 2500,
      delay: anime.stagger(150, {grid, from: 'first'}),
      endDelay: 1500,
    });
    
    BackgroundAnimation.play();
   
}   

export default AnimationPage


