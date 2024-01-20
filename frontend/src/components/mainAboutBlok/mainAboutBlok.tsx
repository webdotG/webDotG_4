import IconFinishWork from '../../svg/iconFinishWork'
import IconList from '../../svg/iconList'
import IconPencil from '../../svg/iconPencil'
import IconProgramming from '../../svg/iconProgramming'
import IconStartProject from '../../svg/iconStartProject'
import IconTesting from '../../svg/iconTesting'
import style from './mainAboutBlok.module.scss'
import { motion } from 'framer-motion'

const listAnimation = {
  hidden: {
    y: -100,
    opacity: 0,
  },
  visible: (custom: number) => ({
    y: 0,
    opacity: 1,
    transition: { delay: custom * 0.5 }
  })
}

function MainAboutBlok() {

  return (
    <>
      <div className={style['main-about__wrapper']}>
        <h2 className={style['main-about__title']}>как я работаю </h2>
        <motion.ul
          initial='hidden'
          whileInView='visible'
          viewport={{ amount: 0.1, once: true }}
          className={style['main-about__list']}>
          <motion.li
            custom={1}
            variants={listAnimation}
            className={style['main-abou__item']} >
            <span className={style['main-about_icon-svg']}><IconList /></span>
            <p>изучаю задачу, составляю ТЗ</p>
          </motion.li>
          <motion.li
            custom={2}
            variants={listAnimation}
            className={style['main-abou__item']}>
            <span className={style['main-about_icon-svg']}><IconPencil /></span>
            <p>заключаю договор</p>
          </motion.li>
          <motion.li
            custom={3}
            variants={listAnimation}
            className={style['main-abou__item']}>
            <span className={style['main-about_icon-svg']}><IconTesting /></span>
            <p>разрабатываю концепцию и дизайн</p>
          </motion.li >
          <motion.li
            custom={4}
            variants={listAnimation}
            className={style['main-abou__item']}>
            <span className={style['main-about_icon-svg']}><IconProgramming /></span>
            <p>верстаю и программирую</p>
          </motion.li>
          <motion.li
            custom={5}
            variants={listAnimation}
            className={style['main-abou__item']}>
            <span className={style['main-about_icon-svg']}><IconFinishWork /></span>
            <p>тестирую</p>
          </motion.li>
          <motion.li
            custom={6}
            variants={listAnimation}
            className={style['main-abou__item']}>
            <span className={style['main-about_icon-svg']}><IconStartProject /></span>
            <p>запускаю</p>
          </motion.li>
        </motion.ul>
      </div >
    </>
  )
}

export default MainAboutBlok