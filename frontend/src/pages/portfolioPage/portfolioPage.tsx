
import Footer from '../../components/footer/footer'
import Header from '../../components/header/header'
import ForCoders from '../../components/forCoders/forCoders'
import style from './portfolioPage.module.scss'
import sixSities from '../../img/six.jpg'
import Rental from '../../img/rental.jpg'
import Git from '../../img/git.jpg'

function PortfolioPage() {

  return (
    <div className={style['page-container']}>
      <Header />
      <ForCoders />
      <section className={style["portfolio"]}>
        <ul className={style["portfolio-list"]}>
          
        <li className={style["portfolio-item"]}>
            <h3 className={style["portfolio-item-title"]}>Six site</h3>
            <img src={sixSities} className={style['portfolio-item-img']} width='250px' height='150px' alt='six sities' />
            <p className={style["portfolio-item-about"]}>Сайт бронирования отелей</p>
            <h4 className={style["portfolio-task-title"]}>Реализованные задачи :</h4>
            <ul className={style['task-list']}>
              <li className={style['task-item']}>
               - каталог номеров и апартаментов 
              </li>
              <li className={style['task-item']}>
               - регистрация и логин 
              </li>
              <li className={style['task-item']}>
               - реализована сортировка (по городам и рейтингу)
              </li>
              <li className={style['task-item']}>
               - бронирование номеров по дате и количеству постояльцев
              </li>
              <li className={style['task-item']}>
               - возможность просмотра номеров на карте
              </li>
              <li className={style['task-item']}>
               - оставление комментариев и рейтинга для зарегистрированных пользователей
              </li>
            </ul>
            <a  className={style['task-link']}
             href='https://webdotg.github.io/six_citise'>открыть проект</a>
          </li>

          <li className={style["portfolio-item"]}>
            <h3 className={style["portfolio-item-title"]}>Rental</h3>
            <img src={Rental} className={style['portfolio-item-img']} width='250px' height='150px' alt='six sities' />
            <p className={style["portfolio-item-about"]}>Сайт аренды строительной техники</p>
            <h4 className={style["portfolio-task-title"]}>Реализованные задачи :</h4>
            <ul className={style['task-list']}>
              <li className={style['task-item']}>
               - создан каталог товаров
              </li>
              <li className={style['task-item']}>
               - реализована сортировка (по алфавиту, цене, популярности)
              </li>
              <li className={style['task-item']}>
               - возможность добавления товара в корзину
              </li>
            </ul>
            <a  className={style['task-link']}
             href='https://webdotg.github.io/Rental/'>открыть проект</a>
          </li>
          
          <li className={style["portfolio-item"]}>
            <h3 className={style["portfolio-item-title"]}>GitHub search</h3>
            <img src={Git} className={style['portfolio-item-img']} width='250px' height='150px' alt='six sities' />
            <p className={style["portfolio-item-about"]}>Поиск репозиториев на GitHub</p>
            <p className={style["portfolio-item-about"]}>создан как компонент для проектов </p>
            <h4 className={style["portfolio-task-title"]}>Реализованные задачи :</h4>
            <ul className={style['task-list']}>
              <li className={style['task-item']}>
               - поиск репозиториев
              </li>
              <li className={style['task-item']}>
               - добавление в избранное
              </li>
            </ul>
            <a  className={style['task-link']}
             href='https://webdotg.github.io/favorite_add/'>открыть проект</a>
          </li>

        </ul>
      </section>
      <Footer />
    </div>
  )
}

export default PortfolioPage