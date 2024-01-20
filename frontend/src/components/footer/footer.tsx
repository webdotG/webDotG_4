import style from  './footer.module.scss'

function Footer () {

  return(
    <footer>
      <ul className={style['footer_list']}>
        <li className={style['footer_item']}>
          дизайн и разработка :
        </li>
        <li className={style['footer_item']}>
          webDotG (Kirill Grant)
          </li>
      </ul>
    </footer>
  )
}

export default Footer