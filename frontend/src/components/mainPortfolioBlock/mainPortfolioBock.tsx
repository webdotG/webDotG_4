import style from './mainPortfoliBlock.module.scss'
import Carousel from "nuka-carousel"
import { Link } from 'react-router-dom';
import sixSities from '../../img/six.jpg'
import Rental from '../../img/rental.jpg'

function MainPortfolioBock() {

  return (

    <div className={`PORTFOLIO ${style.main_price__wrapper}`}>
      <h2 className={style.main_price__title}>портфолио</h2>
      <Carousel defaultControlsConfig={{
        prevButtonClassName: `${style.prev_btn}`,
        nextButtonClassName: `${style.next_btn}`,
        prevButtonText: '<',
        nextButtonText: '>',
      }}>
        <div className={style.panel}>
          <div className={style.wrapper}>
            <img src={sixSities} className={style.panel_img} width='250px' height='100px' alt='six sities' />
            <h4 className={style.panel_title}>сайт бронирования отелей</h4>
            <Link className={style.link_btn} to='/portfolio'>открыть</Link>
          </div>
        </div>
        <div className={style.panel}>
          <div className={style.wrapper}>
            <img src={Rental} className={style.panel_img} width='250px' height='100px' alt='six sities' />
            <h4 className={style.panel_title}>приложение аренды строительной техники</h4>
            <Link className={style.link_btn} to='/portfolio'>открыть</Link>
          </div>
        </div>
        <div className={style.panel}>
          <div className={style.wrapper}>

            <h4 className={style.panel_title}>телеграм бот/магазин</h4>
            <Link className={style.link_btn} to='/portfolio'>открыть</Link>
          </div>
        </div>
        {/* <div className={style.panel}>
          <div className={style.wrapper}>
            <img className={style.panel_img}></img>
            <h4 className={style.panel_title}>ВК мини приложение</h4>
            <Link className={style.link_btn} to='/portfolio'>открыть</Link>
          </div>
        </div> */}
      </Carousel>
    </div>

  )
}


export default MainPortfolioBock