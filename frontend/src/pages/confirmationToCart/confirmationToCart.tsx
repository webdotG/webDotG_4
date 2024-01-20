import { Link } from "react-router-dom"
import Header from "../../components/header/header"
import Footer from "../../components/footer/footer"
import style from './confirmation.module.scss'
import JSConfetti from 'js-confetti';
import { useEffect } from "react";


// interface ConfettiOptions {
//   angle?: number; // Угол, под которым конфетти будет двигаться (в градусах)
//   spread?: number; // Разброс конфетти (угол разброса)
//   startVelocity?: number; // Начальная скорость движения конфетти
//   decay?: number; // Скорость затухания движения конфетти (от 0 до 1)
//   gravity?: number; // Гравитация, влияющая на падение конфетти
//   ticks?: number; // Количество тиков анимации конфетти
//   zIndex?: number; // Индекс z для управления слоем конфетти на странице
//   colors?: string[]; // Массив цветов для конфетти
//   image?: string; // URL изображения для использования в качестве конфетти
//   size?: ConfettiSize; // Размер конфетти (small, medium, или large)
//   origin?: ConfettiOrigin; // Начальное положение конфетти
//   scalar?: number; // Множитель размера конфетти
//   shapes?: ConfettiShape[]; // Массив форм для конфетти (circle, square, triangle)
//   particleCount?: number; // Количество частиц конфетти
// }
// type ConfettiSize = 'small' | 'medium' | 'large';
// type ConfettiOrigin = { x: number; y: number };
// type ConfettiShape = 'circle' | 'square' | 'triangle';

interface IAddConfettiConfig {
  confettiRadius?: number;
  confettiNumber?: number;
  confettiColors?: string[];
  emojis?: string[];
  emojiSize?: number;
  particleCount?: number,
  spread?: number,
  origin?: { y: number }
}


function ConfirmationToCart() {

  useEffect(() => {
    const jsConfetti = new JSConfetti();
    function fire(particleRatio: number, opts: IAddConfettiConfig) {
      jsConfetti.addConfetti({
        particleCount: Math.floor(300 * particleRatio),
        spread: 70,
        origin: { y: -1 },
        ...opts,
      });
    }
    fire(5, {} as IAddConfettiConfig); 
    setTimeout(() => {
      jsConfetti.clearCanvas();
    }, 5000);
  }, []);

  return (
    <div className={style['page-container']}>

      <Header />
      
      <div className={style['confirmation-wrapper']}>
        <h2 className={style['confirmation-title']}>вы добавили товары в корзину</h2>
        <ul className={style['confirmation-list-link']}>
          <li>
            <Link to='/cart'>
              <p className={style['confirmation-link']}>подтвердить и оформить заказ</p>
            </Link>
          </li>
          <li>
            <Link to='/'>
              <p className={style['home-link']}>вернуться на главную</p>
            </Link>
          </li>
        </ul>
      </div>
      <canvas id="confettiCanvas"></canvas>  
      <Footer />
      
    </div>
  )
}

export default ConfirmationToCart
