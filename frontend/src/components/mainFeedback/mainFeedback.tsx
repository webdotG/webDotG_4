
import style from './mainFeedback.module.scss'
import SergeiSheglov from '../../img/SergeiSheglov.jpg'
import YliyaAleksandrovna from '../../img/YliyaAleksandrovna.jpg'
import AnastasiyaYngins from '../../img/AnastasiyaYngina.jpg'

function MainFeedback() {

  return (
    <div className={style['feedback']}>
      <h2 className={style['main_about__title']}>отзывы </h2>
      <ul className={style['feedback__list']}>
        <li className={style['feedback__item']}>
          <div className={style['feedback__item_client']}>
            <img className={style['feedback__item_avatar']} src={SergeiSheglov} alt='avatart ' />
            <section className={style['feedback__item_client_contacts']}>
              <p>Сергей Щеглов</p>
              <p>3d artist</p>
              <a href='https://t.me/sergeisheglov'>@sergeisheglov</a>
            </section>
          </div>
          <div className={style['feedback__text_wrapper']}>
            <p>
              Благодарю за профессиональную работу над сайтом.
              Внимание к деталям и мастерство привели к превосходному результату,
              отражающему мои потребности.
              Отличная работа!
            </p>
          </div>
        </li>
        <li className={style['feedback__item']}>
          <div className={style['feedback__item_client']}>
            <img className={style['feedback__item_avatar']} src={YliyaAleksandrovna} alt='avatart' />
            <section className={style['feedback__item_client_contacts']}>
              <p>Юлия Александровна</p>
              <p>Директор "Easy Food"</p>
              <a href='https://t.me/yuliasi'>@yuliasi</a>
            </section>
          </div>
          <div className={style['feedback__text_wrapper']}>
            <p>EasyFood благодарит за уникальный магазин в телеграм боте.
              Профессионализм и внимание к деталям превзошли ожидания.
              Полученное решение идеально подходит для нашего бизнеса.
              Большое спасибо!
            </p>
          </div>
        </li>
        <li className={style['feedback__item']}>
          <div className={style['feedback__item_client']}>
            <img className={style['feedback__item_avatar']} src={AnastasiyaYngins} alt='avatart '></img>
            <section className={style['feedback__item_client_contacts']}>
              <p>Анастасия Юнгина</p>
              <p>Иллюстратор</p>
              <a href='https://t.me/Anastasia_Goldfinch'>@Anastasia_Goldfinch</a>
            </section>
          </div>
          <div className={style['feedback__text_wrapper']}>
            <p>
              Искренне благодарю за создание лендинга портфолио.
              Ваш профессионализм воплотил в жизнь мою иллюстрационную работу
              во впечатляющем и креативном портфолио.
              Большое спасибо!
            </p>
          </div>
        </li>
      </ul>
    </div>
  )
}

export default MainFeedback