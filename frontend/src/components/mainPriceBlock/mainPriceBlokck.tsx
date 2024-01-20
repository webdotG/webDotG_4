import { useState } from "react"
import styles from './mainPriceBlock.module.scss'
import { Link } from 'react-router-dom'


function MainPriceBlokck() {

  const [toggleState, setToggleState] = useState(1)

  const toggleTab = (index: number) => {
    setToggleState(index)
  }

  return (
    <div className={styles['wrapper']}>
      <h2 className={styles['main_price__title']}>цены</h2>
      <ul className={styles['bloc_tabs']}>
       <li className={toggleState === 1 ? `${styles["tab"]} ${styles["active_tab"]}` : styles['tab']}
          onClick={() => toggleTab(1)}>
          <p>сайты</p>
        </li>
        <li className={toggleState === 2 ? `${styles["tab"]} ${styles["active_tab"]}` : styles['tab']}
          onClick={() => toggleTab(2)}>
          <p>телеграм бот</p>
        </li>
        <li className={toggleState === 3 ? `${styles["tab"]} ${styles["active_tab"]}` : styles['tab']}
          onClick={() => toggleTab(3)}>
          <p>приложения</p>
        </li>
      </ul>
      <ul className={styles['content_tabs']}>
      <li className={toggleState === 1 ? `${styles['content']} ${styles['active_content']}` : styles['content']}>
          <div className={styles['sites_block_wrapper']}>
            <section className={styles['sites_block_section']}>
              <h3 className={styles['sites_block_section_title']}>лендинг</h3>
              <p className={styles['sites_block_section_text']}>шаблон :</p>
              <p className={styles['sites_block_section_price']}>15 000р</p>
              <p className={styles['sites_block_section_text']}>инди :</p>
              <p className={styles['sites_block_section_price']}>от 30 000р</p>
            </section>
            <section className={styles['sites_block_section']}>
              <h3 className={styles['sites_block_section_title']}>многостраничный</h3>
              <p className={styles['sites_block_section_text']}>шаблон :</p>
              <p className={styles['sites_block_section_price']}>60 000р</p>
              <p className={styles['sites_block_section_text']}>инди :</p>
              <p className={styles['sites_block_section_price']}>от 90 000р</p>
            </section>
            <section className={styles['sites_block_section']}>
              <h3 className={styles['sites_block_section_title']}>магазин</h3>
              <p className={styles['sites_block_section_text']}>шаблон :</p>
              <p className={styles['sites_block_section_price']}>120 000р</p>
              <p className={styles['sites_block_section_text']}>инди :</p>
              <p className={styles['sites_block_section_price']}>от 150 000р</p>
            </section>
          </div>
        </li>
        <li className={toggleState === 2 ? `${styles['content']} ${styles['active_content']}` : styles['content']}>
          <div className={styles['sites_block_wrapper']}>
            <section className={styles['sites_block_section']}>
              <h3 className={styles['sites_block_section_title']}>магазин бот</h3>
              <p className={styles['sites_block_section_text']}>шаблон :</p>
              <p className={styles['sites_block_section_price']}>60 000р</p>
              <p className={styles['sites_block_section_text']}>инди :</p>
              <p className={styles['sites_block_section_price']}>от 90 000р</p>
            </section>
            <section className={styles['sites_block_section']}>
              <h3 className={styles['sites_block_section_title']}>чат бот</h3>
              <p className={styles['sites_block_section_text']}>шаблон :</p>
              <p className={styles['sites_block_section_price']}>40 000р</p>
              <p className={styles['sites_block_section_text']}>инди :</p>
              <p className={styles['sites_block_section_price']}>от 60 000р</p>
            </section>
          </div>
        </li>
        <li className={toggleState === 3 ? `${styles['content']} ${styles['active_content']}` : styles['content']}>
          <div className={styles['sites_block_wrapper']}>
            <section className={styles['sites_block_section']}>
              <h3 className={styles['sites_block_section_title']}>IOS & Android</h3>
              <p className={styles['sites_block_section_text']}>шаблон :</p>
              <p className={styles['sites_block_section_price']}>80 000р</p>
              <p className={styles['sites_block_section_text']}>инди :</p>
              <p className={styles['sites_block_section_price']}>от 120 000р</p>
            </section>
            <section className={styles['sites_block_section']}>
              <h3 className={styles['sites_block_section_title']}>VK mini App</h3>
              <p className={styles['sites_block_section_text']}>шаблон :</p>
              <p className={styles['sites_block_section_price']}>60 000р</p>
              <p className={styles['sites_block_section_text']}>инди :</p>
              <p className={styles['sites_block_section_price']}>от 90 000р</p>
            </section>
          </div>
        </li>
      </ul>
      <Link className={styles['main_price_link_shop']} to='/shop'>перейти в магазин</Link>
    </div>
  )
}

export default MainPriceBlokck