import { motion } from 'framer-motion'
import style from './homePage.module.scss'
import Header from "../../components/header/header"
import MainPriceBlokck from "../../components/mainPriceBlock/mainPriceBlokck";
import MainPortfolioBock from "../../components/mainPortfolioBlock/mainPortfolioBock";
import MainAboutBlok from "../../components/mainAboutBlok/mainAboutBlok";
import LogoGMint from "../../svg/logoGMint";
import MainFeedback from "../../components/mainFeedback/mainFeedback";
import MainOrder from "../../components/mainOreder/mainOrder";
import Footer from "../../components/footer/footer";
// import ForCoders from '../../forCoders/forCoders';


const textAnimation = {
  hidden: {
    x: -100,
    opacity: 0,
  },
  visible: (custom: number) => ({
    x: 0,
    opacity: 1,
    transition: { delay: custom * 0.3 }
  })
}



function HomePage() {

  return (
    <>

      <Header />

      <div className={style.mainTitleBlock}>
        <motion.div
          initial='hidden'
          whileInView='visible'
          viewport={{ amount: 0.2 }}
          className={style.main_title__wrapp}>
          <motion.h1 variants={textAnimation} className={style.main_title}>
            webDot <span><LogoGMint /></span>
          </motion.h1>
          <motion.p custom={2} variants={textAnimation} className={style.main_title_p}>разрабатываю и улучшаю</motion.p>
        </motion.div>
        <ul className={style.main_title_list}>
          <li className={style.main_title__text}>сайты</li>
          <li className={style.main_title__text}>чат боты</li>
          <li className={style.main_title__text}>приложения</li>
        </ul>
      </div>
      <MainPriceBlokck />
      <MainPortfolioBock />
      <MainAboutBlok />
      <MainFeedback />
      <MainOrder />

      <Footer />
    </>
  )
}

export default HomePage
